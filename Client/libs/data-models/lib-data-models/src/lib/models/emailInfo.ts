export interface ProjectsEmailInfo {
  contacts: EmailContact[];
  fileItems: EmailFileItem[];
  noteTypes: EmailNoteType[];
}

export interface EmailContact {
  contactName: string; 
  contactEmailAddress: string;
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