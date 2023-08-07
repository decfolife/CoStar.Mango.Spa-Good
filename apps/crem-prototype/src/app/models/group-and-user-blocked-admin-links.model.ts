export class GroupAndUserBlockedAdminLink {
    type: string;
    id: number;
    name: string;
    adminSection: string;
    adminLink: string;
    lastModifiedBy: string;
    lastModified: string;

	constructor(type, id, name, adminSection, adminLink, lastModifiedBy, lastModified) {
        this.type = type;
		this.id = id;
		this.name = name;
		this.adminSection = adminSection;
		this.adminLink = adminLink;
		this.lastModifiedBy = lastModifiedBy;
		this.lastModified = lastModified;				
	}
}

export let groupAndUserBlockedAdminLink : GroupAndUserBlockedAdminLink[] = [
    new GroupAndUserBlockedAdminLink('User', 2, 'Arregetti, Jake', 'Client Configurations', 'Menu Headings', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 2, 'Arregetti, Jake', 'Client Configurations', 'List Pages', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'Portfolio Hierarchy Maintenance', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'Central Document Store', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'User Maintenance', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'Security Group Maintenance', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'Object Maintenance', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'Form Help Text and Data Dictionary', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'Data Set Help Text and Data Dictionary', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'Left Nav Admin', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'FAQs', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'CoStar Property Lookup', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'Reports Schedules', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('User', 217, 'Jupiter, Elyse', 'Quick Links', 'Security Profiles', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('Group', 446, 'Region Access Rights', 'Quick Links', 'Reports Schedules', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('Group', 2852, 'SegAdminHomePage_Test', 'Quick Links', 'Portfolio Hierarchy Maintenance', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('Group', 2852, 'SegAdminHomePage_Test', 'Quick Links', 'Central Document Store', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('Group', 2852, 'SegAdminHomePage_Test', 'Quick Links', 'User Maintenance', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('Group', 2852, 'SegAdminHomePage_Test', 'Financials', 'Sales Tax Authorities', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
    new GroupAndUserBlockedAdminLink('Group', 2852, 'SegAdminHomePage_Test', 'Financials', 'Allocation Centers', 'Arregetti, Jake', '1/13/2020 10:57:20 AM'),
]