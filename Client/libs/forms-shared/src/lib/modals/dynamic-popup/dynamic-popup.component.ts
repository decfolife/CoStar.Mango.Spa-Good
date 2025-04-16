import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  Inject,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SaveRenderFormCommand } from '@forms/model/dynamic-forms.interface';
import { DynamicFormsService } from '@forms/services/dynamic-forms.service';
import {
  ToastState,
  VALIDATION_ERROR,
} from '@mango/data-models/lib-data-models';
import {
  ButtonModule,
  CremToastService,
  DatePickerModule,
  DropdownModule,
  InputComponent,
  LoaderModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';

const RENDER_LOOKUP_SQL = 998;
const FORM_ITEM_TEXT_FIELD = 2;
const FORM_ITEM_LIST_BOX = 1;

@Component({
  selector: 'mango-dynamic-popup',
  templateUrl: './dynamic-popup.component.html',
  styleUrls: ['./dynamic-popup.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    LoaderModule,
    DropdownModule,
    ModalModule,
    InputComponent,
    DatePickerModule,
  ],
})
export class DynamicPopupComponent implements OnInit, OnChanges, OnDestroy {
  footerButtonDisabled: boolean = false;
  dynamicForm: FormGroup;
  popupData: any;
  sectionName: any;
  dropdownValues$: Observable<any[]>;
  isDropdownValuesLoading: boolean = true;
  dropdownData: any;
  widgetDetails: any;
  selectedItem: string = '';
  renderSelectConst: any;
  controlValue: any = '';
  controlName: any = '';
  changedFormItemKeys: any[] = [];
  controlDtlList: any[] = [];
  textInputList: any[] = [];
  defaultDropDownIndex: number = -1;
  private subs: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<DynamicPopupComponent>,
    private dynamicFormsService: DynamicFormsService,
    private formWizardService: FormWizardService,
    private toastService: CremToastService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  async loadWidgetData() {
    this.widgetDetails = await this.dynamicFormsService
      .getFormSections(this.data.formId, 0)
      .pipe(
        filter((section) => section !== null),
        take(1),
        switchMap((section) => {
          this.sectionName = section.data[0].formSectionName;
          return combineLatest([
            this.dynamicFormsService
              .getFormFields(
                this.data.formId,
                section.data[0].formSectionID,
                this.data.objectTypeId
              )
              .pipe(
                filter((fields) => !!fields),
                take(1)
              ),
            this.dynamicFormsService
              .getRenderFormFormItemDropdowns(
                this.data.formId,
                0,
                this.data.objectTypeId,
                0,
                0
              )
              .pipe(
                filter((renderFormData) => !!renderFormData),
                take(1)
              ),
          ]);
        })
      )
      .toPromise();
    if (this.widgetDetails[0].success) {
      this.popupData = this.widgetDetails[0].data;
      if (this.widgetDetails[1].success) {
        this.dropdownData = this.widgetDetails[1].data;
        this.dropdownValues$ = of(this.widgetDetails[1].data);
        this.isDropdownValuesLoading = false;
      }
    }
    return this.widgetDetails;
  }

  async ngOnInit(): Promise<void> {
    await this.loadWidgetData();
    this.dynamicForm = new FormGroup({});
    for (let index = 0; index < this.popupData.length; index++) {
      const { isRequired } = await this.isMandatoryField(index);
      if (isRequired)
        this.dynamicForm.addControl(
          this.popupData[index].formItemFriendlyName,
          new FormControl('', [Validators.required])
        );
      else
        this.dynamicForm.addControl(
          this.popupData[index].formItemFriendlyName,
          new FormControl('')
        );
    }
    this.dynamicForm.valueChanges.subscribe((changes) => {});
  }

  private async isMandatoryField(index: any) {
    return {
      isRequired:
        this.popupData[
          index
        ].formItemSectionDetail.formItemMandatory.toLowerCase() == 'yes',
    };
  }
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onDropdownValueChanged(e: any, formItemJavaScript: any, formItem: any) {
    if (e[0].value !== -1) {
      this.dynamicForm
        .get(formItem.formItemFriendlyName)
        .setValue(e[0].display);
      this.updateFormItem(formItem, e[0].value.toString());
      if (formItemJavaScript != null && formItemJavaScript.length > 0) {
        this.getChildDropDownDetails(formItemJavaScript, e);
      }
    }
  }

  //Populate the child dropdown data based on formItemJavaScript from parent dropdown list
  async getChildDropDownDetails(formItemJavaScript: string, e: any) {
    let initialArr = formItemJavaScript.split('DisplayNewItems(');
    for (let index = 1; index < initialArr.length; index++) {
      let lookupId = e[0].value.toString();
      this.selectedItem = '';
      let firstItem = initialArr[index].replace(/&#39;/g, '');
      let splitJsArray = firstItem.split(',');
      let formItemId = splitJsArray[0];
      let formItem = this.widgetDetails[0].data.find((item) =>
        formItemId.indexOf(item.formItemID) > -1 ? item : ''
      );
      this.renderSelectConst = splitJsArray[2];
      if (splitJsArray.length > 8) {
        //LookUpID is based on multiple values
        if (splitJsArray[2].indexOf('+') > -1 && splitJsArray.length > 9) {
          this.renderSelectConst = splitJsArray[3];
          let lookUpParentId = splitJsArray[2];
          let lookUpParent = this.widgetDetails[0].data.find((item) =>
            lookUpParentId.indexOf(item.formItemID) > -1 ? item : ''
          );
          lookupId =
            lookupId +
            ',' +
            this.controlDtlList.find(
              (ctrl) => ctrl.controlName == lookUpParent.formItemID
            ).controlValue;
          this.selectedItem = splitJsArray[9].replace(');', '');
        } else {
          this.selectedItem = splitJsArray[8].replace(');', '');
        }
      }
      await this.buildChildDropDown(
        lookupId,
        this.renderSelectConst,
        formItem,
        this.selectedItem
      );
      if (firstItem.toLowerCase().indexOf('toogletextvalue') > -1) {
        await this.getvalueByLookupSQL(firstItem, lookupId);
      }
    }
  }

  //fetch data based on LookUpSQL
  async getvalueByLookupSQL(sqlText: string, lookUpId: string) {
    let lookupSQLArr = sqlText.toLowerCase().split('toogletextvalue')[1];
    let lookupParentCtrl = this.widgetDetails[0].data.find((item) =>
      lookupSQLArr.split(',')[1].indexOf(item.formItemID) > -1 ? item : ''
    );
    await this.buildChildDropDown(
      '',
      RENDER_LOOKUP_SQL,
      lookupParentCtrl,
      this.selectedItem,
      lookupSQLArr
        .split(',')[0]
        .replace(/[()]/g, '')
        .replace('+ this.value', lookUpId)
    );
  }

  //Fetch dropdown data using renderSelectAPI Call
  async buildChildDropDown(
    lookupId: any,
    requestTypeId: any,
    formControl: any,
    selectedValue: string = '',
    lookupSQL: string = ''
  ) {
    var renderSelectResult = this.formWizardService
      .getRenderSelect(
        lookupId,
        requestTypeId,
        lookupSQL,
        '',
        '',
        '',
        1,
        25,
        true
      )
      .pipe(
        filter((data) => data != null),
        take(1)
      )
      .toPromise();
    if ((await renderSelectResult).success) {
      let dropdownDataList = [];
      let itmArray =
        (await renderSelectResult).data?.items?.length > 0
          ? (await renderSelectResult).data.items
          : (await renderSelectResult).data;
      if (itmArray.length > 0) {
        this.controlName = formControl.formItemID;
        this.controlValue = Object.values(itmArray[0])[0].toString();
        //store dropdown details(selected values)
        this.controlDtlList.push({
          controlName: formControl.formItemID,
          controlValue: Object.values(itmArray[0])[0].toString(),
        });
        //setup default dropdownindex  for dropdown list to set it as initial selected value
        let value = this.defaultDropDownIndex;
        let display = selectedValue;
        if (formControl.formItemTypeID === FORM_ITEM_LIST_BOX) {
          if (selectedValue === '' && itmArray.length == 1) {
            selectedValue = Object.values(itmArray[0])[1].toString();
          } else {
            dropdownDataList.push({ value, display });
          }
          for (let index = 0; index < itmArray.length; index++) {
            let value = Object.values(itmArray[index])[0];
            let display = Object.values(itmArray[index])[1];
            //update the datasource for dropdown list
            dropdownDataList.push({ value, display });
          }
          this.widgetDetails[1].data[formControl.formItemID] = dropdownDataList;
        } else {
          this.textInputList.push(formControl.formItemID);
          this.textInputList[formControl.formItemID] = Object.values(
            itmArray[0]
          )[0].toString();
          this.dynamicForm
            .get(formControl.formItemFriendlyName)
            .setValue(Object.values(itmArray[0])[0]);
          this.updateFormItem(
            formControl,
            Object.values(itmArray[0])[0].toString()
          );
        }
      }
    }
  }

  onNewInput(e: any, formItem: any) {
    this.dynamicForm.get(formItem.formItemFriendlyName).setValue(e);
    this.updateFormItem(formItem, e);
  }

  save(e: any) {
    if (this.dynamicForm.valid) {
    } else {
      this.toastService.show(VALIDATION_ERROR, '', ToastState.ERROR, {
        position: 'bottom right',
        maxWidth: '350px',
      });
    }
    let saveFormData: SaveRenderFormCommand = {
      isNew: true,
      formId: this.data.formId,
      objectId: 0,
      objectTypeId: this.data.objectTypeId,
      objectTypeTypeId: this.data.objectTypeTypeId,
      relatedObjectId: this.data.relatedObjectId,
      relatedObjectTypeId: this.data.relatedObjectTypeId,
      relationshipDefinitionId: this.data.relatedDefinitionId,
      formItems: [],
    };
    saveFormData.formItems = this.changedFormItemKeys;
    this.dynamicFormsService
      .saveRenderForm(saveFormData)
      .subscribe((saveResponse) => {
        if (saveResponse.success) this.closeModal();
      });
  }

  updateFormItem(formItem: any, value: string) {
    let changedItem = {
      formItemId: formItem.formItemID,
      formItemTypeId: formItem.formItemTypeID,
      oldValue: '',
      newValue: value,
      type: formItem.formItemConstant.includes('Dynamic')
        ? 'Dynamic'
        : formItem.formItemConstant.includes('Existing')
        ? 'Existing'
        : formItem.formItemConstant.includes('Clause')
        ? 'Clause'
        : 'Dynamic',
    };
    if (
      this.changedFormItemKeys.findIndex(
        (s) => s.formItemId === changedItem.formItemId
      ) > -1
    ) {
      this.changedFormItemKeys.splice(
        this.changedFormItemKeys.findIndex(
          (s) => s.formItemId === changedItem.formItemId
        ),
        1
      );
    }
    this.changedFormItemKeys.push(changedItem);
  }

  closeModal() {
    this.dialogRef.close();
  }
}
