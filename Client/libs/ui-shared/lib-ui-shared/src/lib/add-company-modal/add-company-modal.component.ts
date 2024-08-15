import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { DashboardService } from '@project-dashboard/services/dashboard.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, combineLatest, of } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { ButtonModule, CremFormsModule, CremToastService, DropdownComponent, DropdownModule, InputComponent, InputLabelComponent, LibUiElementsModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { RENDER_SELECT_REUQESTTYPE_ID, RENDER_SELECT_COMPANY_LOOKUP_ID, ToastState, COMPANY_OTID, COMPANY_OTTID, DEFAULT_DELETE_RIGHT } from '@mango/data-models/lib-data-models';
import { CommonModule } from '@angular/common';
import { Toast } from 'ngx-toastr';
import { DataService } from '@mango/core-shared';

@Component({
  selector: 'crem-add-company-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule, ModalModule, DropdownModule, LibUiElementsModule, InputComponent, InputLabelComponent, ReactiveFormsModule, Toast, FormsModule, CremFormsModule],
  templateUrl: './add-company-modal.component.html',
  styleUrls: ['./add-company-modal.component.scss'],
})

export class AddCompanyModalComponent {
  @ViewChild('typeDropdown') typeDropdown: DropdownComponent;
  @ViewChild('primaryGroupDropdown') primaryGroupDropdown: DropdownComponent;
  
  componentName = 'Add-company-modal'
  companyForm: FormGroup;
  showToast: boolean = false;
  saveClicked: boolean;
  saveNewClicked: boolean;
  saveLaunchClicked: boolean;

  public typeDropdownItem: any = [];
  public primaryGroupDropdownItem: any = [];
  private subscriptions = new Subscription();
  private subs: Subscription[] = [];
  public subGroupDropdownItem: any = [];
  initialSelectedType: number;
  private redirectorLinks: any[] = null;

  constructor(
    public dialogRef: MatDialogRef<AddCompanyModalComponent>,
    private formWizardService: FormWizardService,
    private dashboardService: DashboardService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: CremToastService,
    private dataService: DataService,

    @Inject(MAT_DIALOG_DATA) public data: {
      objectTypeName: string;
      objectTypeId: number;
    }

  ) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      typeList: ['', Validators.required],
      primaryGroupList: ['', Validators.required],
    });

    this.companyForm.valueChanges.subscribe((value) => {
            console.log('Form value changed:', this.companyForm);

    });
    this.getTypeData();
    this.getPrimaryGroupData();

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

  getTypeData() {
    this.subscriptions.add(
      combineLatest([
        this.formWizardService.getRenderSelect(RENDER_SELECT_COMPANY_LOOKUP_ID.toString(), RENDER_SELECT_REUQESTTYPE_ID)
      ]).pipe(
        filter(([
          typeDropdownItem,
        ]) => !!typeDropdownItem),
        tap(([
          typeDropdownItem,
        ]) => {
          this.typeDropdownItem = typeDropdownItem.data;
          //console.log('Type Dropdown ', this.typeDropdownItem);
          this.initialSelectedType = this.typeDropdownItem.find(elem => elem.ObjectTypeTypeName === 'Company')?.ObjectTypeTypeID 
        })
      ).subscribe())
  }

  getPrimaryGroupData() {
    this.subscriptions.add(
      combineLatest([
        this.formWizardService.getAllUserGroups()
      ]).pipe(
        filter(([
          primaryGroupDropdownItem,
        ]) => !!primaryGroupDropdownItem),
        tap(([
          primaryGroupDropdownItem,
        ]) => {
          this.primaryGroupDropdownItem = primaryGroupDropdownItem.data;
          console.log('Primary Group New ', this.primaryGroupDropdownItem);
        })
      ).subscribe())
  }

  save(e: any) {
    if (this.companyForm.valid) {
      this.saveClicked = true;
      const company = this.getCompanyData();
      this.subscriptions.add(this.formWizardService.addCompany(company).subscribe((result) => {
        if (result.success) {
          this.toastService.show('Company created successfully.', 'Add Company', ToastState.SUCCESS, {
            position: 'bottom right',
            maxWidth: '400px'
            });
          this.dialogRef.close();
          this.saveClicked = false;
        } else {
          this.toastService.show('There was an error saving the Company.', 'Add Company', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '400px',
          });
        }
      }));
    }
  }

  saveAndNew(e: any) {
    if (this.companyForm.valid) {
      this.saveNewClicked = true;
      const company = this.getCompanyData();
      this.subscriptions.add(this.formWizardService.addCompany(company).subscribe((result) => {
        if (result.success) {
          this.toastService.show('Company created successfully.', 'Add Company', ToastState.SUCCESS, {
            position: 'bottom right',
            maxWidth: '400px'
          });
          this.saveNewClicked = false;
          this.resetPopupSelection();
        } else {
          this.toastService.show('There was an error saving the Company.', 'Add Company', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '400px',
          });
        }
      }));
    }
  }

  launch(e: any) {
    if (this.companyForm.valid) {
      this.saveLaunchClicked = true;
      const company = this.getCompanyData();
      this.subscriptions.add(this.formWizardService.addCompany(company).subscribe((result) => {
        if (result.success) {
          this.saveLaunchClicked = false;
          this.dialogRef.close();
          const currURL = this.getRedirectorURL(result.data, COMPANY_OTID, COMPANY_OTTID);
          this.router.navigateByUrl(currURL);
        } else {
          this.toastService.show('An error has occurred. Please try again.', '', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '350px'
          });
        }
      }));
    }
  }

  getCompanyData() {
    let company = {
      objectTypeTypeID: this.companyForm.get('typeList').value,
      companyName: this.companyForm.get('companyName').value,
      companyID: this.companyForm.get('primaryGroupList').value,
      groupSecrityLevel: DEFAULT_DELETE_RIGHT
    };
    return company;
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
    this.typeDropdown.clearSelectBox();
    this.primaryGroupDropdown.clearSelectBox();
    this.companyForm.reset();
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
