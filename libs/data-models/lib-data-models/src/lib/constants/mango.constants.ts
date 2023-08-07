import { InjectionToken } from "@angular/core";

export const RUNNING_IN_MANGO_SPA = new InjectionToken<boolean>('RUNNING_IN_MANGO_SPA', {
    factory: () => false
})

export const MANGO_SPA_DEFAULT_PAGE = '/crem/projects/dashboard'