import { TeamMember } from './team-member.interface';

export interface Team {
  teamId: number;
  teamName: string;
  modifiedBy: string;
  modifiedDate: Date;
  members: number;
  createdBy: string;
  createdDate: Date;
  securityLevel: string;
  canEdit: boolean;
  canDelete: boolean;
  teamMembers: TeamMember[];
}
