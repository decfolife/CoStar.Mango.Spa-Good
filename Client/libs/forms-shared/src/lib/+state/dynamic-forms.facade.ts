import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as dynamicFormsActions from './dynamic-forms.actions';
import * as fromDynamicForms from './dynamic-forms.selectors';
import {
  FormItemSourceColumnbySourceTable,
  IFields,
  ISection,
  SaveRenderFormCommand,
  Widget,
} from '@forms/model/dynamic-forms.interface';
import { Observable } from 'rxjs';
import { ApiResponse } from '@forms/model/api-response';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormsFacade {
  forms$ = this.store.select(fromDynamicForms.selectAllForms);
  loading$ = this.store.select(fromDynamicForms.selectLoading);
  error$ = this.store.select(fromDynamicForms.selectError);

  selectedDynamicForm$ = this.store.select(fromDynamicForms.selectDynamicForm);
  selectDynamicFormApiResponse$ = this.store.select(
    fromDynamicForms.selectDynamicFormApiResponse
  );

  selectedFormActions$ = this.store.select(fromDynamicForms.selectFormActions);
  selectAvailableFormSections$ = this.store.select(
    fromDynamicForms.selectAvailableFormSections
  );
  selectFormSections$ = this.store.select(fromDynamicForms.selectFormSections);
  selectAvailableFormFields$ = this.store.select(
    fromDynamicForms.selectAvailableFormFields
  );
  selectFormSectionsSorted$ = this.store.select(
    fromDynamicForms.selectFormSectionsSorted
  );
  selectControlTypes$ = this.store.select(fromDynamicForms.selectControlTypes);
  selectDataTypes$ = this.store.select(fromDynamicForms.selectDataTypes);
  selectFormItemDatabaseTables$ = this.store.select(
    fromDynamicForms.selectFormItemDatabaseTables
  );
  selectFormItemDropdowns$ = this.store.select(
    fromDynamicForms.selectFormItemDropdowns
  );
  selectRenderFormData$ = this.store.select(
    fromDynamicForms.selectRenderFormData
  );
  selectFormFields$ = this.store.select(fromDynamicForms.selectFormFields);
  selectObjectId$ = this.store.select(fromDynamicForms.selectObjectId);
  selectIsRenderForm$ = this.store.select(fromDynamicForms.selectIsRenderForm);
  selectFormName$ = this.store.select(fromDynamicForms.selectFormName);
  selectRenderFormDropdowns$ = this.store.select(
    fromDynamicForms.selectRenderFormDropdowns
  );
  selectRenderParentLink$ = this.store.select(
    fromDynamicForms.selectParentLink
  );
  selectRenderFormResponse$ = this.store.select(
    fromDynamicForms.selectRenderFormResponse
  );

  constructor(private store: Store) {}

  clearDynamicFormsState() {
    this.store.dispatch(dynamicFormsActions.clearDynamicFormsState());
  }

  loadformsList() {
    this.store.dispatch(dynamicFormsActions.initForms());
  }

  loadDynamicForm(formId: number, objectId: number): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoad({ formId, objectId })
    );
  }

  setObjectId(objectId: number): void {
    this.store.dispatch(dynamicFormsActions.setObjectId({ objectId }));
  }

  setisRenderForm(isRenderForm: boolean): void {
    this.store.dispatch(dynamicFormsActions.setisRenderForm({ isRenderForm }));
  }

  loadFormSections(formId: number): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoadSections({ formId })
    );
  }

  loadFields(formId: number, sectionId: number, objectTypeId: number): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoadFields({
        formId,
        sectionId,
        objectTypeId,
      })
    );
  }

  loadFormActions(
    formId: number,
    objectId: number,
    objectTypeId: number,
    objectTypeTypeId: number,
    isEditMode: boolean
  ): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoadActions({
        formId,
        objectId,
        objectTypeId,
        objectTypeTypeId,
        isEditMode,
      })
    );
  }

  loadAvailableSections(formId: number, objectTypeId: number): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoadAvailableSections({
        formId,
        objectTypeId,
      })
    );
  }

  loadAvailableFields(formId: number, objectTypeId: number): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoadAvailableFields({
        formId,
        objectTypeId,
      })
    );
  }

  loadAvailableFieldsToSection(sectionId: number): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoadAvailableFieldsToSection({ sectionId })
    );
  }

  loadFormItemControlTypes(): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoadFormItemControlTypes()
    );
  }

  loadFormItemDataTypes(): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadFormItemDataTypes());
  }

  loadFormItemDatabaseTables(): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadDatabaseTables());
  }

  loadWidgetByWidgetId(widgetId: number): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoadWidgetByWidgetId({ widgetId })
    );
  }

  loadFormItemDatabaseColumnsByTableName(tableName: string): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoadDatabaseColumnsByTableName({
        tableName,
      })
    );
  }

  loadFormItemDropdowns(): void {
    this.store.dispatch(dynamicFormsActions.dynamicFormLoadFormItemDropdowns());
  }

  loadRenderForm(formId: number, objectId: number, objectTypeId: number): void {
    this.store.dispatch(
      dynamicFormsActions.dynamicFormLoadRenderForm({
        formId,
        objectId,
        objectTypeId,
      })
    );
  }

  loadRenderFormFormItemDropdowns(
    formId: number,
    objectId: number,
    objectTypeId: number
  ): void {
    this.store.dispatch(
      dynamicFormsActions.renderFormLoadFormItemDropdowns({
        formId,
        objectId,
        objectTypeId,
      })
    );
  }

  loadParentLink(objectId: number, objectTypeId: number): void {
    this.store.dispatch(
      dynamicFormsActions.renderFormLoadLoadParentLink({
        objectId,
        objectTypeId,
      })
    );
  }

  selectAvailableFieldsBySectionId(sectionId: number): any {
    return this.store.select(
      fromDynamicForms.selectAvailableFormFieldsBySectionId(sectionId)
    );
  }

  selectFormFieldsBySectionId(sectionId: number): Observable<IFields[]> {
    return this.store.select(
      fromDynamicForms.selectFormFieldsBySectionId(sectionId)
    );
  }

  addAvailableSectionToForm(sectionId: number, section: ISection): void {
    this.store.dispatch(
      dynamicFormsActions.addAvailableSectionToForm({ section })
    );
    this.store.dispatch(
      dynamicFormsActions.removeSectionFromAvailableSections({
        sectionId,
        section,
      })
    );
  }

  addAvailableFieldToSection(sectionId: number, field: IFields): void {
    this.store.dispatch(
      dynamicFormsActions.addAvailableFieldToSection({ sectionId, field })
    );
    this.store.dispatch(
      dynamicFormsActions.removeAvailableFieldFromSection({ sectionId, field })
    );
  }

  selectFormItemWidgetsApiResponseByWidgetId(
    widgetId: number
  ): Observable<ApiResponse> {
    return this.store.select(
      fromDynamicForms.selectFormItemWidgetsApiResponseByWidgetId(widgetId)
    );
  }
  // selectWidgetByWidgetId(widgetId: number): Observable<Widget> {
  //   return this.store.select(fromDynamicForms.selectWidgetByWidgetId(widgetId));
  // }

  selectDatabaseColumnsByTableName(
    tableName: string
  ): Observable<FormItemSourceColumnbySourceTable[]> {
    return this.store.select(
      fromDynamicForms.selectDatabaseColumnsByTableName(tableName)
    );
  }

  selectRenderFormDropdownValuesByFormItemId(formItemId: number): any {
    return this.store.select(
      fromDynamicForms.selectRenderFormDropdownValuesByFormItemId(formItemId)
    );
  }

  saveRenderForm(saveRenderFormCommand: SaveRenderFormCommand) {
    this.store.dispatch(
      dynamicFormsActions.saveRenderForm({ saveRenderFormCommand })
    );
  }
}
