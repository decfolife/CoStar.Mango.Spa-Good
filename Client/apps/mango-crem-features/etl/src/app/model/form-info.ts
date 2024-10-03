export class FormInfo {
  public formID: number;
  public formName: string;
  public objectTypeID: number;
  public objectType: string;
  public objectTypeTypeID: number;
  public objectTypeType: string;
  public keyTable: string;
  public keyField: string;

  constructor(
    formID: number,
    formName: string,
    objectTypeID: number,
    objectType: string,
    objectTypeTypeID: number,
    objectTypeType: string,
    keyTable: string,
    keyField: string
  ) {
    this.formID = formID;
    this.formName = formName;
    this.objectTypeID = objectTypeID;
    this.objectType = objectType;
    this.objectTypeTypeID = objectTypeTypeID;
    this.objectTypeType = objectTypeType;
    this.keyTable = keyTable;
    this.keyField = keyField;
  }
}
