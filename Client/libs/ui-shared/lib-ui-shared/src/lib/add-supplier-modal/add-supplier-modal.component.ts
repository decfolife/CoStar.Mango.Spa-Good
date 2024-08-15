import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription, combineLatest, of } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ButtonModule, CremFormsModule, CremToastService, DropdownComponent, DropdownModule, InputComponent, InputLabelComponent, LibUiElementsModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { RENDER_SELECT_SUBGROUP_ID, RENDER_SELECT_TEMPLATE_ID, SUPPLIER_OTID, ToastState } from '@mango/data-models/lib-data-models';
import { CommonModule } from '@angular/common';
import { Toast } from 'ngx-toastr';
import { DataService } from '@mango/core-shared';

@Component({
  selector: 'crem-add-supplier-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule, ModalModule, DropdownModule, LibUiElementsModule, InputComponent, InputLabelComponent, ReactiveFormsModule, Toast, FormsModule, CremFormsModule],
  templateUrl: './add-supplier-modal.component.html',
  styleUrls: ['./add-supplier-modal.component.scss'],
})

export class AddSupplierModalComponent {
  @ViewChild('portfolioDropdown') portfolioDropdown: DropdownComponent;
  @ViewChild('templateDropdown') templateDropdown: DropdownComponent;
  @ViewChild('subGroupDropDropdown') subGroupDropDropdown: DropdownComponent;

  componentName = 'Add-supplier-modal'
  supplierForm: FormGroup;
  isSubGroupRequired: boolean;
  showToast = false;
  selectedTemplateID: string;
  saveClicked: boolean;
  saveNewClicked: boolean;
  saveLaunchClicked: boolean;

  public portfolioDropdownItem: any[];
  public templateDropdownItem: any[];
  private subscriptions = new Subscription();
  private subs: Subscription[] = [];
  public subGroupDropdownItem: any[];
  selectedPortfolio: any[];
  private redirectorLinks: any[] = null;

  constructor(
    public dialogRef: MatDialogRef<AddSupplierModalComponent>,
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
    this.initializeSupplierForm();
    this.getDropdownData();
    this.subscriptions.add(this.formWizardService.getClientPreferenceByField("portfolioSubGroupRequired").subscribe(
      (result) => {
        const mappedValues = result.data.map(clientSetupFieldValue => clientSetupFieldValue.ClientSetupFieldValue);
        this.isSubGroupRequired = mappedValues?.some(value => value.includes('1'));
        this.updateSubGroupListValidators();
      }
    ));

    if (this.redirectorLinks === null) {
      this.subs.push(
        this.dataService.getRedirectorLinkList().subscribe(res => {
          this.redirectorLinks = res.data;
        })
      );
    }
  }

  initializeSupplierForm() {
    this.supplierForm = this.fb.group({
      portfolioList: ['', Validators.required],
      supplierName: ['', Validators.required],
      templateList: ['', Validators.required],
      subGroupList: ['']
    });
  }

  updateSubGroupListValidators() {
    const subGroupListControl = this.supplierForm.get('subGroupList');
    this.isSubGroupRequired
      ? subGroupListControl.setValidators([Validators.required])
      : subGroupListControl.clearValidators();
    subGroupListControl.updateValueAndValidity();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getDropdownData() {
    this.subscriptions.add(
      this.formWizardService.getRenderSelect('', 62).subscribe(
        (portfolioDropdownItem) => {
          if (portfolioDropdownItem) {
            this.portfolioDropdownItem = portfolioDropdownItem.data;
          }
          if (portfolioDropdownItem === null || !portfolioDropdownItem.success) {
            this.toastService.show('An error occurred please contact the system administrator.', '', ToastState.ERROR, {
              position: 'bottom right',
              maxWidth: '350px'
            });
          }
        }
      )
    );
  }

  onPortFolioValueChanged(e: any) {
    this.selectedPortfolio = e[0].CompanyID;
    of(this.selectedPortfolio).pipe(
      filter(value => !!value),
      switchMap(value =>
        combineLatest([
          this.formWizardService.getRenderSelect(value, RENDER_SELECT_TEMPLATE_ID).pipe(filter(v => !!v)),
          this.formWizardService.getRenderSelect(value, RENDER_SELECT_SUBGROUP_ID).pipe(filter(v => !!v))
        ])
      ),
      map(([templates, subgroups]) => {
        this.templateDropdownItem = templates.data;
        this.subGroupDropdownItem = subgroups.data;

        if (this.templateDropdownItem && this.templateDropdownItem.length > 0) {
          this.selectedTemplateID = this.templateDropdownItem[0].ObjectTypeTypeID;
        }
      })
    ).subscribe()
  }

  save(e: any) {
    if (this.supplierForm.valid) {
      this.saveClicked = true;
      const supplier = this.getSupplierData();
      this.subscriptions.add(this.formWizardService.addSupplier(supplier).subscribe((result) => {
        if (result.success) {
          this.toastService.show('Supplier created successfully.', '', ToastState.SUCCESS, {
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
      }));
    }
  }

  saveAndNew(e: any) {
    if (this.supplierForm.valid) {
      this.saveNewClicked = true;
      const supplier = this.getSupplierData();
      this.subscriptions.add(this.formWizardService.addSupplier(supplier).subscribe((result) => {
        if (result.success) {
          this.toastService.show('Supplier created successfully.', '', ToastState.SUCCESS, {
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
      }));
    }
  }

  launch(e: any) {
    if (this.supplierForm.valid) {
      this.saveLaunchClicked = true;
      const supplier = this.getSupplierData();
      this.subscriptions.add(this.formWizardService.addSupplier(supplier).subscribe((result) => {
        if (result.success) {
          this.saveLaunchClicked = false;
          this.dialogRef.close();
          const currURL = this.getRedirectorURL(result.data, SUPPLIER_OTID, 301);
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

  getSupplierData() {
    let supplier = {
      buildingMasterGroupID: this.supplierForm.get('portfolioList').value[0],
      buildingName: this.supplierForm.get('supplierName').value,
      objectTypeTypeID: this.supplierForm.get('templateList').value[0],
      portfolioSubGroupID: this.supplierForm.get('subGroupList').value[0]
    };
    return supplier;
  }

  public close() {
    this.dialogRef.close();
  }

  getId(componentName: string, uniqueName: string, elementType: string, componentType?: string) {
    return componentType
      ? `${componentName}-${componentType}-${uniqueName}-${elementType}`
      : `${componentName}-${uniqueName}-${elementType}`;
  }

  resetPopupSelection() {
    this.portfolioDropdown.clearSelectBox();
    this.templateDropdown.clearSelectBox();
    this.subGroupDropDropdown.clearSelectBox();
    this.supplierForm.reset();
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
