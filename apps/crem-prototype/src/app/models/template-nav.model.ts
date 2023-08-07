export class TemplateNav {
    id : number;	
	objectTemplateId : Number;
	name : string;
	form : string;
	isLanding : Boolean;
	objectTemplateName : String;
	pageType : String;
	objectType : String;
	customRights : Boolean;

	constructor( id, objectTemplateId, name, form, isLanding, objectTemplateName, pageType, objectType, customRights ) {
		this.id = id;
		this.objectTemplateId = objectTemplateId;	
		this.name = name;		
		this.form = form;
		this.isLanding = isLanding;
		this.objectTemplateName = objectTemplateName;
		this.pageType = pageType;
		this.objectType = objectType;
		this.customRights = customRights;
	}
}

export let templateNavs : TemplateNav[] = [
	new TemplateNav(1, 1, 'Details', 'Building_Details', true, 'Property', 'Dynamic Form', 'Building', false),
	new TemplateNav(1, 1, 'Strategy', 'Building_Strategy', false, 'Property', 'Dynamic Form', 'Building', false),
	new TemplateNav(1, 1, 'Notes', null, false, 'Property', 'Notes', 'Building', false),
	new TemplateNav(1, 1, 'Files', null, false, 'Property', 'Files', 'Building', false),
	new TemplateNav(1, 1, 'History', null, false, 'Property', 'History', 'Building', false),
];
