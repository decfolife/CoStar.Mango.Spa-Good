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
  level: string;
  share: boolean;
  editMode?: boolean;
}