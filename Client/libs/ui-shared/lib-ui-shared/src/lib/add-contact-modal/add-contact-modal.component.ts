import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ButtonModule, CremFormsModule, CremToastService, DropdownComponent, DropdownModule, InputComponent, InputLabelComponent, LibUiElementsModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { ObjectType, RequestType, ToastState, ObjectTypeTypeID } from '@mango/data-models/lib-data-models';
import { CommonModule } from '@angular/common';
import { Toast } from 'ngx-toastr';
import { DataService } from '@mango/core-shared';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

@Component({
  selector: 'crem-add-contact-modal-component',
  templateUrl: './add-contact-modal.component.html',
  standalone: true,
  imports: [CommonModule, ButtonModule, ModalModule, DropdownModule, LibUiElementsModule, InputComponent, InputLabelComponent, ReactiveFormsModule, Toast, FormsModule, CremFormsModule],
  styleUrls: ['./add-contact-modal.component.scss']
})

export class AddContactModalComponent {
  @ViewChild('contactGroupDropdown') contactGroupDropdown: DropdownComponent;
  @ViewChild('subGroupDropDropdown') subGroupDropDropdown: DropdownComponent;
  @ViewChild('companyDropdown') companyDropdown: DropdownComponent;

  componentName = 'Add-contact-modal'
  contactForm: FormGroup;
  isSubGroupRequired: boolean;
  showToast = false;
  selectedTemplateID: string;
  saveClicked: boolean;
  saveNewClicked: boolean;
  saveLaunchClicked: boolean;

  public companyDropdownItem: any[];
  public contactGroupDropdownItem: any[];
  private subscriptions = new Subscription();
  private subs: Subscription[] = [];
  public subGroupDropdownItem: any[];
  selectedPortfolio: any[];
  private redirectorLinks: any[] = null;

  contactGroupDefaultValue: any;

  constructor(
    public dialogRef: MatDialogRef<AddContactModalComponent>,
    private formWizardService: FormWizardService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: CremToastService,
    private dataService: DataService,

    @Inject(MAT_DIALOG_DATA) public data: {
      objectTypeName: string;
      objectTypeId: number;
    }) { }

  ngOnInit(): void {
    this.contactForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailAddress: [''],
      isPublic: [''],
      subGroupList: [''],
      companyName: [''],
      groupList: ['']
    });

    this.subscriptions.add(this.loadDropdownData().subscribe());

    this.contactForm.get('isPublic').setValue("true");
    this.contactForm.get('subGroupList').setValue(2);

    if (this.redirectorLinks === null) {
      this.subs.push(
        this.dataService.getRedirectorLinkList().subscribe(res => {
          this.redirectorLinks = res.data;
        })
      );
    }
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  loadDropdownData(): Observable<any> {
    return combineLatest([
      this.formWizardService.getRenderSelect('', RequestType.CONTACT_GROUP_LIST),
      this.formWizardService.getRenderSelect(0, RequestType.CONTACT_COMPANY_LIST),
    ]).pipe(
      filter(([
        contactGroupDropdownItem,
        companyDropdownItem
      ]) => !!contactGroupDropdownItem && !!companyDropdownItem),
      tap(([
        contactGroupDropdownItem,
        companyDropdownItem]) => {
        this.contactGroupDropdownItem = contactGroupDropdownItem.data;
        this.companyDropdownItem = companyDropdownItem.data;
      })
    )
  }

  public save() {
    if (this.contactForm.valid) {
      this.saveClicked = true;
      const contactRequest = this.getContactData();
      this.validateEmailAddress(contactRequest.emailAddress) ? this.subscriptions.add(this.formWizardService.addContact(contactRequest).subscribe((result) => {
        if (result) {
          this.toastService.show('Contact created successfully.', '', ToastState.SUCCESS, {
            position: 'bottom right',
            maxWidth: '350px'
          });
          this.dialogRef.close();
          this.saveClicked = false;

        } else {
          this.toastService.show('An error has occurred. Please try again.', '', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '350px'
          });
        }
      })) : this.saveClicked = false;
    }
  }

  public saveAndNew() {
    if (this.contactForm.valid) {
      this.saveNewClicked = true;
      const contactRequest = this.getContactData();
      this.validateEmailAddress(contactRequest.emailAddress) ? this.subscriptions.add(this.formWizardService.addContact(contactRequest).subscribe((result) => {
        if (result.success) {
          this.toastService.show('Contact created successfully.', '', ToastState.SUCCESS, {
            position: 'bottom right',
            maxWidth: '350px'
          });
          this.saveNewClicked = false;
          this.resetPopupSelection();
        } else {
          this.toastService.show('An error has occurred. Please try again.', '', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '350px'
          });
        }
      })) : this.saveNewClicked = false;
    }
  }

  public launch() {
    if (this.contactForm.valid) {
      this.saveLaunchClicked = true;
      const contactRequest = this.getContactData();
      this.validateEmailAddress(contactRequest.emailAddress) ? this.subscriptions.add(this.formWizardService.addContact(contactRequest).subscribe((result) => {
        if (result.success) {
          this.saveLaunchClicked = false;
          this.dialogRef.close();
          const currURL = this.getRedirectorURL(result.data, ObjectType.CONTACT, ObjectTypeTypeID.CONTACT_OTTID);
          this.router.navigateByUrl(currURL);
        } else {
          this.toastService.show('An error has occurred. Please try again.', '', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '350px'
          });
        }
      })) : this.saveLaunchClicked = false;
    }
  }

  getContactData() {
    let contact = {
      firstName: this.contactForm.get('firstName').value,
      lastName: this.contactForm.get('lastName').value,
      emailAddress: this.contactForm.get('emailAddress').value,
      ContactPublic: Boolean(this.contactForm.get('isPublic').value[0]),
      CompanyID: this.contactForm.get('companyName').value[0],
      ContactGroup: this.contactForm.get('groupList').value[0],
      GroupSecurityLevel: this.contactForm.get('subGroupList').value ?? this.contactForm.get('subGroupList').value[0],
      ObjectTypeTypeID: ObjectTypeTypeID.CONTACT_OTTID
    };
    return contact;
  }

  validateEmailAddress(emailAddress: string) {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
;
    if ( regexp.test(emailAddress) === false){
      this.toastService.show('Enter Valid email address.', '', ToastState.ERROR, {
        position: 'bottom right',
        maxWidth: '350px'
      });
      this.saveClicked = false;
      return false;
    }
    return true;
  }

  public close() {
    this.dialogRef.close();
  }

  getId(componentName: string, uniqueName: string, elementType: string, componentType?: string) {
    if (componentType != undefined)
      return `${componentName}-${componentType}-${uniqueName}-${elementType}`
    else
      return `${componentName}-${uniqueName}-${elementType}`
  }

  resetPopupSelection() {
    this.companyDropdown.clearSelectBox();
    this.contactGroupDropdown.clearSelectBox();
    this.subGroupDropDropdown.clearSelectBox();
    this.contactForm.reset();
  }

  getRedirectorURL(objectId: number, objectTypeId: number, objectTypeTypeId: number): string {
    let getURL = this.redirectorLinks.find(
      x => x.objectTypeId === objectTypeId && x.objectTypeTypeId === objectTypeTypeId
    );
    getURL = getURL ?? this.redirectorLinks.find(x => x.objectTypeId === objectTypeId);
    let urlLink = getURL ? getURL.urlLink : 'not found';
    urlLink = urlLink
      .replace(/\[OID\]/, objectId)
      .replace(/\[OTID\]/, objectTypeId)
      .replace(/\[OTTID\]/, objectTypeTypeId);
    return urlLink;
  }
}