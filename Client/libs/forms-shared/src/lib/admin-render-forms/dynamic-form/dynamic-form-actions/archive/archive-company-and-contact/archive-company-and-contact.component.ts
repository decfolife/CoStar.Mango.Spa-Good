/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable rxjs-angular/prefer-composition */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { ArchiveActionService } from './../../../../../../../../../apps/mango-crem-features/object-actions/src/app/shared/services/archive-action.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {
  ButtonModule,
  CremToastService,
  DropdownModule,
  LoaderModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { CommonModule } from '@angular/common';
import { ToastState } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-dynamic-form-archive-action',
  templateUrl: './archive-company-and-contact.component.html',
  styleUrls: ['./archive-company-and-contact.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    LoaderModule,
    DropdownModule,
    ModalModule,
  ],
  providers: [ArchiveActionService],
})
export class ArchiveCompanyAndContactComponent implements OnInit {
  public buildingData: any = [];
  public modalTitle: string;
  public loading = true;
  public objectName: string;

  constructor(
    public dialogRef: MatDialogRef<ArchiveCompanyAndContactComponent>,
    public service: ArchiveActionService,
    private toastService: CremToastService,
    private router: Router,
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
      this.service.checkSystemUser(this.data.OID)
        .subscribe((result) => {
          if (result?.data?.[0]?.SystemUser === 0) {
            // non system user path, proceed to archive confirmation
            this.service.getContactName(this.data.OID).subscribe((result) => {
              this.objectName = result?.data?.[0]?.Name;
              this.loading = false;
            });

            return;
          } 

          // system user path, error out
          this.showInvalidArchiveMessage();
        });
    } else if (this.data.archiveType === 'Company') {
      this.objectName = this.data.objectName;
      this.service
        .GetCompanyVendorsCustomers(this.data.OID)
        .subscribe((result) => {
          if (result?.data?.[0]?.VendorCount === 0) {
            this.loading = false;
            return;
          } 

          this.showInvalidArchiveMessage();
        });
        
      this.loading = false;
    }

    this.modalTitle = `Archive ${this.data.archiveType}`;
  }

  public close(data?: any) {
    this.dialogRef.close(data);
  }

  public archive() {
    let path = window.location.pathname;
    let params = window.location.search;
    params = params.replace('&pgMode=Edit', '');

    if (this.data.archiveType === 'Contact') {
      this.service.archiveContact(this.data.OID).subscribe((result) => {
        if (result.success) {
          this.showSuccessMessage();
          this.close();
          this.router.navigateByUrl(`${path}${params}`);
          return;
        }

        this.showErrorMessage();
      });
    } else if (this.data.archiveType === 'Company') {
      this.service.archiveCompany(this.data.OID).subscribe((result) => {
        if (result.success) {
          this.showSuccessMessage();
          this.close();
          this.router.navigateByUrl(`${path}${params}`);
          return;
        }

        this.showErrorMessage();
      });
    }
  }

  private showInvalidArchiveMessage() {
    let message = this.data.archiveType === 'Contact'
      ? 'Unable to archive a system user from the Contacts module. ' +
        'System users must be inactivated through the Admin module prior to archiving.'
      : 'Unable to archive a company with existing active vendors or customers. ' +
        'Please archive all active vendors and customers before archiving ' +
        this.data.objectName + '.';

    this.toastService.show(
      message,
      'Error',
      ToastState.ERROR
    );

    this.loading = false;
    this.close();
  }

  private showSuccessMessage() {
    this.toastService.show(
      `${this.data.archiveType} archived successfully.`,
      'Success',
      ToastState.SUCCESS
    );
  }

  private showErrorMessage() {
    this.toastService.show(
      `Error archiving ${this.data.archiveType}.`,
      'Error',
      ToastState.ERROR
    );
  }
}
