export class DataGridQueryDto {
  objectTypeId: number;
  formId: number;
  initialDataFormId?: number;
  templateId: number;
  templateTypeId: number;
  objectTypeTypeId: number;
  portfolioId: number;
  fillLookupData: boolean;
  isFilter: boolean;
  keySourceColumn: string;
  keyFieldDisplayName: string;
  parentKeySourceColumn: string;
  updateOnly: boolean;
}
