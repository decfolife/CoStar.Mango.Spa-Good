// item.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointService } from '@mango/core-shared/lib-core-shared';
import { SaveRenderFormCommand } from '@forms/model/dynamic-forms.interface';
import { ApiResponse } from '@mango/data-models/lib-data-models';
import { UtilitiesService } from '@mango/core-shared';
import { Api } from '@mango/data-models/lib-data-models';
import { CopyLease } from '@forms/model/copyLease';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormsService extends EndpointService {
  formWizardUrl: string = UtilitiesService.getBaseApiUrl(Api.formWizard);
  projectUrl: string = UtilitiesService.getBaseApiUrl(Api.projects);

  getItems(): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetAdminFormsList`;
    return this.callHttpGet(url, 'GetAdminFormsList');
  }

  getForm(formId: number, objectId: number): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetForm/${formId}/${objectId}`;
    return this.callHttpGet(url, 'GetForm');
  }

  getFormActions(
    formId: number,
    objectId: number,
    objectTypeId: number,
    objectTypeTypeId: number,
    isEditMode: boolean
  ): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormActions`;
    return this.callHttpPost(url, 'GetFormActions', {
      formId,
      objectId,
      objectTypeId,
      objectTypeTypeId,
      isEditMode,
    });
  }

  getFormSections(formId: number): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetFormSections/${formId}`;
    return this.callHttpGet(url, 'GetFormSections');
  }

  getLockingInfo(objectId: number, objectTypeId: number): Observable<any> {
    const url = `${this.formWizardUrl}AdminForms/GetLockingInfo/${objectId}/${objectTypeId}`;
    return this.callHttpGet(url, 'getLockingInfo');
  }

  getImageData(filePath: string): Observable<any> {
    const url = `${this.formWizardUrl}RenderForms/GetImageData?fileurl=${filePath}`;
    return this.callHttpGet(url, 'GetImageData');
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

  getFormFieldsForAllSections(
    formId: number,
    objectTypeId: number,
    formSections: []
  ): Observable<ApiResponse> {
    const url = `${this.formWizardUrl}AdminForms/GetFormFieldsForAllSections/${formId}/${objectTypeId}`;
    return this.callHttpPost(url, 'GetFormFieldsForAllSections', formSections);
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
    formId: number,
    objectId: number,
    objectTypeId: number
  ): Observable<ApiResponse> {
    const url = `${this.formWizardUrl}RenderForms/GetFormItemDropdownValues/${formId}/${objectId}/${objectTypeId}`;
    return this.callHttpGet(url, 'GetFormItemDropdownValues');
  }

  getParentLink(objectId: number, objectTypeId: number): Observable<any> {
    const url = `${this.formWizardUrl}RenderForms/GetParentLink/${objectId}/${objectTypeId}`;
    return this.callHttpGet(url, 'GetParentLink');
  }

  getBuildings(hidePremise) {
    const url = `${this.formWizardUrl}RenderForms/getbuildings?hidePremise=${hidePremise}`;
    return this.callHttpGet(url, 'GetBuildings');
  }

  getBuildingPremises(buildingId) {
    const url = `${this.formWizardUrl}RenderForms/getbuildingpremises/${buildingId}`;
    return this.callHttpGet(url, 'GetBuildingPremises');
  }

  copyLease(copyLease: CopyLease) {
    const url = `${this.formWizardUrl}RenderForms/copylease`;
    return this.callHttpPost(url, 'copyLease', copyLease);
  }

  saveRenderForm(
    saveRenderFormCommand: SaveRenderFormCommand
  ): Observable<any> {
    const url = `${this.formWizardUrl}RenderForms/save`;
    return this.callHttpPost(url, 'RenderFormsSave', saveRenderFormCommand);
  }

  getCountries(): Observable<ApiResponse> {
    const url = `${this.projectUrl}projects/GetCountries`;
    return this.callHttpGet(url, 'getCountries');
  }

  getStates(country: string): Observable<ApiResponse> {
    const url = `${this.projectUrl}projects/GetStates?country=${country}`;
    return this.callHttpGet(url, 'getStates');
  }

  getBuildingsForActions(
    country: string,
    state: string
  ): Observable<ApiResponse> {
    const url = `${this.projectUrl}projects/GetBuildings?country=${country}&state=${state}`;
    return this.callHttpGet(url, 'getBuildingsForActions');
  }

  getPremises(buildingId: number): Observable<ApiResponse> {
    const url = `${this.projectUrl}projects/GetPremises/${buildingId}`;
    return this.callHttpGet(url, 'getPremises');
  }

  getLeases(buildingId: number, premiseId: number): Observable<ApiResponse> {
    const url = `${this.projectUrl}projects/GetLeases/${buildingId}/${premiseId}`;
    return this.callHttpGet(url, 'getLeases');
  }

  getAssociateBuildingToProject(projectId: number): Observable<ApiResponse> {
    const url = `${this.projectUrl}projects/AssociateBuildingToProject/${projectId}`;
    return this.callHttpGet(url, 'getAssociateBuildingToProject');
  }

  setAssociateBuildingToProject(buildingInfo: number): Observable<ApiResponse> {
    const url = `${this.projectUrl}projects/AssociateBuildingToProject/`;
    return this.callHttpPost(
      url,
      'setAssociateBuildingToProject',
      buildingInfo
    );
  }

  getAssociateLeaseToProject(projectId: number): Observable<ApiResponse> {
    const url = `${this.projectUrl}projects/AssociateLeaseToProject/${projectId}`;
    return this.callHttpGet(url, 'getAssociateLeaseToProject');
  }

  setAssociateLeaseToProject(leaseInfo: number): Observable<ApiResponse> {
    const url = `${this.projectUrl}projects/AssociateLeaseToProject`;
    return this.callHttpPost(url, 'setAssociateLeaseToProject', leaseInfo);
  }
}
