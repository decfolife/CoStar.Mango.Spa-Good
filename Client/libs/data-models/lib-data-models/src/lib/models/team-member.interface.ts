export interface TeamMember {
  teamId: number;
  memberId: number;
  name: string;
  company: string;
  companyId: number;
  contactId: number;
  email: string;
  phoneNumber: string;
  emailOn: boolean;
  role: string;
  level: number;
  share: boolean;
  isActive: boolean;
  allowLogOn: boolean;
  editMode?: boolean;
}
