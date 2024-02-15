import { ContactRecord } from "../models/central-auth/contact-record";
import { UserSite } from "../models/user-site";
import { LoginResponse, UserAuth } from "../models/userAuth";

export const userMock: UserAuth = {
  userId: 123,
  clientKey: 'blank',
  email: 'mockuser@costargroup.com',
  isAutoProvisioned: true,
  contactId: 123,
  hasMultipleSites: false,
  isServiceAccount: true
}


export const loginResponseMock: LoginResponse = {
  authToken: 'MOCK_AUTH_TOKEN',
  user: userMock
}

export const mockClientBlank: UserSite = {
  clientKey: 'blank',
  contactId: 123,
  forceSSO: false,
  isActive: true,
  isSSOEnabled: false,
  requireSSO: false,
  ssoUri: ''
}

export const mockClientRetaildemo: UserSite = {
  clientKey: 'retaildemo',
  contactId: 123,
  forceSSO: false,
  isActive: true,
  isSSOEnabled: false,
  requireSSO: false,
  ssoUri: ''
}

export const mockUserClients: UserSite[] = [mockClientBlank, mockClientRetaildemo]

export const mockContactRecord: ContactRecord = {
  contactID: 123,
  firstName: 'First Name 1',
  lastName: 'Last Name 1',
  userName: 'mock-user'
}