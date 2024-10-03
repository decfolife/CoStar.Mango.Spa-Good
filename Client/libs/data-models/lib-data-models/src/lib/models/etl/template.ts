export interface ETLTemplate {
  templateId: number;
  templateName: string;
  templateTypeId: number;
  objectTypeId: number;
  objectTypeTypeId?: number;
  keyField: string;
  formId?: number;
  parentObjectTypeId?: number;
  parentLookupValue: string;
  isActive: boolean;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  keyFieldDisplayName: string;
  relationshipDefinitionId?: number;
  formItemListId?: number;
  updateOnly: boolean;
  tableViewName: string;
  isImportForAccounting?: boolean;
  isImportForFinancials?: boolean;
  isLocked: boolean;
  isReadOnly: boolean;
  setReadOnlyBy?: number;
}
