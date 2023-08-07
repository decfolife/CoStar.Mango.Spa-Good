export interface UserSite {
  clientKey: string;
  contactId: number;
  isActive: boolean;
  requireSSO: boolean; // user level
  forceSSO: boolean; // client level
  isSSOEnabled: boolean; // client level
  ssoUri: string;
  lastLogInAt: string;
}
  