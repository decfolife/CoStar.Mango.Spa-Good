import { Params } from '@angular/router';
export interface BreadCrumb {
    label: string;
    params?: Params;
    url: string;
    activeLink? : string;
  }

  export interface V06Breadcrumb {
    DisplayTxt: string
    IsList: boolean
    LinkTxt: string
    ObjId: number
    DisplayTxObjTypet: number
    ObjTypeType: number
    Pagename: string
  }