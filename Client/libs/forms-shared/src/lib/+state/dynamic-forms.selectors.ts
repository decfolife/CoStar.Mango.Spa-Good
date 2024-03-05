import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  APP_FEATURE_KEY,
  DynamicFormsState,
  dynamicFormsAdapter,
} from './dynamic-forms.reducer';


export const selectDynamicFormsState = createFeatureSelector<DynamicFormsState>(APP_FEATURE_KEY);

const { selectAll } = dynamicFormsAdapter.getSelectors();

export const selectAllForms = createSelector(
  selectDynamicFormsState,
  (state: DynamicFormsState) => selectAll(state)
);
export const selectLoading = createSelector(
  selectDynamicFormsState,
  (state) => state.isLoading
);
export const selectError = createSelector(
  selectDynamicFormsState,
  (state) => state.error
);
export const selectDynamicForm = createSelector(
  selectDynamicFormsState,
  (state) => state.dynamicForm
);
export const selectFormActions = createSelector(
  selectDynamicFormsState,
  (state) => state.formActions
);
export const selectAvailableFormSections = createSelector(
  selectDynamicFormsState,
  (state) => state.formAvailableSections
);
export const selectFormSections = createSelector(
  selectDynamicFormsState,
  (state) => state.formSections
);
export const selectAvailableFormFields = createSelector(
  selectDynamicFormsState,
  (state) => state.formAvailableFields
);
export const selectAvailableFieldsInSection = createSelector(
  selectDynamicFormsState,
  (state) => state.formAvailableFieldsInSection
);
export const selectFormFields = createSelector(
  selectDynamicFormsState,
  (state) => state.formFields
);
export const selectWidgets = createSelector(
  selectDynamicFormsState,
  (state) => state.formItemWidgets
);
export const selectControlTypes = createSelector(
  selectDynamicFormsState,
  (state) => state.formItemControlTypes
);
export const selectDataTypes = createSelector(
  selectDynamicFormsState,
  (state) => state.formItemDataTypes
);
export const selectFormItemDatabaseTables = createSelector(
  selectDynamicFormsState,
  (state) => state.formItemDatabaseTables
);
export const selectFormItemDatabaseColumns = createSelector(
  selectDynamicFormsState,
  (state) => state.formItemDatabaseColumns
);
export const selectFormItemDropdowns = createSelector(
  selectDynamicFormsState,
  (state) => state.formItemDropdowns
);
export const selectRenderFormData = createSelector(
  selectDynamicFormsState,
  (state) => state.renderFormData
);
export const selectObjectId = createSelector(
  selectDynamicFormsState,
  (state) => state.objectID
);
export const selectIsRenderForm = createSelector(
  selectDynamicFormsState,
  (state) => state.isRenderForm
);
export const selectFormName = createSelector(
  selectDynamicFormsState,
  (state) => state.formName
);
export const selectRenderFormDropdowns = createSelector(
  selectDynamicFormsState,
  (state) => state.renderFormDropdowns
);



 /**
  * Custom Selectors
*/
export const selectFormSectionsSorted = createSelector(
  selectFormSections,
  (formSections) => {
    if (formSections) {
      const sortedSections = [...formSections].sort((a, b) => a.formSectionSortOrder - b.formSectionSortOrder);
      return sortedSections;
    } else {
      return [];
    }
  }
);
export const selectAvailableFormFieldsBySectionId = (sectionId: number) => createSelector(
  selectAvailableFieldsInSection, (formAvailableFieldsInSection) => (formAvailableFieldsInSection && formAvailableFieldsInSection[sectionId]) || []);

export const selectFormFieldsBySectionId = (sectionId: number) => createSelector(
  selectFormFields,
  (formFields) => (formFields !== undefined && formFields !== null ? formFields[sectionId] : null)
);
export const selectWidgetByWidgetId = (widgetId: number) => createSelector(
  selectWidgets,
  (widgets) => (widgets ? widgets.find(widget => widget.widgetID === widgetId) : null)
);
export const selectDatabaseColumnsByTableName = (tableName: string) => createSelector(
  selectFormItemDatabaseColumns, (formItemDatabaseColumns) => (formItemDatabaseColumns && formItemDatabaseColumns[tableName]) || []);

export const selectRenderFormDropdownValuesByFormItemId = (formItemId: number) => createSelector(
  selectRenderFormDropdowns, (renderFormDropdowns) => (renderFormDropdowns && renderFormDropdowns[formItemId]) || []);