import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';
import {
  DropdownValue,
  FormItemTypes,
  IFields,
} from '@forms/model/dynamic-forms.interface';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
import { ButtonModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { Observable, Subscription, of } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { LibUiSharedModule } from '@mango/ui-shared/lib-ui-shared';
import { MatCardModule } from '@angular/material/card';
import { filter } from 'rxjs/operators';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'mango-dynamic-form-edit-field-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    DevExpressModule,
    ButtonModule,
    ModalModule,
    MatSlideToggleModule,
    MatCardModule,
    LibUiSharedModule,
  ],
  templateUrl: './dynamic-form-edit-field-dialog.component.html',
  styleUrls: ['./dynamic-form-edit-field-dialog.component.scss'],
})
export class DynamicFormEditFieldDialogComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  field: IFields;
  dynamicForm: any;
  prefix = 'dynamic-form-edit-field-';
  creatingDropdown = false;
  dropdownValues: DropdownValue[];
  sortOrders: string[];

  selectControlTypes$ = this.dynamicFormsFacade.selectControlTypes$;
  selectDataTypes$ = this.dynamicFormsFacade.selectDataTypes$;
  selectFormItemDatabaseTables$ =
    this.dynamicFormsFacade.selectFormItemDatabaseTables$;
  selectFormItemDatabaseColumns$: Observable<any>;
  selectFormItemDropdowns$ = this.dynamicFormsFacade.selectFormItemDropdowns$;

  constructor(
    public dialogRef: MatDialogRef<DynamicFormEditFieldDialogComponent>,
    private dynamicFormsFacade: DynamicFormsFacade,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.field = this.data.field;

    this.load();
  }

  private load(): void {
    this.loadFormItemDatabaseColumnsByTableName();

    if (this.field.formItemType.formItemType == 'List Box') {
      this.dynamicFormsFacade.loadFormItemDropdowns();
    }

    this.subs.add(
      this.dynamicFormsFacade.selectedDynamicForm$
        .pipe(filter((formData) => formData !== null))
        .subscribe((dynamicForm) => {
          this.dynamicForm = dynamicForm;
        })
    );
  }

  public save(e) {
    console.log('save clicked ' + e);
    this.closeDialog();
  }

  controlTypeChanged(e) {
    this.subs.add(
      this.selectControlTypes$
        .pipe(filter((items) => items !== null && items !== undefined))
        .subscribe((controlType) => {
          const selectedFormItemType: FormItemTypes = controlType.find(
            (item) => item.formItemTypeID === e.value
          );
          this.field.formItemType.formItemTypeID =
            selectedFormItemType.formItemTypeID;
          this.field.formItemType.formItemType =
            selectedFormItemType.formItemType;
        })
    );
  }

  databaseTableDropdownChanged(e) {
    this.loadFormItemDatabaseColumnsByTableName();
  }

  loadFormItemDatabaseColumnsByTableName(): void {
    this.dynamicFormsFacade.loadFormItemDatabaseColumnsByTableName(
      this.field.sourcetable
    );

    this.subs.add(
      this.dynamicFormsFacade
        .selectDatabaseColumnsByTableName(this.field.sourcetable)
        .pipe(filter((formData) => formData !== null && formData !== undefined))
        .subscribe((data) => {
          this.selectFormItemDatabaseColumns$ = of(data);
        })
    );
  }

  controlTypeDataTypeConfigurationDropdownChanged(e) {
    this.subs.add(
      this.selectFormItemDropdowns$
        .pipe(filter((items) => items !== null && items !== undefined))
        .subscribe((dropdownItems) => {
          const selectedItem = dropdownItems.find(
            (item) => item.dropdownID === e.value
          );
          this.dropdownValues = selectedItem.dropdownValues;
        })
    );
  }

  createNewDropdown() {
    this.creatingDropdown = true;
  }

  convertToBooleanFromYesNo(value: string): boolean {
    return value.toLowerCase() === 'yes';
  }
  convertToBooleanFromNumber(value: number): boolean {
    return value === 1;
  }

  onReorder(e) {}

  addDropdownValue() {}

  public closeDialog() {
    this.dialogRef.close('');
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
