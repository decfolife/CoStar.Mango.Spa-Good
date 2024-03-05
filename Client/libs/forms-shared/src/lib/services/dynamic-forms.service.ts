// item.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { DynamicFormEntity } from '../model/dynamic-forms-list.model';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { FormItemDataTypes, FormItemTypes, FormItemsDropdownValuesDto } from '@forms/model/dynamic-forms.interface';
import { ApiResponse } from '@mango/data-models/lib-data-models';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormsService extends EndpointService {
  
  getItems(): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetAdminFormsList`;
    return this.callHttpGet(url, 'GetAdminFormsList');   
  }

  getForm(formId: number): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetAdminFormByFormId/${formId}`;
    return this.callHttpGet(url, 'GetAdminFormByFormId');   
  }

  getFormActions(): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetFormActions`;
    return this.callHttpGet(url, 'GetFormActions');   
  }

  getFormSections(formId: number): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetFormSections/${formId}`;
    return this.callHttpGet(url, 'GetFormSections');   
  }

  getAvailableFormSections(formId: number): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetFormAvailableSections/${formId}`;
    return this.callHttpGet(url, 'GetFormAvailableSections');   
  }

  getFormFields(formId: number, sectionId: number, objectTypeId: number): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetFormFields/${formId}/${sectionId}/${objectTypeId}`;
    return this.callHttpGet(url, 'GetFormFields');   
  }

  getAvailableFormFields(formId: number, objectTypeId: number): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetAvailableFormFields/${formId}/${objectTypeId}`;
    return this.callHttpGet(url, 'GetAvailableFormFields');   
  }

  getFormItemDataTypes(): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetFormItemDataTypes`;
    return this.callHttpGet(url, 'GetFormItemDataTypes');   
  }

  getFormItemControlTypes(): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetFormItemControlTypes`;
    return this.callHttpGet(url, 'GetFormItemControlTypes');   
  }

  getFormItemWidgetByWidgetId(widgetId: number, objectId: number): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetFormItemWidgetByWidgetId/${widgetId}/${objectId}`;
    return this.callHttpGet(url, 'GetFormItemWidgetByWidgetId');   
  }

  getFormItemDatabaseTables(): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetFormItemDatabaseTables`;
    return this.callHttpGet(url, 'GetFormItemDatabaseTables');   
  }
  
  getDatabaseColumnsByTableName( tableName: string): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetDatabaseColumnsByTableName/${tableName}`;
    return this.callHttpGet(url, 'GetDatabaseColumnsByTableName');   
  }

  getFormItemDropdowns(): Observable<any> {
    const url = `${environment.appUrls.formWizard}AdminForms/GetFormItemDropdowns`;
    return this.callHttpGet(url, 'GetFormItemDropdowns');   
  }

  getRenderFormData(formId: number, objectId: number, objectTypeId: number): Observable<any> {
    const url = `${environment.appUrls.formWizard}RenderForms/GetRenderForm/${formId}/${objectId}/${objectTypeId}`;
    return this.callHttpGet(url, 'GetRenderFormData');   
  }

  getFormName(formId: number, objectId: number, objectTypeId: number): Observable<any> {
    const url = `${environment.appUrls.formWizard}RenderForms/GetFormName/${formId}/${objectId}/${objectTypeId}`;
    return this.callHttpGet(url, 'GetFormName');   
  }
  
  getRenderFormFormItemDropdowns(formItemsDropdownValues: FormItemsDropdownValuesDto[]): Observable<ApiResponse> {
    const url = `${environment.appUrls.formWizard}RenderForms/GetFormItemDropdownValues`;
    return this.callHttpPost(url, 'getFormItemDropdownValues', formItemsDropdownValues);
  }

}
