import { Injectable } from '@angular/core';

import {
  CardConfig,
  CardDataItem,
  CardDataItemModify,
} from '@mango/data-models/lib-data-models';
import { rowSort } from '@accounting-dashboard/shared/models/card-config.model';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private _debug = false as boolean;

  findObjectByID(cardConfigs, id: string) {
    return cardConfigs.findIndex((item) => item.id === id);
  }

  /**
   * It builds the DevExtreme's PivotGridDataSource object
   *
   * @param {Array<any>} IADCardData
   * @param {Array<any>} localCardConfig
   * @param {number} reportingYear
   * @param {Array<any>} cardFieldConfigs
   * @return {*}  {Array<PivotGridDataSource>}
   * @memberof InAppDisclosureService
   */
  public buildPivotDataSources(
    IADCardData: Array<any>,
    localCardConfig: Array<any>,
    reportingYear: number,
    cardFieldConfigs: Array<any>,
    debug?: boolean
  ): Array<PivotGridDataSource> {
    this._debug = debug;
    const pivotDataSources = [];
    const skipIndex: Array<number> = []; // Keep track of indexes to skip if they has been merged with other IADCardData
    const IADCards = [...IADCardData];
    const debugObject = [];

    localCardConfig.map((cardConfig, i: number) => {
      // If localCardConfig doesn't exist for the IADCardConfig skip iteration
      if (!IADCards[i]) {
        console.error(
          'There is a configuration mismatch between localCardConfig and IADCardData'
        );
        return;
      }

      // iterate per cardData.ts configuration object
      let pivotGrid: PivotGridDataSource;

      if (cardConfig.combineWithIndex && cardConfig.combineWithIndex !== 0) {
        const mergedCards = this.mergeArraysOfObjects(
          IADCards[i],
          IADCards[cardConfig.combineWithIndex],
          cardConfig.mergeBy
        );
        pivotGrid = this.setPivotGrid(
          mergedCards,
          cardFieldConfigs[i],
          cardConfig,
          reportingYear
        );
        skipIndex.push(cardConfig.combineWithIndex); // Keep track of the used index
        IADCards.splice(cardConfig.combineWithIndex, 1); // Removed IADCardData index because it was merged
        debugObject.push({
          id: cardConfig.id,
          i: i,
          cardConfig: cardConfig,
          IADCardsI: IADCards[i],
          cardConfigsI: cardFieldConfigs[i],
          mergedCards: mergedCards,
          pivotGrid: pivotGrid,
        });
      } else {
        pivotGrid = this.setPivotGrid(
          IADCards[i],
          cardFieldConfigs[i],
          cardConfig,
          reportingYear
        );
        debugObject.push({
          id: cardConfig.id,
          i: i,
          cardConfig: cardConfig,
          IADCardsI: IADCards[i],
          cardConfigsI: cardFieldConfigs[i],
          pivotGrid: pivotGrid,
        });
      }
      pivotDataSources.push(pivotGrid); // Add new Pivot Grid to DataSources
    });

    this._debug && console.debug('debugObject', debugObject);

    return pivotDataSources;
  }

  /**
   * Set the DevExtreme PivotGrid data source object
   *
   * @param {Array<any>} IADCardData
   * @param {*} fieldConfig
   * @param {CardConfig} cardConfig
   * @param {number} [reportingYear]
   * @return {*}  {PivotGridDataSource}
   * @memberof InAppDisclosureService
   */
  setPivotGrid(
    IADCardData: Array<any>,
    fieldConfig: any,
    cardConfig: CardConfig,
    reportingYear?: number,
    paramEnd?: number
  ): PivotGridDataSource {
    const pivotCardDataStore: Partial<CardDataItem>[] = this.mapFields(
      IADCardData,
      cardConfig,
      reportingYear,
      paramEnd
    );
    // Create Pivot Grid
    const dataSource: PivotGridDataSource = new PivotGridDataSource({
      store: pivotCardDataStore,
      fields: fieldConfig,
    });

    return dataSource;
  }

  /**
   * It constructs the fieldConfig by parsing the CardJSONSchema (i.e., JSON.parse(card.CardJSONSchema))
   * from the cardConfig and localCardConfig.
   *
   * The localCardConfig has higher priority than the cardConfig coming from the service. Therefore,
   * the final fieldConfig will primarily use the localCardConfig if defined; otherwise, it will fall
   * back to the cardConfig.
   *
   * @param {*} IADCardConfig: API response from inAppDisclosureService.getIADCardConfigs
   * @param {*} localCardConfig: Local CardConfig
   * @param {number} decimalPrecision
   * @return {*}  {CardConfig[]}
   * @memberof InAppDisclosureService
   */
  configureFieldsPerCard(
    IADCardConfig,
    localCardConfig: CardConfig[],
    decimalPrecision: number
  ): CardConfig[] {
    const fieldConfigs: Array<any> = [];

    IADCardConfig?.map((card, i) => {
      // If localCardConfig doesn't exist for the IADCardConfig skip iteration
      if (!localCardConfig[i]) {
        console.error(
          'There is a count mismatch between localCardConfig and IADCardConfig'
        );
        return;
      }

      // The array corresponds to the order coming from the API in the CardJSONSchema field
      const fieldConfig = JSON.parse(card.CardJSONSchema);
      // Get Indexes of JSON Schema and apply methods
      const dataIndex: number = fieldConfig.findIndex(
        (e) => e.area === 'data' || e.dataField === 'data'
      );
      const rowIndex: number = fieldConfig.findIndex(
        (e) => e.dataField === 'Display' || e.area === 'row'
      );
      const sortedColumnIndex: number = fieldConfig.findIndex(
        (e) => e.dataField === localCardConfig[i].sortedColumnFieldName
      );

      /**
       * Sorting using sortingMethod
       * @see https://js.devexpress.com/Angular/Documentation/ApiReference/Data_Layer/PivotGridDataSource/Configuration/fields/#sortingMethod
       */
      fieldConfig[rowIndex].sortingMethod = (a, b) =>
        rowSort(a, b, card.sortingOrder);
      fieldConfig[dataIndex].sortingMethod = (a, b) =>
        rowSort(a, b, card.sortingOrder);
      if (sortedColumnIndex != -1) {
        fieldConfig[sortedColumnIndex].sortingMethod = (a, b) =>
          rowSort(a, b, localCardConfig[i].columnSortingOrder);
      }
      // Format Data
      if (localCardConfig[i]?.format || card.format || decimalPrecision) {
        fieldConfig[dataIndex].format = {
          type: localCardConfig[i]?.format?.type ?? card.format ?? 'fixedPoint',
          precision:
            localCardConfig[i]?.format?.precision ?? decimalPrecision ?? 2,
        };
      } else if (localCardConfig[i]?.format === null) {
        // When value is null we delete the key, to prevent false positives
        delete fieldConfig[dataIndex].format;
      }

      // Styling
      if (localCardConfig[i]?.width || card.width) {
        // Checks local cardConfigs, if false use API response
        fieldConfig[rowIndex].width = localCardConfig[i].width ?? card.width;
      } else if (localCardConfig[i]?.width === null) {
        delete fieldConfig[rowIndex].width;
      }

      // Summary: summaryType
      if (localCardConfig[i]?.summaryType || card.summaryType) {
        fieldConfig[dataIndex].summaryType =
          localCardConfig[i].summaryType ?? card.summaryType;
      } else if (localCardConfig[i]?.summaryType === null) {
        delete fieldConfig[dataIndex].summaryType;
      }

      // Summary: calculateSummaryValue
      if (
        localCardConfig[i]?.calculateSummaryValue ||
        card.calculateSummaryValue
      ) {
        fieldConfig[dataIndex].calculateSummaryValue =
          localCardConfig[i].calculateSummaryValue ??
          card.calculateSummaryValue;
      } else if (localCardConfig[i]?.calculateSummaryValue === null) {
        delete fieldConfig[dataIndex].calculateSummaryValue;
      } else {
        fieldConfig[dataIndex].calculateSummaryValue = (summaryCell) => {
          if (
            summaryCell.field('column')?.dataField === 'PeriodYear' ||
            summaryCell.field('column')?.dataField === 'PeriodQuarter'
          ) {
            return summaryCell.value() / 2;
          } else {
            return summaryCell.value();
          }
        };
      }

      // Summary: calculateCustomSummary
      if (
        localCardConfig[i]?.calculateCustomSummary ||
        card.calculateCustomSummary
      ) {
        fieldConfig[dataIndex].calculateCustomSummary =
          localCardConfig[i].calculateCustomSummary ??
          card.calculateCustomSummary;
      } else if (localCardConfig[i]?.calculateCustomSummary === null) {
        delete fieldConfig[dataIndex].calculateCustomSummary;
      }
      // Push configuration Field
      fieldConfigs.push(fieldConfig);
    });

    return fieldConfigs;
  }

  /**
   * Merge two arrays using dueYear and PeriodYear, if mergeBy is provided, it will be used instead
   *
   * @param {{ [key: string]: any }[]} data1
   * @param {{ [key: string]: any }[]} data2
   * @param {string} [mergeBy]
   * @return {*}  {Array<object>}
   * @memberof UtilityService
   */
  mergeArraysOfObjects(
    data1: { [key: string]: any }[],
    data2: { [key: string]: any }[],
    mergeBy?: string,
    mergeBySecondary?: string
  ): Array<object> {
    if (data1.length === 0 && data2.length === 0) return [];
    if (data1.length === 0) return data2;
    if (data2.length === 0) return data1;

    const hashMap = new Map( // Create a hashMap from data2 with composite keys (DueByYear and LeaseTemplate)
      data2.map((item) => [
        `${mergeBy ?? item.DueByYear}-${
          mergeBySecondary ?? item.LeaseTemplate
        }`,
        item,
      ])
    );

    const mergedArray = data1.map((item) => {
      // Merge data1 with data2 based on the composite key
      const key = `${mergeBy ?? item.PeriodYear}-${
        mergeBySecondary ?? item.LeaseTemplate
      }`;
      const itemToMerge = hashMap.get(key);
      if (itemToMerge && typeof itemToMerge === 'object') {
        return { ...item, ...itemToMerge };
      }
      return item;
    });

    return mergedArray;
  }

  /**
   * Using fieldTransform map the local IADCardData and the API response
   * returns the transformedStor
   *
   * @param {Array<any>} IADCardData
   * @param {CardConfig} cardConfig
   * @param {number} [paramStart]
   * @param {number} [paramEnd]
   * @return {*}
   * @memberof InAppDisclosureService
   */
  mapFields(
    IADCardData: Array<any>,
    cardConfig: CardConfig,
    paramStart?: number,
    paramEnd?: number
  ) {
    const transformedStore: any = [];
    const sortingItems = Object.entries(cardConfig?.sortingOrder).map(
      ([key]) => key
    );

    if (!cardConfig?.fieldTransform) return IADCardData; // Nothing to transform, return IADCardData as is

    // Pre-filter IADCardData
    if (paramStart && cardConfig.filterInitialValue) {
      const endPeriod = !paramEnd // todo: if !filterInitialValue defaults to filterData[0]
        ? Number(cardConfig.filterInitialValue.valueKey)
        : paramEnd;
      IADCardData = this.filterByKey(
        IADCardData,
        paramStart,
        paramStart + endPeriod
      );
    }

    // Transform cardData according to fieldTransform.modify object
    IADCardData = this.modifyCardData(IADCardData, cardConfig);

    // Transform & map values according to fieldTransform
    IADCardData.map((e) => {
      const builtEntries: Partial<CardDataItem>[] = [];

      Object.entries(cardConfig.fieldTransform).forEach(([_, value], i) => {
        const transformedObject: Partial<CardDataItem> = {};

        Object.entries(value).forEach(([k, v]) => {
          switch (
            value.LeaseTemplate // Depending on the 'LeaseTemplate' data will be mapped differently
          ) {
            case 'Total': {
              switch (k) {
                case 'Display': {
                  transformedObject[k] = v;
                  break;
                }
                case 'LeaseTemplate': {
                  transformedObject[k] = v;
                  break;
                }
                case 'DisclosureClassification': {
                  transformedObject[k] = v;
                  break;
                }
                default:
                  transformedObject[k] = e[v];
                  break;
              }
              break;
            }
            default: {
              transformedObject[k] = e[v];
              break;
            }
          }
        });

        if (
          sortingItems &&
          value.DisclosureClassification !== 'Total' &&
          value.LeaseTemplate !== 'Total'
        ) {
          transformedObject['Display'] = sortingItems[i];
        }

        builtEntries.push(transformedObject);
      });

      transformedStore.push(...builtEntries);
    });
    return transformedStore;
  }

  modifyCardData(IADCardData: Array<any>, cardConfig: CardConfig): Array<any> {
    const builtEntries: Partial<CardDataItem>[] = [];
    let index;

    const el = cardConfig.fieldTransform?.find((e) => e.modify?.indexes); // Determine if Data Needs modification before mapping
    if (!el) return IADCardData;

    const cardDataCopy = JSON.parse(JSON.stringify(IADCardData)); // Making sure is not pointing to the same memory allocation, otherwise affects the original IADCardData

    switch (el.modify.indexes) {
      case 0:
      case 'first': {
        index = Math.min(
          ...IADCardData.map((item) => item[el.modify.compareWith])
        );
        break;
      }
      case -1:
      case 'last': {
        index = Math.max(
          ...IADCardData.map((item) => item[el.modify.compareWith])
        );
        break;
      }
      default: {
        index = el.modify.indexes;
        break;
      }
    }

    IADCardData.map((e, i) => {
      builtEntries.push(e);

      if (e[el.modify.compareWith] === index) {
        // Once it finds the right Index in the list of data make the modifications
        builtEntries[i][el.modify.compareWith] = el.modify.caption.toString();

        if (el.modify.compareWithX) {
          const prevRow = this._findPreviousMatchingRow(
            cardDataCopy,
            el.modify,
            index,
            i
          );
          builtEntries[i][el.modify.replace] =
            prevRow[el.modify.newData ? el.modify.newData : el.data];
        } else {
          builtEntries[i][el.modify.replace] =
            IADCardData[i + (el.modify.offset ? el.modify.offset : 0)][
              el.modify.newData ? el.modify.newData : el.data
            ]; // Offset allows to get a number from another row
        }
      } else {
        builtEntries[i][el.modify.compareWith] =
          IADCardData[i][el.modify.compareWith].toString();
      }
    });
    return builtEntries;
  }

  private _findPreviousMatchingRow(
    IADCardData: Array<any>,
    modify: CardDataItemModify,
    targetIndex: number,
    IADIndex
  ) {
    return IADCardData.filter(
      (e) =>
        e[modify.compareWith] === targetIndex + modify.offset &&
        e[modify.compareWithX] === IADCardData[IADIndex][modify.compareWithX]
    )[0];
  }

  /**
   * Filter cardData given a numeric 'key' to compare against
   * For more complex comparisons is missing the comparison parameter.
   *
   * @param {*} data
   * @param {number} start
   * @param {number} end
   * @param {number} key
   * @return {*}  {*}
   * @memberof InAppDisclosureService
   */
  filterByKey(
    data: any,
    start: number,
    end: number,
    key = 'PeriodYear' as string
  ): any {
    return data.filter((item) => item[key] >= start && item[key] <= end);
  }
}
