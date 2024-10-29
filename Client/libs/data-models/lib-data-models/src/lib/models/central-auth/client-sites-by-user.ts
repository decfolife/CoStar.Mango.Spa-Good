import { UserSite } from '../user-site.interface';

export interface ClientSitesByUser {
  userSites: UserSite[];
  recentUserSites: UserSite[];
}
