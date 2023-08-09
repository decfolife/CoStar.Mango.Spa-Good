/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Component, Input } from '@angular/core';
import { ArchiveLeaseComponent } from '../modal/archive-lease/archive-lease.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { ArchiveCompanyAndContactComponent } from '../modal/archive-company-and-contact/archive-company-and-contact.component';

@Component({
  selector: 'mango-object-actions',
  templateUrl: './object-actions.component.html',
  styleUrls: ['./object-actions.component.scss']
})
export class ObjectActionsComponent {
  @Input() objectTypeTypeId: number;
  @Input() objectTypeId: number;
  @Input() objectId: number;
  @Input() hiddenPremise: number;
  @Input() objectName: string;
  public popupVisible: boolean = false;
  public buildingData: any = [];
  public leaseData: any = [];
  public buildingGridColumns: any[] | null = [];
  public leaseGridColumns: any[] | null = [];
  public ObjectTypeTypeName: string;

  constructor(
    private dialog: MatDialog
  ) { }

  public openObjectActionArchivePopup() {
    const isLocal = environment.name === 'LOCAL';
    if (!this.objectId && isLocal) {
      this.objectTypeId = 2;
      this.objectId = 433;
      this.objectTypeTypeId = 500;
      this.hiddenPremise = 0;
      this.objectName = 'Test Name';
    }
    if (Number(this.objectTypeId) === 2 || Number(this.objectTypeId) === 3 || Number(this.objectTypeId) === 4) {
      const dialogRef = this.dialog.open(ArchiveLeaseComponent, {
        disableClose: true,
        height: '780px',
        width: '75%',
        data: {
          archiveType: (Number(this.objectTypeId) === 3) ? 'Building' : 
          ((Number(this.objectTypeId) === 2 ) ? 'Premise' : 'Lease'),
          OID: Number(this.objectId),
          OTTID: Number(this.objectTypeTypeId),
          hiddenPremise: Number(this.hiddenPremise)
        }
      });
  
    } else if (Number(this.objectTypeId) === 5 || Number(this.objectTypeId) === 11) {
      const dialogRef = this.dialog.open(ArchiveCompanyAndContactComponent, {
        disableClose: true,
        width: '400px',
        data: {
          archiveType: (Number(this.objectTypeId) === 5) ? 'Contact' : 'Company',
          OID: Number(this.objectId),
          OTTID: Number(this.objectTypeTypeId),
          hiddenPremise: Number(this.hiddenPremise),
          objectName: (this.objectName)
        }
      });
  
    }
    
  }

  public openObjectActionArchiveHidden() {
    this.popupVisible = false;
  }
}
