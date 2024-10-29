// Converted from \VirtualPremise.Domain.Web.UI\1 - Main\v06\VirtualPremise.Domain.Web\BLL

import { Client } from './client.interface';
import { UserGroup } from './user-group.interface';
import { UserPreferences } from './user-preferences.interface';
import { VPBrokenRule } from './vp-broken-rule.interface';

export interface UserInfo {
  brokenRulesCollection: VPBrokenRule[];
  client: Client;
  companyID: number;
  companyName: string;
  companyTypeID: number;
  companyUsesSSO: boolean;
  contactActive: boolean;
  contactPublic: boolean;
  createdBy: number;
  createdDate: string;
  dAL: any;
  emailAddress: string;
  firstName: string;
  geographicRegionDescription: string;
  isCreatedByContactActive: boolean;
  isDirty: boolean;
  isNew: boolean;
  isTemporary: boolean;
  lastModifiedBy: number;
  lastName: string;
  listPagePreferences: any;
  lockedOut: boolean;
  name: string;
  passwordIsDirty: boolean;
  passwordLastChanged: string;
  passwordResetAttemtsLast24hs: number;
  primaryGroupID: number;
  role: number;
  securityLevelID: number;
  sessionTimeout: number;
  specialtyDescription: string;
  suffix: string;
  useHash: boolean;
  userAllowDefault: boolean;
  userAllowLogon: boolean;
  userAppType: number;
  userExcludeFromSSO: boolean;
  userGroups: UserGroup[];
  userID: number;
  userLogonAttempts: number;
  userName: string;
  userPreferences: UserPreferences;
  userSSOUserName: string;
  userStatus: number;
}
