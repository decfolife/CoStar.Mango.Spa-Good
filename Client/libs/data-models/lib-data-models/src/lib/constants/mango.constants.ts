import { InjectionToken } from "@angular/core";

export const RUNNING_IN_MANGO_SPA = new InjectionToken<boolean>('RUNNING_IN_MANGO_SPA', {
    factory: () => false
})

export const MANGO_SPA_DEFAULT_PAGE = '/crem/projects/dashboard'

export const BREADCUMBS_LENGTH = 5

export const SUB_LEFT_NEV_PAGES_URLS = ['render-form', '/crem/portfolio/expenses', '/crem/accounting/summary', '/crem/projects/project-team']