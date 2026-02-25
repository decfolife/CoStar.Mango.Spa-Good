export interface CommonNote {
  commonNoteID?: number;
  commonNoteTypeID?: number;
  commonNoteType?: string;
  note?: string;
  shortNoteText?: string;
  commonNoteCreatedBy?: number;
  commonNoteCreatorName?: string;
  commonNoteDateCreated?: Date;
  lastModifiedBy?: number;
  lastModifierName?: string;
  lastModifiedDate?: Date;
  sourceImportID?: string;
  emailRecipients?: string;
  canEdit: boolean;
}

export interface ObjectNotes {
  objectName: string;
  objectType: string;
  canView: boolean;
  canAdd: boolean;
  notes: CommonNote[];
  displayString: string;
}
