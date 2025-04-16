import { Params } from '@angular/router';

// Only use one of these objects as the main shared one between spa and v06
// Use V06Breadcrumb interface
export interface BreadCrumb {
  label: string;
  params?: Params;
  url: string;
  activeLink?: string;
}

export interface V06Breadcrumb {
  label: string;
  url: string;
  activeLink?: string;
  append?: string;
}

// OLD. V06 breadcrumbs were re-done only when IsRedirectorIsActive.
// export interface V06Breadcrumb {
//   displaytxt: string;
//   islist: boolean;
//   linktxt: string;
//   objid: number;
//   objtype: number;
//   objtypetype: number;
//   pagename: string;
// }
