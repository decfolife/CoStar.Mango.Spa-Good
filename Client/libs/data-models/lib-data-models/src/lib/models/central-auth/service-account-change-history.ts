export interface ServiceAccountChangeHistory {
  email: string;
  fieldName: string;
  beforeChange: string;
  afterChange: string;
  description: string
  createdOn: Date; 
}