export interface Link {
  routerLink?: string;
  href?: string;
  text: string;
  style?: string;
}

export interface SharedLeftNavLink {
  name: string;
  category: string;
  sortOrder: number;
  linkUrl: string;
  moduleId: number;
  isAuthorized: boolean;
  objectTypeID: number;
  dynamicName: string;
  usesNgRouting: boolean;
  spaUrl: string;
}
