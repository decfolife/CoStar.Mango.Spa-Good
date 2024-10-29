export interface Link {
  routerLink?: string;
  href?: string;
  text: string;
  style?: string;
}

export interface SharedLeftNavLink {
  id?: number;
  name: string;
  category: string;
  sortOrder: number;
  linkUrl: string;
  moduleID: number;
  isAuthorized: boolean;
  objectTypeID: number;
  dynamicName: string;
  usesNgRouting: boolean;
  spaUrl: string;
  spaQueryParameters?: string;
  isCommon?: boolean;
}
