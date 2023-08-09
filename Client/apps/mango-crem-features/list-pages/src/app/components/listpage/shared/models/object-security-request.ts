import { ObjectSecurityResponse } from './object-security-response';

export interface ObjectSecurityRequest extends ObjectSecurityResponse {
  relationshipDefinitionId: number | null;
  canEditNotes: boolean;
  fieldTypeId: number;
  useDefaultObjectFields: boolean;
}
