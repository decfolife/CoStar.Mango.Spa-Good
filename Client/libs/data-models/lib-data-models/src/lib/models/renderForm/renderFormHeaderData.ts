export class RenderFormHeaderData {
    isVisible: boolean;
    
    data: {
        formName: string;
        objectTypeId: number;
    }

    constructor(isVisible: boolean = false, data = null) {
        this.isVisible = isVisible;
        this.data = data;
    }
}