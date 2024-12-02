import { DistributionListMember } from './distribution-list-member.interface';

export interface DistributionList {
  groupID: number;
  groupName: string;
  modifiedBy: string;
  modifiedDate: Date;
  membersCount: number;
  createdBy: string;
  createdDate: Date;
  securityLevel: string;
  canEdit: boolean;
  canDelete: boolean;
  members: DistributionListMember[];
}
