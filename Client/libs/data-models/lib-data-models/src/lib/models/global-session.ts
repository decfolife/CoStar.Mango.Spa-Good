import { V06Breadcrumb } from "./breadCrumb"

export interface V06GlobalSession {
    currentyFormat?: string
    breadCrumbs?: V06Breadcrumb[]
}


export interface GlobalSessionHttpObject {
    data: V06GlobalSession
}
