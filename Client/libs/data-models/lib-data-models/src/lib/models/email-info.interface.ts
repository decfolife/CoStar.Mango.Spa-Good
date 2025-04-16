export interface ProjectsEmailInfo {
  contacts: EmailContact[];
  fileItems: EmailFileItem[];
  noteTypes: EmailNoteType[];
}

export interface EmailContact {
  contactFullName: string;
  contactEmailAddress: string;
  contactId: number;
}

export interface EmailFileItem {
  value: string;
  text: string;
  createdBy: string;
  uploadedOn: Date;
  extension?: string;
  icon?: string;
}

export interface EmailNoteType {
  commonNoteTypeID: number;
  commonNoteType: string;
  commonNoteTypeDisplay: number;
}
