
export class ListViewPrivilege {
    id: Number;
    listPageQueryId: number;
    entityType : string;
    entityName : string;
    privilegeType : string;

    constructor(id, listPageQueryId, entityType, entityName, privilegeType) {
    	this.id = id;
    	this.listPageQueryId = listPageQueryId;
    	this.entityType = entityType;
    	this.entityName = entityName;
    	this.privilegeType = privilegeType;    	
    }
}

export let listViewPrivileges : ListViewPrivilege[] = [
    new ListViewPrivilege(1, 11, 'Group', "The Whole Company", "View"),
    new ListViewPrivilege(2, 11, 'User', "Alexander Hamilton", "Delete"),   
    new ListViewPrivilege(3, 11, 'User', "George Washington", "Delete"),   
    new ListViewPrivilege(4, 11, 'User', "Aaron Burr", "Delete"),   
    new ListViewPrivilege(5, 11, 'User', "James Madison", "Delete"),   
    new ListViewPrivilege(6, 11, 'User', "Thomas Jefferson", "Delete"),   
    new ListViewPrivilege(7, 11, 'User', "John Adams", "Delete"),   
    new ListViewPrivilege(8, 11, 'User', "Thomas Lee", "Delete"),   
    new ListViewPrivilege(9, 11, 'User', "John Lawrence", "Delete"),   
    new ListViewPrivilege(10, 11, 'User', "Hercules Mulligan", "Delete"),   
    new ListViewPrivilege(11, 11, 'User', "Elizabeth Scuyler", "Delete"),   
    new ListViewPrivilege(12, 11, 'User', "Mariah Reynolds", "Delete"),   
];