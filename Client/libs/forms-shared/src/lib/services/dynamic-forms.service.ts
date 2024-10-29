// item.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { FormItemsDropdownValuesDto } from '@forms/model/dynamic-forms.interface';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormsService extends EndpointService {
  formWizardUrl: string = UtilitiesService.getBaseApiUrl(Api.formWizard);

  getItems(): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetAdminFormsList`;
    return this.callHttpGet(url, 'GetAdminFormsList');
  }

  getForm(formId: number): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetAdminFormByFormId/${formId}`;
    return this.callHttpGet(url, 'GetAdminFormByFormId');
  }

  getFormActions(): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormActions`;
    return this.callHttpGet(url, 'GetFormActions');
  }

  getFormSections(formId: number): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormSections/${formId}`;
    return this.callHttpGet(url, 'GetFormSections');
  }

  getAvailableFormSections(formId: number): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormAvailableSections/${formId}`;
    return this.callHttpGet(url, 'GetFormAvailableSections');
  }

  getFormFields(
    formId: number,
    sectionId: number,
    objectTypeId: number
  ): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormFields/${formId}/${sectionId}/${objectTypeId}`;
    return this.callHttpGet(url, 'GetFormFields');
  }

  getAvailableFormFields(
    formId: number,
    objectTypeId: number
  ): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetAvailableFormFields/${formId}/${objectTypeId}`;
    return this.callHttpGet(url, 'GetAvailableFormFields');
  }

  getFormItemDataTypes(): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormItemDataTypes`;
    return this.callHttpGet(url, 'GetFormItemDataTypes');
  }

  getFormItemControlTypes(): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormItemControlTypes`;
    return this.callHttpGet(url, 'GetFormItemControlTypes');
  }

  getFormItemWidgetByWidgetId(
    widgetId: number,
    objectId: number
  ): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormItemWidgetByWidgetId/${widgetId}/${objectId}`;
    return this.callHttpGet(url, 'GetFormItemWidgetByWidgetId');
  }

  getFormItemDatabaseTables(): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormItemDatabaseTables`;
    return this.callHttpGet(url, 'GetFormItemDatabaseTables');
  }

  getDatabaseColumnsByTableName(tableName: string): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetDatabaseColumnsByTableName/${tableName}`;
    return this.callHttpGet(url, 'GetDatabaseColumnsByTableName');
  }

  getFormItemDropdowns(): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormItemDropdowns`;
    return this.callHttpGet(url, 'GetFormItemDropdowns');
  }

  getRenderFormData(
    formId: number,
    objectId: number,
    objectTypeId: number
  ): Observable<any> {
    const url = `${this.formWizardUrl}RenderForms/GetRenderForm/${formId}/${objectId}/${objectTypeId}`;
    return this.callHttpGet(url, 'GetRenderFormData');
  }

  getFormName(
    formId: number,
    objectId: number,
    objectTypeId: number
  ): Observable<any> {
    const url = `${this.formWizardUrl}RenderForms/GetFormName/${formId}/${objectId}/${objectTypeId}`;
    return this.callHttpGet(url, 'GetFormName');
  }

  getRenderFormFormItemDropdowns(
    formItemsDropdownValues: FormItemsDropdownValuesDto[]
  ): Observable<ApiResponse> {
    const url = `${this.formWizardUrl}RenderForms/GetFormItemDropdownValues`;
    return this.callHttpPost(
      url,
      'getFormItemDropdownValues',
      formItemsDropdownValues
    );
  }
}
