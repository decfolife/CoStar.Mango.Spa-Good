export interface RedirectorLink {
    objectTypeId: number
    objectTypeTypeId: number
    listPageFieldType: number 
    basePageUrl: string
    urlLink: string
}

export interface RedirectorMapping {
    id: number
    cremUrl: string
    spaUrl?: string 
    isActive?: boolean
}

export interface RedirectorObjectData {
    objectId: number
    objectTypeId: number
    objectTypeTypeId: number
}


/* export enum FieldType {
    None = 0,
    Normal = 1,      // If LeftNav ? Custom : Normal (plain text)
    Redirector = 2,  // KeyPageUrl + OID + OTID + OTTID (no fallback, no link if missing any ID)
    PopupWindow = 3, // Static Url with OID
    Custom = 4       // LeftNav + NavPageID + OID + OTID + OTTID (fallback, no link if missing any ID)
  } */
