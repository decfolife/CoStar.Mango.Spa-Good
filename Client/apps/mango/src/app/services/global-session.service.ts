import { Injectable } from "@angular/core";
import { BreadCrumb, V06Breadcrumb } from "@mango/data-models/lib-data-models";

@Injectable()
export class GlobalSessionService {

    static generateMangoBreadcrumbs(v06Breadcrumbs: V06Breadcrumb[]): BreadCrumb[] {
        return v06Breadcrumbs
            .filter((v06Breadcrumb: V06Breadcrumb) => v06Breadcrumb.DisplayTxt && v06Breadcrumb.LinkTxt)
            .map((v06Breadcrumb: V06Breadcrumb) => ({
                label: v06Breadcrumb.DisplayTxt,
                url: v06Breadcrumb.LinkTxt,
                activeLink: '',
                params: {}
            }))
    }

    static generateV06Breadcrumbs(mangoBreadrcumbs: BreadCrumb[]): V06Breadcrumb[] {
        return mangoBreadrcumbs.map((mangoBreadcrumb: BreadCrumb) => ({
            DisplayTxt: mangoBreadcrumb.label,
            IsList: false,
            LinkTxt: mangoBreadcrumb.url,
            ObjId: null,
            DisplayTxObjTypet: null,
            ObjTypeType: null,
            Pagename: '',
        }))
    }
}