import TreeList, { Column, DataStructure } from 'devextreme/ui/tree_list';
import {
  Cell,
  CellValue,
  Column as ExcelColumn,
  Row,
  Worksheet,
} from 'exceljs';

const MIN_COLUMN_WIDTH = 10;
const PIXELS_PER_INDENT = 10;
const PIXELS_PER_EXCEL_WIDTH_UNIT = 8;
const CELL_PADDING = 2;

export interface TreeListExcelProps {
  component: TreeList;
  worksheet: Worksheet;
  transformations?: { [key: string]: (row: any) => void };
  headerOverrides?: { [dataField: string]: string };
  buildDependencyFilter?: (result: DataRow[]) => Array<string | Array<string>>;
}

interface DataRowWithChildren {
  childRows: DataRowWithChildren[];
  depth: number;
}
interface DataRow {
  childRows: DataRowWithChildren[];
}

class TreeListHelpers {
  private readonly columns: Column[];

  private readonly dateColumns: Column[];

  private readonly lookupColumns: Column[];

  private readonly rootValue: any;

  private readonly parentIdExpr: string;

  private readonly keyExpr: string;

  private readonly dataStructure: DataStructure;

  constructor(
    private readonly component: TreeList,
    private readonly worksheet: Worksheet,
    private customizations: {
      [key: string]: (row: any) => void;
    } = {},
    private headerOverrides: { [key: string]: string } = {},
    private buildDependencyFilter: (result: DataRow[]) => Array<any> = () => []
  ) {
    this.columns = this.component.getVisibleColumns();
    this.dateColumns = this.columns.filter(
      (column) => column.dataType === 'date' || column.dataType === 'datetime'
    );
    this.lookupColumns = this.columns.filter(
      (column) => column.lookup !== undefined
    );

    this.rootValue = this.component.option('rootValue');
    this.parentIdExpr = this.component.option('parentIdExpr') as string;
    this.keyExpr = (this.component.option('keyExpr') ??
      this.component.getDataSource().key()) as string;
    this.dataStructure = this.component.option(
      'dataStructure'
    ) as DataStructure;

    // bug: check ExcelJS's GitHub issues #1352 & #2218
    const properties: any = this.worksheet.properties;
    properties.outlineProperties = {
      summaryBelow: false,
      summaryRight: false,
    };
  }

  public async getData(): Promise<DataRowWithChildren[]> {
    let instance: TreeList | undefined = this.component.instance();
    let filterExpr = instance?.getCombinedFilter(true);
    const filterIsEmpty = !filterExpr || filterExpr.length === 0;
    let groupExpression = [filterExpr];
    const dataSource = instance?.getDataSource();
    const loadOptions = dataSource?.loadOptions();
    // we have to pull the data twice, the first time to get the keys and determine dependencies
    return this.component
      .getDataSource()
      .store()
      .load({
        filter: filterExpr,
        sort: loadOptions?.sort,
        group: loadOptions?.group,
      })
      .then((result: DataRow[]) => {
        // if there is no filter, we dont need to worry about dependencies
        const ancestorsFilter = filterIsEmpty
          ? []
          : this.buildDependencyFilter(result);
        return [result, groupExpression, ancestorsFilter];
      })
      .then(([results, filterExpr, ancestorFilter]) => {
        // merge the ui filter with the ancestor filter
        const compositeFilter = [...(filterExpr || []), ...ancestorFilter];

        // if there is no filter, we don't need to load ancestors
        // if there is no change between the two, we don't need to load ancestors
        if (filterIsEmpty || filterExpr.length === compositeFilter.length) {
          return results;
        }

        // we need to load ancestors
        return this.component.getDataSource().store().load({
          filter: compositeFilter,
          sort: loadOptions?.sort,
          group: loadOptions?.group,
        });
      })
      .then((data: DataRow[]) => this.processData(data));
  }

  private processData(data: DataRow[]): DataRowWithChildren[] {
    let rows = data;
    if (this.dataStructure === 'plain') {
      rows = this.convertToHierarchical(rows);
    }
    return this.depthDecorator(rows);
  }

  private depthDecorator(
    data: DataRow[] | DataRowWithChildren[],
    depth = 0
  ): DataRowWithChildren[] {
    const result: DataRowWithChildren[] = [];

    data.forEach((node: DataRow | DataRowWithChildren) => {
      result.push({
        ...node,
        depth,
        childRows: this.depthDecorator(
          'childRows' in node ? node.childRows : [],
          depth + 1
        ),
      });
    });

    return result;
  }

  private convertToHierarchical(
    data: DataRow[] | DataRowWithChildren[],
    id = this.rootValue
  ): DataRowWithChildren[] {
    let result: DataRowWithChildren[] = [];
    let roots: (DataRow | DataRowWithChildren)[] = data.filter(
      (node) => node[this.parentIdExpr] === id
    );

    result = roots.map((node) => ({
      ...node,
      childRows: this.convertToHierarchical(data, node[this.keyExpr]),
      depth: 0,
    }));

    return result;
  }

  private exportRows(rows: DataRowWithChildren[]): void {
    rows.forEach((row: DataRowWithChildren) => {
      this.exportRow(row);

      if (this.hasChildren(row)) {
        this.exportRows(row.childRows as DataRowWithChildren[]);
      }
    });
  }

  private formatDates(row: DataRowWithChildren) {
    this.dateColumns
      .filter((column) => column.dataField !== undefined)
      .forEach((column) => {
        const rowValue = row[column.dataField];
        row[column.dataField] = this.dateFormatter(rowValue, column.format);
      });
  }

  private exportRow(row: any | DataRowWithChildren): void {
    this.formatDates(row);
    this.assignLookupText(row);
    this.applyCustomFormats(row);
    const insertedRow: Row = this.worksheet.addRow(row);
    insertedRow.outlineLevel = row.depth;
  }

  applyCustomFormats(row: any) {
    Object.keys(this.customizations).forEach((key) => {
      this.customizations[key](row);
    });
  }

  private assignLookupText(row: DataRowWithChildren) {
    this.lookupColumns.forEach((column) => {
      if (column.dataField && column.lookup?.calculateCellValue) {
        row[column.dataField] = column.lookup.calculateCellValue(
          row[column.dataField]
        );
      }
    });
  }

  private generateColumns(): void {
    this.worksheet.columns = this.columns
      .filter(({ dataField }) => !!dataField)
      .map(({ caption, dataField }: Column) => {
        const header = this.headerOverrides?.[dataField] ?? caption;
        return {
          header,
          key: dataField,
        };
      });
  }

  private hasChildren(row: DataRowWithChildren): boolean {
    return row.childRows && row.childRows.length > 0;
  }

  private autoFitColumnsWidth(): void {
    this.worksheet.columns.forEach((column: Partial<ExcelColumn>) => {
      let maxLength: number = MIN_COLUMN_WIDTH;

      // first column
      if (column.number === 1 && column.eachCell !== undefined) {
        column.eachCell((cell: Cell) => {
          const indent: number = cell.alignment?.indent
            ? cell.alignment.indent *
              (PIXELS_PER_INDENT / PIXELS_PER_EXCEL_WIDTH_UNIT)
            : 0;

          let valueLength = this.getValueLength(cell.value);

          if (indent + valueLength > maxLength) {
            maxLength = indent + valueLength;
          }
        });
      }

      // other columns
      if (column.number !== 1) {
        column.values?.forEach((value: CellValue) => {
          if (value === null || value === undefined) return;
          let valueLength = this.getValueLength(value);

          if (valueLength > maxLength) maxLength = valueLength;
        });
      }

      column.width = maxLength + CELL_PADDING;
    });
  }

  private getValueLength(value: CellValue): number {
    let length = 0;

    if (
      typeof value === 'string' ||
      typeof value === 'number' ||
      typeof value === 'boolean'
    ) {
      length = value.toString().length;
    }

    if (value instanceof Date) {
      length = value.toLocaleDateString().length;
    }

    return length;
  }

  public dateFormatter = (datex: string, formatString: any): string => {
    if (!datex) {
      return '';
    }
    const date = new Date(datex);
    const isoDateParts = date.toISOString().slice(0, 10).split('-');
    const Year = 0;
    const Month = 1;
    const Day = 2;

    if (formatString.indexOf('/') > -1) {
      return `${isoDateParts[Month]}/${isoDateParts[Day]}/${isoDateParts[Year]}`;
    }
    return `${isoDateParts[Day]}.${isoDateParts[Month]}.${isoDateParts[Year]}`;
  };

  public async export(): Promise<void> {
    this.component.beginCustomLoading('Exporting to Excel...');

    return this.getData().then((rows: DataRowWithChildren[]) => {
      this.generateColumns();
      this.exportRows(rows);
      this.autoFitColumnsWidth();
      this.makeHeadersBold();

      this.component.endCustomLoading();
    });
  }

  private makeHeadersBold() {
    this.worksheet.findRows(1, 1).forEach((row) => {
      row.eachCell((cell) => {
        cell.font = { bold: true };
      });
    });
  }
}

async function exportTreeList({
  component,
  worksheet,
  transformations,
  headerOverrides,
  buildDependencyFilter,
}: TreeListExcelProps): Promise<void> {
  const helpers = new TreeListHelpers(
    component,
    worksheet,
    transformations,
    headerOverrides,
    buildDependencyFilter
  );

  return helpers.export();
}

export { exportTreeList };
