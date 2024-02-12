export interface ProjectTeamMember {
  isManager: boolean;
  teamID: number;
  contactID: number; 
  teamMember: string;
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
  teamMembers: RemoveMember [];
} 

export interface RemoveMember {
  commonTeamId: number;
  contactId: number;
}
