import { UserSite } from "../user-site";

export interface User {
  statusCode: number;
  authenticationToken: string;
  trackingId: string;
  email: string;
  contactId: string;
  userSites: UserSite[];
}
