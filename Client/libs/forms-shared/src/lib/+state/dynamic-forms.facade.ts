import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as dynamicFormsActions from './dynamic-forms.actions';
import * as fromDynamicForms from './dynamic-forms.selectors';
import { FormItemSourceColumnbySourceTable, FormItemsDropdownValuesDto, IFields, Widget } from '@forms/model/dynamic-forms.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormsFacade {
  forms$ = this.store.select(fromDynamicForms.selectAllForms);
  loading$ = this.store.select(fromDynamicForms.selectLoading);
  error$ = this.store.select(fromDynamicForms.selectError);
  
  selectedDynamicForm$ = this.store.select(fromDynamicForms.selectDynamicForm);
  selectedFormActions$ = this.store.select(fromDynamicForms.selectFormActions);
  selectAvailableFormSections$ = this.store.select(fromDynamicForms.selectAvailableFormSections);
  selectFormSections$ = this.store.select(fromDynamicForms.selectFormSections);
  selectAvailableFormFields$ = this.store.select(fromDynamicForms.selectAvailableFormFields);
  selectFormSectionsSorted$ = this.store.select(fromDynamicForms.selectFormSectionsSorted);
  selectControlTypes$ = this.store.select(fromDynamicForms.selectControlTypes);
  selectDataTypes$ = this.store.select(fromDynamicForms.selectDataTypes);
  selectFormItemDatabaseTables$ = this.store.select(fromDynamicForms.selectFormItemDatabaseTables);
  selectFormItemDropdowns$ = this.store.select(fromDynamicForms.selectFormItemDropdowns);
  selectRenderFormData$ = this.store.select(fromDynamicForms.selectRenderFormData);
  selectFormFields$ = this.store.select(fromDynamicForms.selectFormFields);
  selectObjectId$ = this.store.select(fromDynamicForms.selectObjectId);
  selectIsRenderForm$ = this.store.select(fromDynamicForms.selectIsRenderForm);
  selectFormName$ = this.store.select(fromDynamicForms.selectFormName);
  selectRenderFormDropdowns$ = this.store.select(fromDynamicForms.selectRenderFormDropdowns);

  constructor(private store: Store) {}

  clearDynamicFormsState() {
    this.store.dispatch(dynamicFormsActions.clearDynamicFormsState());
  }

  loadformsList() {
    this.store.dispatch(dynamicFormsActions.initForms());
  }
  
  loadDynamicForm(formId: number): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoad({ formId }));
  }

  setObjectId(objectId: number): void {
    this.store.dispatch(dynamicFormsActions.setObjectId({objectId}));
  }

  setisRenderForm(isRenderForm: boolean): void {
    this.store.dispatch(dynamicFormsActions.setisRenderForm({isRenderForm}));
  }

  loadFields(formId: number, sectionId: number, objectTypeId: number): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadFields({formId, sectionId, objectTypeId}));
  }

  loadAvailableFields(formId: number,  objectTypeId: number): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadAvailableFields({formId,  objectTypeId}));
  }

  loadAvailableFieldsToSection(sectionId: number): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadAvailableFieldsToSection({sectionId}));
  }

  loadFormItemControlTypes(): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadFormItemControlTypes());
  }

  loadFormItemDataTypes(): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadFormItemDataTypes());
  }

  loadFormItemDatabaseTables(): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadDatabaseTables());
  }

  loadWidgetByWidgetId(widgetId: number): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadWidgetByWidgetId({widgetId}));
  }

  loadFormItemDatabaseColumnsByTableName(tableName: string): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadDatabaseColumnsByTableName({tableName}));
  }

  loadFormItemDropdowns(): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadFormItemDropdowns());
  }

  loadRenderForm(formId: number, objectId: number, objectTypeId: number): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadRenderForm({formId, objectId, objectTypeId}));
  }

  loadRenderFormFormItemDropdowns(data: FormItemsDropdownValuesDto[]): void {
    this.store.dispatch(dynamicFormsActions.renderFormLoadFormItemDropdowns({data}));
  }

  




  selectAvailableFieldsBySectionId(sectionId: number): any {
    return this.store.select(fromDynamicForms.selectAvailableFormFieldsBySectionId(sectionId));
  }

  selectFormFieldsBySectionId(sectionId: number): Observable<IFields[]> {
    return this.store.select(fromDynamicForms.selectFormFieldsBySectionId(sectionId));
  }

  addSectionToForm(sectionId: number, section: any): void {
    this.store.dispatch(dynamicFormsActions.addSectionToForm({ section}));
    this.store.dispatch(dynamicFormsActions.removeSectionFromAvailableSections({ sectionId, section }));
  }

  addAvailableFieldToSection(sectionId: number, field: IFields): void {
    this.store.dispatch(dynamicFormsActions.addAvailableFieldToSection({ sectionId, field }));
    this.store.dispatch(dynamicFormsActions.removeAvailableFieldFromSection({ sectionId, field }));
  }

  selectWidgetByWidgetId(widgetId: number): Observable<Widget> {
    return this.store.select(fromDynamicForms.selectWidgetByWidgetId(widgetId));
  }

  selectDatabaseColumnsByTableName(tableName: string): Observable<FormItemSourceColumnbySourceTable[]> {
    return this.store.select(fromDynamicForms.selectDatabaseColumnsByTableName(tableName));
  }

  selectRenderFormDropdownValuesByFormItemId(formItemId: number): any {
    return this.store.select(fromDynamicForms.selectRenderFormDropdownValuesByFormItemId(formItemId));
  }


 }
