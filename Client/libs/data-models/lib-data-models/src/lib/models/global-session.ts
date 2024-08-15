import { V06Breadcrumb } from "./breadCrumb"

export interface V06GlobalSession {
    currentyFormat?: string
    breadCrumbs?: V06Breadcrumb[]
}

export interface GlobalSessionHttpObject {
    data: V06GlobalSession
}

// Used to share small and non-sensitive data between MangoSPA and V06
export interface SharedInfo {
    ClientIdleTimeout: number,
    MangoIdle: boolean,
    V06Idle: boolean
}