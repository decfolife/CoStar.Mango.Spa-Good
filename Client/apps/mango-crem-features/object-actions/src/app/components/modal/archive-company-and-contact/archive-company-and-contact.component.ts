/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArchiveActionService } from '../../../shared/services/archive-action.service';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'mango-archive-action',
  templateUrl: './archive-company-and-contact.component.html',
  styleUrls: ['./archive-company-and-contact.component.scss'],
})
export class ArchiveCompanyAndContactComponent implements OnInit {
  public buildingData: any = [];
  public modalTitle: string;
  public loading = true;
  public primaryFooterButtonText: string = 'Archive';
  public closeOrCancelButtonText: string = 'Cancel';
  public objectName: string;

  constructor(
    public dialogRef: MatDialogRef<ArchiveCompanyAndContactComponent>,
    public service: ArchiveActionService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      archiveType: string;
      OID: number;
      OTTID: number;
      objectName: string;
    }
  ) {}

  ngOnInit(): void {
    if (this.data.archiveType === 'Contact') {
      this.service.checkSystemUser(this.data.OID).subscribe((result) => {
        if (result?.data?.[0]?.SystemUser === 0) {
          // non system user path, proceed to archive confirmation
          this.service.getContactName(this.data.OID).subscribe((result) => {
            this.objectName = result?.data?.[0]?.Name;
            this.loading = false;
          });
        } else {
          // system user path, error out
          this.invalidArchive();
        }
      });
    } else if (this.data.archiveType === 'Company') {
      this.objectName = this.data.objectName;
      this.service
        .GetCompanyVendorsCustomers(this.data.OID)
        .subscribe((result) => {
          if (result?.data?.[0]?.VendorCount === 0) {
            this.loading = false;
          } else {
            this.invalidArchive();
          }
        });
      this.loading = false;
    }

    this.buildModalTitle();
  }

  public invalidArchive() {
    notify({
      //eslint-disable-next-line max-len
      message:
        this.data.archiveType === 'Contact'
          ? 'Unable to archive a system user from the Contacts module. ' +
            'System users must be inactivated through the Admin module prior to archiving.'
          : 'Unable to archive a company with existing active vendors or customers. ' +
            'Please archive all active vendors and customers before archiving ' +
            this.data.objectName +
            '.',
      type: 'error',
      displayTime: 8000,
      position: { my: 'bottom right', at: 'bottom right', offset: '-16 -16' },
      maxWidth: '600px',
      closeOnClick: true,
    });
    this.loading = false;
    this.close();
  }

  public close(data?: any) {
    this.dialogRef.close(data);
  }

  public closeDialog() {
    this.dialogRef.close('');
  }

  public archive() {
    if (this.data.archiveType === 'Contact') {
      this.service.archiveContact(this.data.OID).subscribe((result) => {
        if (result.success) {
          this.showMessage();
          this.close();
          const url = window.location.href;
          window.location.href = url.replace('&pgMode=Edit', '');
        }
      });
    } else if (this.data.archiveType === 'Company') {
      this.service.archiveCompany(this.data.OID).subscribe((result) => {
        if (result.success) {
          this.showMessage();
          this.close();
          const url = window.location.href;
          window.location.href = url.replace('&pgMode=Edit', '');
        }
      });
    }
  }

  public showMessage() {
    notify({
      message: this.data.archiveType + ' archived successfully.',
      type: 'success',
      displayTime: 2000,
      position: { at: 'bottom right', my: 'bottom right', offset: '-16 -16' },
      maxWidth: '400px',
      closeOnClick: true,
    });
  }

  public buildModalTitle() {
    this.modalTitle = this.data.archiveType + ' Archive';
  }
}
