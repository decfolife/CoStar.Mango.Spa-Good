import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormGroup, FormGroupDirective, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';
import { filter, take} from 'rxjs/operators';
import { Observable, Subscription, of } from 'rxjs';
import { IFieldDetails, IFields, ISection} from '@forms/model/dynamic-forms.interface';
import { ButtonModule, DropdownModule, LibUiElementsModule, LoaderModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
import { DxDataGridComponent } from 'devextreme-angular';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { DynamicFormWidgetsComponent } from '../dynamic-form-widgets/dynamic-form-widgets.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { DynamicFormFieldDocSecPageComponent } from '../dynamic-form-fields/dynamic-form-field-doc-sec-page/dynamic-form-field-doc-sec-page.component';
import { DynamicFormEditFieldDialogComponent } from '@forms/admin-render-forms/dynamic-form-edits/dynamic-form-edit-field-dialog/dynamic-form-edit-field-dialog.component';
import { FieldsControlService } from './fields-control.service';

@Component({
  selector: 'mango-dynamic-form-section',
  standalone: true,
  templateUrl: './dynamic-form-section.component.html',
  styleUrls: ['./dynamic-form-section.component.scss'],
  providers: [FieldsControlService],
  imports: [ CommonModule,
    DynamicFormWidgetsComponent,
    DynamicFormFieldDocSecPageComponent,
    ReactiveFormsModule,
    LibUiElementsModule,
    SearchModule,
    ButtonModule,
    MatIconModule,
    ModalModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
    LoaderModule, 
    MatDialogModule,
    MatCardModule,
    DropdownModule,
    DevExpressModule,
    DynamicFormEditFieldDialogComponent],
})
export class DynamicFormSectionComponent implements OnInit, OnDestroy, OnChanges  {
	@ViewChild('availableFieldsGrid') availableFieldsGrid : DxDataGridComponent;
  private subs: Subscription = new Subscription();
  @Input() section!: ISection;
  @Input() form!: FormGroup;
  childForm: FormGroup = new FormGroup({});
  @Input() editMode: boolean;
  faCog = faCog
	sampleRadioItems : string[] = ['Option A', 'Option B', 'Option C'];

  isLoading: boolean;
  isRenderForm: boolean;
  
	selectedFormItem : IFields;
	formItemPopupTitle : string;
	formSectionPopupVisible : boolean;
  isDropdownValuesLoading = false;

  sectionFields$: Observable<IFields[]>;
  selectAvailableFormFieldsBySectionId$: Observable<IFields[]>;
  dropdownValues$: Observable<any[]>; // Observable to hold dropdown values

  selectRenderFormData: any; 
  validationErrors: any;

  constructor(
    private dynamicFormsFacade: DynamicFormsFacade,
    public dialog: MatDialog,
    private rootFormGroup: FormGroupDirective,
    private fcs: FieldsControlService
  ) {}

  
  ngOnInit(): void {
    this.isLoading = true;
    this.form.setControl('childForm', this.childForm);

    this.subs.add(
      this.dynamicFormsFacade.selectIsRenderForm$
      .pipe(filter(isRenderForm => isRenderForm !== null))
      .subscribe((isRenderForm) => {
        this.isRenderForm = isRenderForm;
        if (this.isRenderForm) {
          this.form = this.rootFormGroup.control;
          this.setupRenderFormDataSubscription();
          this.setupRenderFormDropdownsSubscription();
        }
      }));

    this.loadSectionFormFields();
    this.loadAvailableSectionFields();
  }

  private setupRenderFormDataSubscription(): void {
    this.subs.add(
      this.dynamicFormsFacade.selectRenderFormData$
        .pipe(filter(formData => formData !== null))
      .subscribe((formData) => {
        this.selectRenderFormData = formData;
        this.updateChildFormAddRenderFormData();
      }));
  }

  private setupRenderFormDropdownsSubscription(): void {
    this.subs.add(
      this.dynamicFormsFacade.selectRenderFormDropdowns$
        .pipe(filter(formData => formData !== null))
        .subscribe((data) => {
          this.dropdownValues$ = of(data);
          this.isDropdownValuesLoading = false;
      }));
  }

  updateChildFormAddRenderFormData(): void {
    this.childForm = this.fcs.toFormGroup(this.selectRenderFormData);
    this.form.setControl('childForm', this.childForm);
  }

  /**
   * Calls the service to bring back the available fields in the section (add fields button)
   */
  loadAvailableSectionFields() {
    this.subs.add(
      this.dynamicFormsFacade.selectAvailableFormFields$.pipe(
      filter(formData => formData !== null),
    ).subscribe(
      () => {
        this.dynamicFormsFacade.loadAvailableFieldsToSection(this.section.formSectionID);
      }
    ));

    this.selectAvailableFormFieldsBySectionId$ = this.dynamicFormsFacade.selectAvailableFieldsBySectionId(this.section.formSectionID);
  }

   /**
   * Calls the service to bring back the actual fields in the section
   */
  loadSectionFormFields() {
    this.subs.add(
      this.dynamicFormsFacade.selectedDynamicForm$.pipe(
      filter(formData => formData !== null),
    ).subscribe(
      (dynamicForm) => {
        this.dynamicFormsFacade.loadFields(dynamicForm.formId, this.section.formSectionID, dynamicForm.objectTypeID);
      }
    ));

    this.subs.add(
      this.dynamicFormsFacade
        .selectFormFieldsBySectionId(this.section.formSectionID)
        .pipe(
          filter(formData => formData !== null && formData !== undefined)
        )
        .subscribe((data) => {
          if (data && data.length > 0) {
            this.sectionFields$ = of(data);
          }
          this.isLoading = false;
        })
    );
  }

  /**
   * Adds the available field(s) selected to the section
   */
  addFields() {
		const newFields = this.availableFieldsGrid.instance.getSelectedRowsData();
		newFields.forEach((field: IFields) => {
      /**
        * Shallow copy the field state object - as it's immutable
      */
      const tempField = {...field};
      tempField.formItemSectionDetail =this.createDefaultFieldDetails();
      tempField.formItemType = field.formItemType;
      tempField.formItemSectionDetail.formItemLabel = field.formItemLabel;
      this.dynamicFormsFacade.addAvailableFieldToSection(this.section.formSectionID, tempField);
    });

		this.availableFieldsGrid.instance.clearSelection();
	}

  searchAvailableFieldsDataGrid(data) {		
		this.availableFieldsGrid.instance.searchByText(data);
	}

   // Handle form data changes
   onFormDataChange(formData: any) {
    // Dispatch an action to update the form data in the store
    //this.store.dispatch(DynamicFormsActions.dynamicFormUpdateRenderForm({ formData }));
  }

  createNewField() {
		// let newField = new FormField(0, "My New Field", '', 'input', 'Building', null, null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null);
		// this.currentFormItem = newField;
		// this.sectionFields.push(this.currentFormItem);
		// this.launchFormItemPopup({ name : 0 });		
	}

  launchFormItemPopup(data) {
    this.subs.add(
      this.sectionFields$
        .pipe(take(1))
        .subscribe(items => {
          /**
          * Shallow copy the field state object - as it's immutable
          */
          this.selectedFormItem = { ...items.find(item => item.formItemID === data.name.formItemID) };
          this.selectedFormItem.formItemSectionDetail = {...this.selectedFormItem.formItemSectionDetail};
          this.selectedFormItem.formItemType = {...this.selectedFormItem.formItemType};
        })
    );

    this.dialog.open(DynamicFormEditFieldDialogComponent, {
      disableClose: false,
      height: '90%',
      width: '95%',
      data: {
        form: this.form,
        section: this.section,
        field: this.selectedFormItem
      }
    });
  }
  
	launchFormSectionPopup() {
		this.formSectionPopupVisible = true;
	}

  
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.editMode && this.form) {
      this.toggleFormControls();
    }
  }



  toggleFormControls() {
    if (this.editMode) {
      this.isDropdownValuesLoading = true;
      this.enableDisableFormControls(this.form, true);
    } else {
      this.enableDisableFormControls(this.form, false);
    }
  }

  // Recursively enable/disable form controls
  private enableDisableFormControls(control: AbstractControl, enable: boolean) {
    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach(childControl => {
        this.enableDisableFormControls(childControl, enable);
      });
    } else {
      if (enable) {
        control.enable();
      } else {
        control.disable();
      }
    }
  }


  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  
private createDefaultFieldDetails(): IFieldDetails {
  return {
    formID: 0,
    objectTypeID: 0,
    formSectionID: 0,
    formItemDefaultLabel: '',
    formItemID: 0,
    formItemLocalLabel: '',
    formItemLabel: '',
    formItemSectionID: 0,
    columnNum: 0,
    formItemSortOrder: 0,
    formItemMandatory: '',
    formItemMandatoryStep: 0,
    formItemViewOnly: '',
    formItemTabIndex: 0,
    formItemTop: 0,
    formItemLeft: 0,
    formItemLabelPlacement: '',
    formItemLabelWidth: 0,
    formItemLabelColor: '',
    formItemLabelWeight: '',
    formItemLabelAlign: '',
    formItemLabelPrefix: '',
    formItemLabelSuffix: '',
    formItemDisplayLabel: '',
    formItemFieldWidth: 0,
    formItemFieldColor: '',
    formItemFieldWeight: '',
    formItemFieldAlign: '',
    formItemFieldHeight: 0,
    formItemFieldSpan: 0,
    formItemFieldSpanCSS: '',
    formItemTotalWidth: 0,
    formItemTotalHeight: 0,
    formItemViewPrefix: '',
    formItemViewSuffix: '',
    formItemEditPrefix: '',
    formItemEditSuffix: '',
    containerCSS: '',
    dataTypeLabel: '',
    isParent: false,
    isChild: false,
    triggerWorkflowChange: '',
    formItemDictionaryText: '',
    formItemJavaScript: '',
    parentID: 0,
    isAuditable: false,
    vpDictionaryFormItemDesc: '',
  };
}
  // get isValid() {
  //   return this.form.controls[this.question.key].valid;
  // }
}
