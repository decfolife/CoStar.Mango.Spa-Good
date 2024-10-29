export interface BlockedAdminLink {
  id: number;
  name: string;
  entityType: string;
  adminSection: string;
  adminLink: string;
  lastModifiedBy: string;
  lastModifiedDate: Date;
}
