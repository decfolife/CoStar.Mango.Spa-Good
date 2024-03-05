import { createAction, props } from '@ngrx/store';
import { DynamicFormEntity } from '../model/dynamic-forms-list.model';
import { BasicSelect, Dropdowns, FormItemDataTypes, FormItemDatabaseTables, FormItemSourceColumnbySourceTable, FormItemTypes, FormItemsDropdownValuesDto, IDynamicForm, IFields, RenderFormDropdowns, Widget } from '@forms/model/dynamic-forms.interface';

export const FORMSLIST_LOAD_SUCCESS =  '[FormsList] Load Success'
export const FORMSLIST_LOAD_FAILURE ='[FormsList] Load Failure'

export const DYNAMIC_FORM_LOAD = '[DynamicForm] Load Details'
export const DYNAMIC_FORM_LOAD_SUCCESS = '[DynamicForm] Load Details Success'
export const DYNAMIC_FORM_LOAD_FAILURE = '[DynamicForm] Load Details Failure'

export const LOAD_ACTIONS = '[DynamicForm] Load Form Actions'
export const LOAD_ACTIONS_SUCCESS = '[DynamicForm] Load Actions Success'
export const LOAD_ACTIONS_FAILURE = '[DynamicForm] Load Actions Failure'

export const LOAD_AVAILABLE_SECTIONS = '[DynamicForm] Load Available Sections'
export const LOAD_AVAILABLE_SECTIONS_SUCCESS = '[DynamicForm] Load Available Sections Success'
export const LOAD_AVAILABLE_SECTIONS_FAILURE = '[DynamicForm] Load Available Sections Failure'

export const LOAD_SECTIONS = '[DynamicForm] Load Sections'
export const LOAD_SECTIONS_SUCCESS = '[DynamicForm] Load Sections Success'
export const LOAD_SECTIONS_FAILURE = '[DynamicForm] Load Sections Failure'

export const LOAD_AVAILABLE_FIELDS = '[DynamicForm] Load Available Fields'
export const LOAD_AVAILABLE_FIELDS_SUCCESS = '[DynamicForm] Load Available Fields Success'
export const LOAD_AVAILABLE_FIELDS_FAILURE = '[DynamicForm] Load Available Fields Failure'

export const LOAD_FIELDS = '[DynamicForm] Load Fields'
export const LOAD_FIELDS_SUCCESS = '[DynamicForm] Load Fields Success'
export const LOAD_FIELDS_FAILURE = '[DynamicForm] Load Fields Failure'


export const clearDynamicFormsState = createAction('[DynamicForm] Clear Dynamic Form State');
export const setisRenderForm = createAction( '[DynamicForm] Set isRenderForm', props<{ isRenderForm: boolean }>() );

// FormList 
export const initForms = createAction('[FormsList] Load');
export const formListloadSuccess = createAction( FORMSLIST_LOAD_SUCCESS, props<{ forms: DynamicFormEntity[] }>());
export const formListloadFailure = createAction( FORMSLIST_LOAD_FAILURE, props<{ error: any }>() );
// Dynamic Form
export const dynamicFormLoad = createAction( DYNAMIC_FORM_LOAD, props<{ formId: number }>() );
export const dynamicFormLoadSuccess = createAction( DYNAMIC_FORM_LOAD_SUCCESS, props<{ dynamicForm: DynamicFormEntity }>() );
export const dynamicFormLoadFailure = createAction( DYNAMIC_FORM_LOAD_FAILURE, props<{ error: Error; formId: number }>() );
export const setObjectId = createAction( '[DynamicForm] Object ID Set', props<{ objectId: number }>() );
// Dynamic Form Actions
export const dynamicFormLoadActions = createAction(LOAD_ACTIONS);
export const dynamicFormLoadActionLoadSuccess = createAction(LOAD_ACTIONS_SUCCESS, props<{ formActions: any }>());
export const dynamicFormLoadActionLoadFailure = createAction( LOAD_ACTIONS_FAILURE, props<{ error: Error}>());
//Dynamic Form Available Sections
export const dynamicFormLoadAvailableSections = createAction(LOAD_AVAILABLE_SECTIONS);
export const dynamicFormLoadAvailableSectionsSuccess = createAction(LOAD_AVAILABLE_SECTIONS_SUCCESS, props<{ formAvailableSections: any }>());
export const dynamicFormLoadAvailableSectionsFailure = createAction( LOAD_AVAILABLE_SECTIONS_FAILURE, props<{ error: Error}>());
//Dynamic Form Sections (on form)
export const dynamicFormLoadSections = createAction(LOAD_SECTIONS);
export const dynamicFormLoadSectionsSuccess = createAction(LOAD_SECTIONS_SUCCESS, props<{ formSections: any }>());
export const dynamicFormLoadSectionsFailure = createAction( LOAD_SECTIONS_FAILURE, props<{ error: Error}>());

export const addSectionToForm= createAction('[DynamicForm] Add Section to Form', props<{ section: any }>());
export const removeSectionFromAvailableSections = createAction('[DynamicForm] Remove Section from Available Sections', props<{ sectionId: number, section: any }>() );

//Dynamic Form Available Fields
export const dynamicFormLoadAvailableFields = createAction(LOAD_AVAILABLE_FIELDS, props<{ formId: number, objectTypeId: number }>() );
export const dynamicFormLoadAvailableFieldsSuccess = createAction(LOAD_AVAILABLE_FIELDS_SUCCESS, props<{  formAvailableFields: IFields[] }>());
export const dynamicFormLoadAvailableFieldsFailure = createAction(LOAD_AVAILABLE_FIELDS_FAILURE, props<{ error: any }>());

export const dynamicFormLoadAvailableFieldsToSection = createAction('[DynamicForm] Load Available Fields to Section', props<{  sectionId: number }>());
export const dynamicFormLoadAvailableFieldsToSectionSuccess = createAction('[DynamicForm] Load Available Fields to Section Success', props<{ sectionId: number, formAvailableFieldsInSection: IFields[] }>());
export const dynamicFormLoadAvailableFieldsToSectionFailure = createAction('[DynamicForm] Load Available Fields to Section Failure', props<{ error: Error}>());

export const addAvailableFieldToSection = createAction('[DynamicForm] Add Available Field to Section', props<{ sectionId: number, field: IFields }>());
export const removeAvailableFieldFromSection = createAction('[DynamicForm] Remove Available Field from Section', props<{ sectionId: number; field: IFields }>() );

//Dynamic Form Fields (on form)
export const dynamicFormLoadFields = createAction(LOAD_FIELDS, props<{ formId: number, sectionId: number, objectTypeId: number }>() );
export const dynamicFormLoadFieldsSuccess = createAction(LOAD_FIELDS_SUCCESS, props<{ sectionId: number, formFields: IFields[] }>());
export const dynamicFormLoadFieldsFailure = createAction(LOAD_FIELDS_FAILURE, props<{ sectionId: number, error: any }>());
export const updateFormFieldBySectionId = createAction('[DynamicForm] Field Updated', props<{ sectionId: number, field: IFields }>());

//Dynamic Form Items Control Types
export const dynamicFormLoadFormItemControlTypes = createAction('[DynamicForm] Load Form Item Control Types');
export const dynamicFormLoadFormItemControlTypesSuccess = createAction('[DynamicForm] Load Form Item Control Types Success', props<{  formItemControlTypes: FormItemTypes[] }>());
export const dynamicFormLoadFormItemControlTypesFailure = createAction('[DynamicForm] Load Form Item Control Types Failure', props<{ error: any }>());

//Dynamic Form Form Items Data Types
export const dynamicFormLoadFormItemDataTypes = createAction('[DynamicForm] Load Form Item Data Types');
export const dynamicFormLoadFormItemDataTypesSuccess = createAction('[DynamicForm] Load Form Item Data Types Success', props<{  formItemDataTypes: FormItemDataTypes[] }>());
export const dynamicFormLoadFormItemDataTypesFailure = createAction('[DynamicForm] Load Form Item Data Types Failure', props<{ error: any }>());

//Dynamic Form Item Widget
export const dynamicFormLoadWidgetByWidgetId = createAction('[DynamicForm] Load Form Widget By Widget Id', props<{ widgetId: number }>() );
export const dynamicFormLoadWidgetByWidgetIdSuccess = createAction('[DynamicForm] Load Form Widget By Widget Id Success', props<{ widget: Widget }>());
export const dynamicFormLoadWidgetByWidgetIdFailure = createAction('[DynamicForm] Load Form Widget By Widget Id Failure', props<{ error: any }>());

//Dynamic Form Item Database Tables
export const dynamicFormLoadDatabaseTables = createAction('[DynamicForm] Load Form Item Tables');
export const dynamicFormLoadDatabaseTablesSuccess = createAction('[DynamicForm] Load Form Item Tables Success', props<{ formItemDatabaseTables: FormItemDatabaseTables[] }>());
export const dynamicFormLoadDatabaseTablesFailure = createAction('[DynamicForm] Load Form Item Tables Failure', props<{ error: any }>());

//Dynamic Form Item Database Columns
export const dynamicFormLoadDatabaseColumnsByTableName = createAction('[DynamicForm] Load Database Columns By Table Name', props<{  tableName: string }>());
export const dynamicFormLoadDatabaseColumnsByTableNameSuccess = createAction('[DynamicForm] Load Database Columns By Table Name Success', props<{ tableName: string, formItemDatabaseColumns: FormItemSourceColumnbySourceTable[] }>());
export const dynamicFormLoadDatabaseColumnsByTableNameFailure = createAction('[DynamicForm] Load Database Columns By Table Name Failure', props<{ error: Error}>());

//Dynamic Form Item Dropdowns
export const dynamicFormLoadFormItemDropdowns = createAction('[DynamicForm] Load Form Item Dropdowns');
export const dynamicFormLoadFormItemDropdownsSuccess = createAction('[DynamicForm] Load Form Item Dropdowns Success', props<{ formItemDropdowns: Dropdowns[] }>());
export const dynamicFormLoadFormItemDropdownsFailure = createAction('[DynamicForm] Load Form Item Dropdowns Failure', props<{ error: Error}>());

//Render form
export const dynamicFormLoadRenderForm = createAction('[DynamicForm] Load Render Form', props<{ formId: number, objectId: number, objectTypeId: number }>() );
export const dynamicFormLoadRenderFormSuccess = createAction('[DynamicForm] Load Render Form Success', props<{ renderFormData: any }>());
export const dynamicFormLoadRenderFormFailure = createAction('[DynamicForm] Load Render Form Failure', props<{ error: any }>());

//Form Name
export const dynamicFormLoadFormName = createAction('[DynamicForm] Load Form Name');
export const dynamicFormLoadFormNameSuccess = createAction('[DynamicForm] Load Form Name Success', props<{ formName: string }>());
export const dynamicFormLoadFormNameFailure = createAction('[DynamicForm] Load Form Name Failure', props<{ error: any }>());

//Render Form Item Dropdowns
export const renderFormLoadFormItemDropdowns = createAction('[RenderForm] Load Render Form Item Dropdowns', props<{ data: FormItemsDropdownValuesDto[] }>() );
export const renderFormLoadFormItemDropdownsSuccess = createAction('[RenderForm] Load Render Form Item Dropdowns Success',  props<{ renderFormDropdowns: RenderFormDropdowns[]}>());
export const renderFormLoadFormItemDropdownsFailure = createAction('[RenderForm] Load Render Form Item Dropdowns Failure', props<{ error: Error}>());