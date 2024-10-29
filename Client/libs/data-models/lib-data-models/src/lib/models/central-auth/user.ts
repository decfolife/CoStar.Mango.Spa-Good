import { UserSite } from '../user-site.interface';

export interface User {
  statusCode: number;
  authenticationToken: string;
  trackingId: string;
  email: string;
  contactId: string;
  userSites: UserSite[];
}
