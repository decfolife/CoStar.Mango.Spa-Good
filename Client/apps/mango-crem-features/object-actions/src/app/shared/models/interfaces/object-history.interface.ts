export interface ObjectHistory {
  objectType?: string;
  objectID?: number;
  objectTypeTypeName?: string;
  fieldName?: string;
  lastModified?: string;
  user?: string;
  description?: string;
  oldValue?: string;
  newValue?: string;
  childObject?: string;
  changeDateTime?: string;
  groupDate?: string;
}

export interface ObjectName {
  objectName?: string;
  objectType?: string;
  displayString?: string;
}
