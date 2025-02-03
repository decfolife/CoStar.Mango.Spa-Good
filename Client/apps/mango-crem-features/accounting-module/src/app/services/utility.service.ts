import { Injectable } from '@angular/core';

import {
  CardConfig,
  CardDataItem,
  CardDataItemModify,
} from '@mango/data-models/lib-data-models';
import {
  rowSort,
  GridType,
} from '@accounting-dashboard/shared/models/card-config.model';
import PivotGridDataSource from 'devextreme/ui/pivot_grid/data_source';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private _debug = false as boolean;

  /**
   * Finds an element in an array of objects by ID and returns its index.
   * Used to locate a card given an {id} and a list of card configurations.
   *
   * @param {CardConfig[]} cardConfigs
   * @param {string} id
   * @return {number}
   * @memberof UtilityService
   */
  findObjectByID(cardConfigs: CardConfig[], id: string): number {
    return cardConfigs.findIndex((item) => item.id === id);
  }

  /**
   * It builds the DevExtreme's PivotGridDataSource object
   *
   * @param {Array<any>} IADCardData
   * @param {CardConfig[]} localCardConfig
   * @param {number} reportingYear
   * @param {Array<any>} cardFieldConfigs
   * @return {*}  {{ pivotDataSources: Array<PivotGridDataSource>; gridDataSources: Array<any> }}
   * @memberof InAppDisclosureService
   */
  public buildDataSources(
    IADCardData: Array<any>,
    localCardConfig: CardConfig[],
    reportingYear: number,
    cardFieldConfigs: CardConfig[],
    debug?: boolean
  ): {
    pivotDataSources: Array<PivotGridDataSource>;
    gridDataSources: Array<any>;
  } {
    this._debug = debug;
    const pivotDataSources: Array<PivotGridDataSource> = [];
    const gridDataSources: Array<any> = [];
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
      let dataGrid: any;

      if (cardConfig.combineWithIndex && cardConfig.combineWithIndex !== 0) {
        // 1) Merge Cards
        const mergedCards = this.mergeArraysOfObjects(
          IADCards[i],
          IADCards[cardConfig.combineWithIndex],
          cardConfig.mergeBy
        );
        // 2) Set Pivot Grid
        pivotGrid = this.setPivotGrid(
          mergedCards,
          cardFieldConfigs[i],
          cardConfig,
          reportingYear
        );
        // 3) Set Data Grid
        dataGrid = this.setDataGrid(
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
          dataGrid: dataGrid,
        });
      } else {
        // 1) Set Pivot Grid
        pivotGrid = this.setPivotGrid(
          IADCards[i],
          cardFieldConfigs[i],
          cardConfig,
          reportingYear
        );
        // 2) Set Data Grid
        dataGrid = this.setDataGrid(
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
          dataGrid: dataGrid,
        });
      }
      // 1) Build the Pivot and Data Grid
      pivotDataSources.push(pivotGrid);
      gridDataSources.push(dataGrid);
    });

    this._debug && console.debug('debugObject', debugObject);

    return { pivotDataSources, gridDataSources };
  }

  /**
   *
   *
   * @param {Array<any>} IADCardData
   * @param {*} fieldConfig
   * @param {CardConfig} cardConfig
   * @param {number} [reportingYear]
   * @param {number} [paramEnd]
   * @return {*}
   * @memberof UtilityService
   */
  setDataGrid(
    IADCardData: Array<any>,
    fieldConfig: any,
    cardConfig: CardConfig,
    reportingYear?: number,
    paramEnd?: number
  ) {
    const dataGrid: Partial<CardDataItem>[] = this.mapFieldsDataGrid(
      IADCardData,
      cardConfig,
      reportingYear,
      paramEnd
    );
    return this.removeBlankAttributes(dataGrid);
  }

  /**
   * Data Grid Field Configuration
   *
   * @param {Array<any>} IADCardData
   * @param {CardConfig} cardConfig
   * @param {number} [paramStart]
   * @param {number} [paramEnd]
   * @return {*}
   * @memberof UtilityService
   */
  mapFieldsDataGrid(
    IADCardData: Array<any>,
    cardConfig: CardConfig,
    paramStart?: number,
    paramEnd?: number
  ) {
    // Pre-filter IADCardData
    if (paramStart && cardConfig.filterInitialValue) {
      const endPeriod = !paramEnd
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

    return IADCardData;
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
    const pivotCardDataStore: Partial<CardDataItem>[] = this.mapFieldsPivotGrid(
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

      // The PivotGrid Field configuration using the CardJSONSchema
      let fieldConfig: Array<any>;
      if (localCardConfig[i].cardJSONSchema) {
        fieldConfig = localCardConfig[i].cardJSONSchema; // Get Field Config from local client
      } else {
        fieldConfig = JSON.parse(card.CardJSONSchema); // Get Field Config from Mango_dashboards global conf
      }

      // Get Indexes of JSON Schema and apply methods
      const dataIndex: number = fieldConfig.findIndex(
        (e) => e.area === 'data' || e.dataField === 'data'
      );
      const rowIndex: number = fieldConfig.findIndex(
        (e) => e.area === 'row' || e.dataField === 'Display'
      );

      /**
       * Sorting using sortingMethod
       * @see https://js.devexpress.com/Angular/Documentation/ApiReference/Data_Layer/PivotGridDataSource/Configuration/fields/#sortingMethod
       */
      // Sorting Rows
      fieldConfig[rowIndex].sortingMethod = (a, b) =>
        rowSort(a, b, localCardConfig[i].sortingOrder);
      fieldConfig[dataIndex].sortingMethod = (a, b) =>
        rowSort(a, b, localCardConfig[i].sortingOrder);

      // Sorting Columns
      if (typeof localCardConfig[i].sortedColumnFieldName === 'object') {
        // When sortedColumnFieldName is a list
        for (const columnName in localCardConfig[i]
          .sortedColumnFieldName as any) {
          const columnIndex: number = fieldConfig.findIndex(
            (e) => e.dataField === columnName
          );
          if (columnIndex != -1) {
            const sortingOrder =
              localCardConfig[i].sortedColumnFieldName[columnName];
            fieldConfig[columnIndex].sortingMethod = (a, b) =>
              rowSort(a, b, sortingOrder);
          }
        }
      } else {
        // When sortedColumnFieldName is a string
        const columnIndex: number = fieldConfig.findIndex(
          (e) => e.dataField === localCardConfig[i].sortedColumnFieldName
        );
        if (columnIndex != -1) {
          const sortingOrder = localCardConfig[i].columnSortingOrder;
          fieldConfig[columnIndex].sortingMethod = (a, b) =>
            rowSort(a, b, sortingOrder);
        }
      }

      // Format Data
      if (localCardConfig[i]?.format || decimalPrecision) {
        fieldConfig[dataIndex].format = {
          type: localCardConfig[i]?.format?.type ?? 'fixedPoint',
          precision:
            localCardConfig[i]?.format?.precision ?? decimalPrecision ?? 2,
        };
      } else if (localCardConfig[i]?.format === null) {
        // When value is null we delete the key, to prevent false positives
        delete fieldConfig[dataIndex].format;
      }

      // Styling
      if (localCardConfig[i]?.width) {
        // Checks local cardConfigs, if false use API response
        fieldConfig[rowIndex].width = localCardConfig[i].width;
      } else if (localCardConfig[i]?.width === null) {
        delete fieldConfig[rowIndex].width;
      }

      // Summary: summaryType
      if (localCardConfig[i]?.summaryType) {
        fieldConfig[dataIndex].summaryType = localCardConfig[i].summaryType;
      } else if (localCardConfig[i]?.summaryType === null) {
        delete fieldConfig[dataIndex].summaryType;
      }

      // Summary: calculateSummaryValue
      switch (true) {
        case !!localCardConfig[i].summaryCellName &&
          !localCardConfig[i].summaryCellFormula: {
          // IF summaryCellName exists but summaryCellFormula not
          fieldConfig[dataIndex].calculateSummaryValue = (summaryCell) => {
            if (
              summaryCell.field('column')?.dataField ===
                localCardConfig[i].summaryCellName ||
              localCardConfig[i].summaryCellName.includes(
                summaryCell.field('column')?.dataField
              )
            )
              return summaryCell.value() / 2;
            else return summaryCell.value();
          };
          break;
        }
        case !!localCardConfig[i].summaryCellName &&
          !!localCardConfig[i].summaryCellFormula: {
          // Use formula in a specific summaryCell
          fieldConfig[dataIndex].calculateSummaryValue = (summaryCell) => {
            if (
              summaryCell.field('column')?.dataField ===
                localCardConfig[i].summaryCellName ||
              localCardConfig[i].summaryCellName.includes(
                summaryCell.field('column')?.dataField
              )
            )
              return this.parseFormula(localCardConfig[i].summaryCellFormula, {
                x: summaryCell.value(),
                ...localCardConfig[i].summaryCellConstants,
              });
            else return summaryCell.value();
          };
          break;
        }
        case localCardConfig[i]?.calculateSummaryValue === null: {
          // Delete/overwrite if calculateSummaryValue is null
          delete fieldConfig[dataIndex].calculateSummaryValue;
          break;
        }
        case typeof localCardConfig[i]?.calculateSummaryValue === 'function': {
          // @deprecated, when passing the function directly
          fieldConfig[dataIndex].calculateSummaryValue =
            localCardConfig[i].calculateSummaryValue;
          break;
        }
        default: {
          // Just use the value
          fieldConfig[dataIndex].calculateSummaryValue = (summaryCell) =>
            summaryCell.value();
          break;
        }
      }

      // Summary: calculateCustomSummary
      if (localCardConfig[i]?.calculateCustomSummary) {
        fieldConfig[dataIndex].calculateCustomSummary =
          localCardConfig[i].calculateCustomSummary;
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
          mergeBySecondary ??
          item.LeaseTemplate ??
          item.DisclosureClassification
        }`,
        item,
      ])
    );

    const mergedArray = data1.map((item) => {
      // Merge data1 with data2 based on the composite key
      const key = `${mergeBy ?? item.PeriodYear}-${
        mergeBySecondary ?? item.LeaseTemplate ?? item.DisclosureClassification
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
  mapFieldsPivotGrid(
    IADCardData: Array<any>,
    cardConfig: CardConfig,
    paramStart?: number,
    paramEnd?: number
  ) {
    const transformedStore: any = [];
    let sortingItems = [];

    // Row Ordering
    if (cardConfig?.sortingOrder) {
      sortingItems = Object.entries(cardConfig.sortingOrder).map(
        ([key]) => key
      );
    } else {
      // Create sortOrder based on fieldTransform configuration if sortingOrder doesn't exists
      sortingItems = Object.entries(
        this.createSortOrder(
          cardConfig.fieldTransform,
          cardConfig.cardJSONSchema[0].dataField // Use first element of the cardJSONSchema
        )
      ).map(([key]) => key);
    }

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
          switch (true) {
            case value.LeaseTemplate === 'Total' ||
              value.DisclosureClassification === 'Total': {
              switch (true) {
                case k === 'Display': {
                  transformedObject[k] = v;
                  break;
                }
                case k === 'LeaseTemplate': {
                  transformedObject[k] = v;
                  if (value.DisclosureClassification === 'Total')
                    // For the sub-columns of pivot grids
                    transformedObject['LeaseTemplate'] = e['LeaseTemplate'];
                  break;
                }
                case k === 'DisclosureClassification': {
                  transformedObject[k] = v;
                  if (value.DisclosureClassification === 'Total')
                    // For the sub-columns of pivot grids
                    transformedObject['LeaseTemplate'] =
                      e['DisclosureClassification'];
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
          value.LeaseTemplate !== 'Total' &&
          value.DisclosureClassification !== 'Total'
        ) {
          transformedObject['Display'] = sortingItems[i];
        }

        builtEntries.push(transformedObject);
      });

      this._debug && console.debug('builtEntries', builtEntries);

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

  /**
   * Modifies the IADCardData while being transformed.
   *
   * @private
   * @param {Array<any>} IADCardData
   * @param {CardDataItemModify} modify
   * @param {number} targetIndex
   * @param {*} IADIndex
   * @return {*}
   * @memberof UtilityService
   */
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

  /**
   * When cardConfig.sortingOrder is not present generate a sorting order
   * based on fieldTransform options.
   *
   * @param {Array<any>} arr
   * @param {string} customKey
   * @return {*}  {{[key: string]: number}}
   * @memberof UtilityService
   */
  createSortOrder(
    arr: Array<any>,
    customKey: string
  ): { [key: string]: number } {
    const result = {};
    arr.forEach((item, i) => {
      result[item.Display ?? customKey] = i;
    });
    return result;
  }

  /**
   * Parses and evaluates custom formulas as a string.
   *
   * @example const formula = '(x / 2) + 2';
   *			  const variables = { x: 10 };
   *
   *			  const result = this.evaluateFormula(formula, variables);
   *				console.log(result); // Outputs: 7
   *
   * @param {string} formula
   * @param {Record<string, number>} variables
   * @return {*}  {(number | boolean)}
   * @memberof UtilityService
   */
  parseFormula(
    formula: string,
    variables: Record<string, number>
  ): number | boolean {
    if (isNaN(variables.x)) return 0;

    try {
      // Create a dynamic function with variables in scope
      const variableKeys = Object.keys(variables);
      const variableValues = Object.values(variables);

      const dynamicFunction = new Function(
        ...variableKeys,
        `return ${formula};`
      ); // Generate a function that evaluates the formula

      return dynamicFunction(...variableValues); // Execute the function with the passed variable values
    } catch (error) {
      console.error('Error evaluating formula:', error); // throw new Error('Invalid formula or variables');
      return variables.x; // Just use the default and first variable to keep the cell showing
    }
  }

  /**
   * Build/Reconstruct Field Configuration from the pivot or grid data source,
   * this is used to be saved in the database.
   *
   * @param {*} dataSources
   * @param {GridType} [gridType]
   * @return {*}
   * @memberof UtilityService
   */
  buildConfigFields(dataSources, gridType?: GridType) {
    const fields = [];
    const fieldsToSave = [];

    switch (gridType) {
      case 'dataGrid': {
        break;
      }
      default:
      case 'pivotGrid': {
        const columns = dataSources.getAreaFields('column', false);
        const rows = dataSources.getAreaFields('row', false);
        const data = dataSources.getAreaFields('data', false);
        const filters = dataSources.getAreaFields('filter', false);

        columns.forEach((column) => {
          if (column.dataField && !fields.includes(column.dataField)) {
            const field = JSON.parse(JSON.stringify(column));

            delete field['groupInterval'];
            delete field['caption'];
            delete field['groupIndex'];
            delete field['groupName'];

            fields.push(field.dataField);
            fieldsToSave.push(field);
          }
        });

        rows.forEach((row) => {
          if (row.dataField && !fields.includes(row.dataField)) {
            const field = JSON.parse(JSON.stringify(row));

            delete field['groupInterval'];
            delete field['caption'];
            delete field['groupIndex'];
            delete field['groupName'];

            fields.push(field.dataField);
            fieldsToSave.push(field);
          }
        });

        data.forEach((e) => {
          if (e.dataField && !fields.includes(e.dataField)) {
            const field = JSON.parse(JSON.stringify(e));

            delete field['groupInterval'];
            delete field['caption'];
            delete field['groupIndex'];
            delete field['groupName'];

            fields.push(field.dataField);
            fieldsToSave.push(field);
          }
        });

        filters.forEach((filter) => {
          if (filter.dataField && !fields.includes(filter.dataField)) {
            const field = JSON.parse(JSON.stringify(filter));

            delete field['groupInterval'];
            delete field['caption'];
            delete field['groupIndex'];
            delete field['groupName'];

            fields.push(field.dataField);
            fieldsToSave.push(field);
          }
        });

        break;
      }
    }

    return fieldsToSave;
  }

  /**
   * Removes invalid empty keys
   *
   * @template T
   * @param {T[]} arr
   * @return {*}  {T[]}
   * @memberof UtilityService
   */
  removeBlankAttributes<T extends Record<string, any>>(arr: T[]): T[] {
    return arr.map((obj) => {
      const hasBlankKeys = Object.keys(obj).some(
        (key) => key === '' || key === null || key === undefined
      );

      if (!hasBlankKeys) {
        return obj;
      }

      const filteredObj = Object.entries(obj)
        .filter(([key, _]) => key !== '' && key !== null && key !== undefined)
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {} as Record<string, any>);

      return filteredObj as T;
    });
  }
}
