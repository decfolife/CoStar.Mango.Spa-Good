export interface ProjectTeamMember {
  isManager: boolean;
  teamID: number;
  contactID: number;
  teamMember: string;
  firstName?: string;
  lastName?: string;
  companyID: number;
  company: string;
  role: string;
  emailNotifications: boolean;
  accessLevel: number;
  shared: boolean;
  expirationType: string;
  expirationDate?: Date;
  description: string;
  openTasks: number;
  email: string;
  phone: string;
  memberType: string;
  allowLogOn: boolean;
  isActive: boolean;
  projectTasks: ProjectTask[];
  taskStatusCounts: TaskStatusCount[];
}

export interface ProjectTask {
  contactID: number;
  taskID: number;
  name: string;
  approvalDate?: Date;
  userApprovalDate?: Date;
  taskComplete?: Date;
  actualStartDate: string;
  hoursToDate: number;
  hoursLastUpdated: string;
}

export interface TaskStatusCount {
  contactID: number;
  count: number;
  status: string;
}

export interface RemoveTeamMembers {
  projectId: number;
  teamMembers: RemoveMember[];
}

export interface RemoveMember {
  commonTeamId: number;
  contactId: number;
}

export interface UpdateProjectTeamMember {
  projectID: number;
  contactID: number;
  contactRole: string;
  email: boolean;
  roleLevel: number;
  shareRightsWithGroup: boolean;
  update: number;
  userID: number;
  expirationType: string;
  expirationDate: Date;
  contactNotes: string;
}

export interface UpdateTemporaryUser {
  projectId: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  description: string;
  expirationType: string;
  expirationDate: Date;
  level: number;
  creationTime: Date;
  projectName: string;
  isEmailOn: boolean;
  projectAdminContactFirstName: string;
  projectAdminContactLastName: string;
  projectAdminContactEmail: string;
}

export interface UpdateContact {
  projectID: number;
  contactID: number;
  contactRole: string;
  contactNotes: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  createdBy: number;
}

export interface AssignTasks {
  contactID: number;
  assignTasks: AssignTask[];
}
export interface AssignTask {
  isAdd: number;
  taskID: number;
}
