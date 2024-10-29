export interface ChargeAllocations {
  leaseAbstractID: number;
  gLEventID: number;
  gLAllocationsID: number;
  gLAllocationsID1: number;
  gLAllocationName1: string;
  gLAllocationsID2: number;
  gLAllocationName2: string;
  gLAllocationsID3: number;
  gLAllocationName3: string;
  gLAllocationsID4: number;
  gLAllocationName4: string;
  costPercent: number; //decimal on the backend
  spacePercent: number; //decimal on the weekend
  headCount: number; //decimal on the backend;
  status: string;
  useType: string;
}
