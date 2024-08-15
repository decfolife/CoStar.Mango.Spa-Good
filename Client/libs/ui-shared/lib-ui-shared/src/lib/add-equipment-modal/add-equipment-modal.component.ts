import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '@mango/core-shared';
import { CURRENCY_DROPDOWN_ERROR, ContactRecord, EQUIPMENT_OTID, EQUIPMENT_RENDER_SELECT_SUPPLIER_ID, EQUIPMENT_RENDER_SELECT_TEMPLATE_ID, EQUIPMENT_WIZARD_SAVE_ERROR, EQUIPMENT_WIZARD_SAVE_SUCCESS, PORTFOLIO_DROPDOWN_ERROR, ToastState, VALIDATION_ERROR } from '@mango/data-models/lib-data-models';
import { ButtonModule, CremFormsModule, CremToastService, DatePickerComponent, DatePickerModule, DropdownComponent, DropdownModule, InputComponent, LibUiElementsModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { MangoAppFacade } from "@mangoSpa/src/app/+state/app/app.facade";
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { Toast } from 'ngx-toastr';
import { Subscription, combineLatest, of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'crem-add-equipment-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule, ModalModule, DropdownModule, LibUiElementsModule, InputComponent, ReactiveFormsModule, Toast, CremFormsModule, DatePickerModule],
  templateUrl: './add-equipment-modal.component.html',
  styleUrls: ['./add-equipment-modal.component.scss'],
  providers: [DatePipe]
})

export class AddEquipmentModalComponent {
  @ViewChild('portfolioDropdown') portfolioDropdown: DropdownComponent;
  @ViewChild('supplierDropdown') supplierDropdown: DropdownComponent;
  @ViewChild('templateDropdown') templateDropdown: DropdownComponent;
  @ViewChild('currencyDropdown') currencyDropdown: DropdownComponent;
  @ViewChild("beginDatePicker") BeginDate: DatePickerComponent;
  @ViewChild("endDatePicker") EndDate: DatePickerComponent;

  componentName = 'Add-equipment-modal'
  equipmentForm: FormGroup;
  iscurrencyTypeRequired: boolean;
  showToast: boolean = false;
  selectedTemplateID: string;
  selectedSupplierID: string;
  legalEntityName: string;
  saveClicked: boolean;
  saveNewClicked: boolean;
  saveLaunchClicked: boolean;
  dateFormat: string = "";

  private currentUserInfo$: Observable<ContactRecord>;

  public portfolioDropdownItem: any = [];
  public supplierDropdownItem: any = [];
  public templateDropdownItem: any = [];
  private subscriptions = new Subscription();
  subs: Subscription[] = [];
  isUserDatesEU: boolean = true;
  public currencyDropdownItem: any = [];
  selectedCurrency: string;
  selectedPortfolio: any;
  selectedSupplier: any;
  private redirectorLinks: any[] = null;

  constructor(
    public dialogRef: MatDialogRef<AddEquipmentModalComponent>,
    private formWizardService: FormWizardService,
    private router: Router,
    private fb: FormBuilder,
    private toastService: CremToastService,
    private facade: MangoAppFacade,
    public datePipe: DatePipe,
    private dataService: DataService,

    @Inject(MAT_DIALOG_DATA) public data: {
      objectTypeName: string;
      objectTypeId: number;
    }) { }

  ngOnInit(): void {
    this.generateAddEquipmentFormGroup();
    this.getDropdownData();

    this.subscriptions.add(
      this.formWizardService.getUserPreferences().subscribe((response) => {
      if (response?.data?.isDatesEU === true) {
        this.dateFormat = "dd.MM.yyyy"
      }
      this.equipmentForm.get('currencyTypeList').setValue(response?.data?.currencyId);
    })
    )

    if (this.redirectorLinks === null) {
      this.subs.push(
        this.dataService.getRedirectorLinkList().subscribe(res => {
          this.redirectorLinks = res.data;
        })
      );
    }
  }

  generateAddEquipmentFormGroup() : void {
    this.equipmentForm = this.fb.group({
      portfolioList: ['', Validators.required],
      supplierList: ['', Validators.required],
      templateList: ['', Validators.required],
      currencyTypeList: ['', Validators.required],
      legalEntityName: ['', Validators.required],
      beginDate:['', Validators.required],
      endDate:['', Validators.required]
    });
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
            this.toastService.show(PORTFOLIO_DROPDOWN_ERROR, '', ToastState.ERROR, {
              position: 'bottom right',
              maxWidth: '375px'
            });
          }
        } 
      )
    );

    this.subscriptions.add(
      this.formWizardService.getRenderSelect('', 21).subscribe(
        (currencyDropdownItem) => {
          if (currencyDropdownItem) {
            this.currencyDropdownItem = currencyDropdownItem.data;
          }
          if (currencyDropdownItem === null || !currencyDropdownItem.success) {
            this.toastService.show(CURRENCY_DROPDOWN_ERROR, '', ToastState.ERROR, {
              position: 'bottom right',
              maxWidth: '375px'
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
          this.formWizardService.getRenderSelect(value, EQUIPMENT_RENDER_SELECT_TEMPLATE_ID).pipe(filter(v => !!v)),
          this.formWizardService.getRenderSelect(value, EQUIPMENT_RENDER_SELECT_SUPPLIER_ID).pipe(filter(v => !!v))
        ])
      ),
      map(([templates, suppliers]) => {
        this.templateDropdownItem = templates.data;
        this.supplierDropdownItem = suppliers.data;
        console.log(suppliers.data);
        console.log(templates.data);

        if (this.templateDropdownItem && this.templateDropdownItem.length > 0) {
          this.selectedTemplateID = this.templateDropdownItem[0].ObjectTypeTypeID;
        }

        if (this.supplierDropdownItem && this.supplierDropdownItem.length > 0) {
          this.selectedSupplierID = this.supplierDropdownItem[0].ObjectID;
        }
      })
    ).subscribe()
  }

  save(e: any) {
    if (this.equipmentForm.valid) {
      this.saveClicked = true;
      const equipment = this.getEquipmentData();
      this.subscriptions.add(this.formWizardService.addEquipment(equipment).subscribe((result) => {
        if (result.success) {
          this.toastService.show(EQUIPMENT_WIZARD_SAVE_SUCCESS, '', ToastState.SUCCESS, {
            position: 'bottom right',
            maxWidth: '375px'
          });
          this.dialogRef.close();
          this.saveClicked = false;

        } else {
          this.toastService.show(EQUIPMENT_WIZARD_SAVE_ERROR, '', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '375px'
          });
        }
      }));
    } else {
      this.toastService.show(VALIDATION_ERROR, '', ToastState.ERROR, {
        position: 'bottom right',
        maxWidth: '375px'

      });
    }
  }

  onBeginOrEndDateChange(e, setting) {
    if(!e.event) {
      return;
    }
  }

  saveAndNew(e: any) {
    if (this.equipmentForm.valid) {
      this.saveNewClicked = true;
      const equipment = this.getEquipmentData();
      this.subscriptions.add(this.formWizardService.addEquipment(equipment).subscribe((result) => {
        if (result.success) {
          this.toastService.show(EQUIPMENT_WIZARD_SAVE_SUCCESS, '', ToastState.SUCCESS, {
            position: 'bottom right',
            maxWidth: '375px'
          });
          this.saveNewClicked = false;
          this.resetPopupSelection();
        } else {
          this.toastService.show(EQUIPMENT_WIZARD_SAVE_ERROR, '', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '375px'
          });
        }
      }));
    } 
  }

  launchEquipmentLeaseRenderForm(e: any) {
    if (this.equipmentForm.valid) {
      this.saveLaunchClicked = true;
      const equipment = this.getEquipmentData();
      this.subscriptions.add(this.formWizardService.addEquipment(equipment).subscribe((result) => {
        if (result.success) {
          this.saveNewClicked = false;
          this.dialogRef.close();
          const currURL = this.getRedirectorURL(result.data, EQUIPMENT_OTID, 402);
          this.router.navigateByUrl(currURL);

        } else {
          this.toastService.show(EQUIPMENT_WIZARD_SAVE_ERROR, '', ToastState.ERROR, {
            position: 'bottom right',
            maxWidth: '375px'
          });
        }
      }));
    }
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

  getEquipmentData() {
    console.log("getEquipmentData");
    let equipment = {
      PremiseName: "",
      BuildingID: this.equipmentForm.get('supplierList').value[0],
      PremiseObjectTypeTypeID: 200,
      AccountingType: 'AP',
      BeginDate: this.formatDate(this.equipmentForm.get('beginDate').value),
      EndDate: this.formatDate(this.equipmentForm.get('endDate').value),
      ExchangeRateID: this.equipmentForm.get('currencyTypeList').value[0],
      LeaseTypeID: 3,
      MeasureUnitsID: 1,
      objectTypeTypeID: this.equipmentForm.get('templateList').value[0],
      ParentLeaseAbstractID: 0,
      TenantName: this.equipmentForm.get('legalEntityName').value
    };
    console.log(equipment);
    return equipment;
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    if(this.isUserDatesEU)
      return this.datePipe.transform([month, day, year].join('.'),'yyyy-MM-ddTHH:mm:ss.SSS', 'UTC');
    else
      return this.datePipe.transform([month, day, year].join('/'),'yyyy-MM-ddTHH:mm:ss.SSS', 'UTC');
  }

  public close() {
    this.dialogRef.close();
  }

  getId(componentName: string, uniqueName: string, elementType: string, componentType?: string) {
    return componentType ? `${componentName}-${componentType}-${uniqueName}-${elementType}` :  `${componentName}-${uniqueName}-${elementType}`;
  }

  resetPopupSelection() {
    this.portfolioDropdown.clearDropdown();
    this.templateDropdown.clearDropdown();
    this.supplierDropdown.clearDropdown();
    this.BeginDate = null;
    this.EndDate = null;
    this.equipmentForm.reset();
  }
}
