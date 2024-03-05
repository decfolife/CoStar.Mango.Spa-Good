export interface IDynamicForm {
  id: number;
  formId: number;
  formName: string;
  formTypeName: string;
  // objectId: number;
  objectTypeID: number;
  objectType: string;
  lastModifiedDate: Date;
  formActive: boolean;
  formConstant: string;
  isImportType: boolean;
}

// export interface IAvailableFields{
// formItemID: number,
// formItemName: string
// }
export class ISection {
  formSectionID: number;
  formSectionName: string;
  formSectionColumns: number;
  formSectionDisplayHeading: boolean;
  formSectionSortOrder: number;
  formsectionSystemName: string;
  vpDictionaryFormSectionDesc: string;
}

export class IFields {
  formItemID: number;
  formID: number;
  formSectionID: number;
  formItemLabel: string;
  formItemTypeID: number;
  dataTypeID: number;
  sourcetable: string;
  formItemActive: number;
  objectTypeID: number;
  sourceJoinColumn: string;
  sourceColumn: string;
  formItemParameters: string;
  existing: number;
  formItemDropdownSource: string;
  formatType: string;
  viewSQL: string;
  formItemMaximumLength: number;
  dropdownSourceType: string;
  dropdownID: number;
  formItemFriendlyName: string;
  numDecimals: number;
  sourceType: string;
  defaultValue: string;
  formItemMaxValue: number;
  formItemMinValue: number;
  formItemDescription: string;
  helpText: string;
  clauseTypeID: number;
  widgetID: number;
  formItemSystemName: string;
  dropdownBlankOption: string;
  formItemConstant: string;
  useDefaultValue: number;
  defaultValueType: string;
  formItemDefaultLabel: string;
  formItemLocalLabel: string;
  formItemSectionID: number;
  columnNum: number;
  formItemSortOrder: number;
  formItemMandatory: string;
  formItemMandatoryStep: number;
  formItemViewOnly: string;
  formItemTabIndex: number;
  formItemTop: number;
  formItemLeft: number;
  formItemLabelPlacement: string;
  formItemLabelWidth: number;
  formItemLabelColor: string;
  formItemLabelWeight: string;
  formItemLabelAlign: string;
  formItemLabelPrefix: string;
  formItemLabelSuffix: string;
  formItemDisplayLabel: string;
  formItemFieldWidth: number;
  formItemFieldColor: string;
  formItemFieldWeight: string;
  formItemFieldAlign: string;
  formItemFieldHeight: number;
  formItemFieldSpan: number;
  formItemFieldSpanCSS: string;
  formItemTotalWidth: number;
  formItemTotalHeight: number;
  formItemViewPrefix: string;
  formItemViewSuffix: string;
  formItemEditPrefix: string;
  formItemEditSuffix: string;
  containerCSS: string;
  dataTypeLabel: string;
  isParent: boolean;
  isChild: boolean;
  triggerWorkflowChange: string;
  formItemDictionaryText: string;
  formItemJavaScript: string;
  parentID: number;
  isAuditable: boolean;
  vpDictionaryFormItemDesc: string;

  formItemSectionDetail: IFieldDetails;
  formItemType: FormItemTypes;
}

export class IFieldDetails {
  formID: number;
  objectTypeID: number;
  formSectionID: number;
  formItemDefaultLabel: string;
  formItemID: number;
  formItemLocalLabel: string;
  formItemLabel: string;
  formItemSectionID: number;
  columnNum: number;
  formItemSortOrder: number;
  formItemMandatory: string;
  formItemMandatoryStep: number;
  formItemViewOnly: string;
  formItemTabIndex: number;
  formItemTop: number;
  formItemLeft: number;
  formItemLabelPlacement: string;
  formItemLabelWidth: number;
  formItemLabelColor: string;
  formItemLabelWeight: string;
  formItemLabelAlign: string;
  formItemLabelPrefix: string;
  formItemLabelSuffix: string;
  formItemDisplayLabel: string;
  formItemFieldWidth: number;
  formItemFieldColor: string;
  formItemFieldWeight: string;
  formItemFieldAlign: string;
  formItemFieldHeight: number;
  formItemFieldSpan: number;
  formItemFieldSpanCSS: string;
  formItemTotalWidth: number;
  formItemTotalHeight: number;
  formItemViewPrefix: string;
  formItemViewSuffix: string;
  formItemEditPrefix: string;
  formItemEditSuffix: string;
  containerCSS: string;
  dataTypeLabel: string;
  isParent: boolean;
  isChild: boolean;
  triggerWorkflowChange: string;
  formItemDictionaryText: string;
  formItemJavaScript: string;
  parentID: number;
  isAuditable: boolean;
  vpDictionaryFormItemDesc: string;
}


export class FormItemTypes {
  formItemTypeID: number;
  formItemType: string;
 
}

export class FormItemDataTypes {
  dataTypeID: number;
  dataTypeLabel: string;
}

export class FormItemDatabaseTables {
  name: string;
  name2: string;
}

export class FormItemSourceColumnbySourceTable {
  name: string;
  name2: string;
}

export class Dropdowns {
  dropdownID: number;
  dropdownName: string;
  dropdownValues: DropdownValue[];
}
export class DropdownValue {
  dropdownValueID: number;
  dropdownID: number;
  dropdownValue: string;
  dropdownDisplay: string;
  dropdownValueActive: boolean;
  dropdownValueOrder: number;
}

export class RenderFormDropdowns {
  formItemId: number;
  dropdownValues: BasicSelect[];
}

export class BasicSelect {
  value: string;
  display: string;
}

export class FormItemsDropdownValuesDto {
  ObjectId: number;
  ObjectTypeId: number;
  FormItemId: number;
  FormItemDropdownSource: string;
}

export class Widget {
  id: number;
  widgetID: number;
  widgetName: string;
  sourceURL: string;
  iFrameName: string;
  widgetSourceTable: string;
  widgetCopyColumns: string;
  dataGroupID: number;
  popUpSourceURL: string;
  wrapLastColumn: boolean;
  allowEdits: boolean;
  allowCreation: boolean;
  viewOnlyPopUp: boolean;
  formWidgetTypeID: number;
  columnGroupID: number;
  formID: number;
  relationshipDefinitionID: number;
  widgetDescription: string;
  allowExcelExport: boolean;
  allowLinking: boolean;
  allowImport: boolean;
  allowSelection: boolean;
  allowColumnSorting: boolean;
  allowColumnGrouping: boolean;
  lockHeaderRow: boolean;
  allowComparison: boolean;
  showFormWidgetHistory: boolean;
  widgetDisplayName: string;
  leaseOptionTypeID: number;
  validationFormItem: string;
  buttonAlignment: string;
  widgetHeight: string;
  childObjectTypeID: number;
  parentObjectTypeID: number;
  showHistoryOnParent: boolean;
  dataGroupCriteria: string;
  objectTypeID: number;
  widgetJSClickEvent: string;
  keyField: string;
  objectTypeTypeID: number;

  columnGroupInfo: ColumnGroupInfo;
  renderFormWidgetData: any;
}

export class ColumnGroupInfo {
  columnGroupID: number;
  dataGroupID: number;
  columnGroupName: string;
  columnGroupAlign: string;
  columnGroupUnits: string;
  widgetAddButtonWidth: string;
  widgetAddButtonText: string;
  widgetJSClickEvent: string;
  totalsRowCSS: string;
  totalsColumnCSS: string;
  rowCSS: string;
  altRowCSS: string;
  widgetLinkButtonText: string;
  widgetImportButtonText: string;
  widgetSelectionButtonText: string;
  widgetComparisonButtonText: string;

  columnFields: ColumnFields[];
}

export class ColumnFields {
  columnFieldID: number;
  columnGroupID: number;
  dataFieldID: number;
  columnHeader: string;
  columnLabel: string;
  columnWidth: number;
  columnSortOrder: number;
  showInListView: boolean;
  columnListRow: number;
  groupByRow: boolean;
  groupByColumn: boolean;
  groupByRowDataTypeID: number;
  groupByColumnDataTypeID: number;
  sumField: string;
  sumFieldDataTypeID: number;
  totalByRow: boolean;
  totalByColumn: boolean;
  columnHeaderCSS: string;
  columnCellCSS: string;
  columnColspan: number;
  showMultiFilter: boolean;
  defaultViewField: boolean;
  selectableField: boolean;
  linkField: boolean;
  redirector_OIDField: string;
  redirector_OTIDField: string;
  redirector_OTTIDField: string;
  otidValue: number;
  listPageFieldType: string;
  popupWindowID: number;
  dataFieldName: string;
  dataFieldSQL: string;
  dataFieldTable: string;
  dataFieldJoinSQL: string;
  systemGroupID: number;
  dataFieldDataType: string;
  formItemID: number;
  dataFieldTableField: string;
  dataFieldRequiresDistinct: boolean;
  dataTypeFormatString: string;
  dataFieldDescription: string;
  dataFieldConstant: string;
}
