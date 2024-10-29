import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { EndpointService } from '../../../../../../libs/core-shared/src';
import { UtilitiesService } from '@mango/core-shared';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';
import { DataGridQueryDto } from '@etl/model/data-grid-query-dto';
import { DownloadExcelTemplateDto } from '@etl/model/download-excel-template-dto';

@Injectable({
  providedIn: 'root',
})
export class ETLService extends EndpointService {
  etlServiceUrl: string = UtilitiesService.getBaseApiUrl(Api.etl) + 'ETL/'; // //'http://localhost:5801/api/etl/';
  dashboardsUrl: string = UtilitiesService.getBaseApiUrl(Api.dashboards);

  public dateFormat: string = null;

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  public setUserDateFormat(isDatesEU: boolean) {
    if (isDatesEU) {
      this.dateFormat = 'dd.MM.yyyy HH:mm';
    } else {
      this.dateFormat = 'MM/dd/yyyy hh:mm a';
    }
  }

  getETLRight(): any {
    const url = `${this.etlServiceUrl}etl`;
    return this.callHttpGetWithErrorMessage(url, 'GetETLRight');
  }

  getETLTemplates(): Observable<any> {
    const url = `${this.etlServiceUrl}templates`;
    return this.callHttpGetWithErrorMessage(url, 'GetETLTemplates');
  }

  getHasEditRights(): Observable<any> {
    const url = `${this.etlServiceUrl}templatesEdit`;
    return this.callHttpGetWithErrorMessage(url, 'GetETLHasEditRights');
  }

  getETLImports(): Observable<any> {
    const url = `${this.etlServiceUrl}imports`;
    return this.callHttpGetWithErrorMessage(url, 'GetETLImports');
  }

  getETLStatus(): Observable<any> {
    const url = `${this.etlServiceUrl}status`;
    return this.callHttpGetWithErrorMessage(url, 'GetETLStatus');
  }

  getTemplateDetails(templateId: number): any {
    const url = `${this.etlServiceUrl}template/${templateId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetTemplateDetails');
  }

  getTemplateHistory(templateId: number): any {
    const url = `${this.etlServiceUrl}history/${templateId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetTemplateHistory');
  }

  getImportLog(): any {
    const url = `${this.etlServiceUrl}logs`;
    return this.callHttpGetWithErrorMessage(url, 'GetImportLog');
  }

  getKeyField(
    formId: number,
    objectTypeId: number,
    keyField: string,
    templateTypeId: number,
    updateOnly: boolean
  ): Observable<any> {
    const url = `${this.etlServiceUrl}keyfield/${formId}/${objectTypeId}/${keyField}/${templateTypeId}/${updateOnly}`;
    return this.callHttpGetWithErrorMessage(url, 'GetKeyField');
  }

  getForms(): any {
    const url = `${this.etlServiceUrl}forms`;
    return this.callHttpGetWithErrorMessage(url, 'GetForms');
  }

  getForm(formId: number): any {
    const url = `${this.etlServiceUrl}form/${formId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetForm');
  }

  getUserPreferences(): Observable<any> {
    let url = `${this.dashboardsUrl}Dashboards/GetUserPreferences`;
    return this.callHttpGetWithErrorMessage(url, 'GetUserPreferences');
  }

  getPortfolios(): any {
    const url = `${this.etlServiceUrl}portfolios`;
    return this.callHttpGetWithErrorMessage(url, 'GetPortfolios');
  }

  getFiscalCalendarPortfolios(): Observable<any> {
    const url = `${this.etlServiceUrl}fiscalPortfolios`;
    return this.callHttpGetWithErrorMessage(url, 'GetFiscalCalendarPortfolios');
  }

  getParent(objectTypeId: number, formId: number): any {
    const url = `${this.etlServiceUrl}parent/${objectTypeId}/${formId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetParent');
  }

  getObject(objectTypeId: number): any {
    const url = `${this.etlServiceUrl}objectType/${objectTypeId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetObject');
  }

  getDataGridFields(data: DataGridQueryDto): Observable<any> {
    let params = new HttpParams();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.append(key, data[key]);
      }
    }
    const url = `${this.etlServiceUrl}fields`;
    return this.callHttpGetWithErrorMessage(url, 'GetDataGridFields', params);
  }

  checkTemplateName(templateName: string): any {
    const url = `${this.etlServiceUrl}name/${templateName}`;
    return this.callHttpGetWithErrorMessage(url, 'CheckTemplateName');
  }

  getParentLookupValues(parentObjectTypeId: number): any {
    const url = `${this.etlServiceUrl}parentLookups/${parentObjectTypeId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetParentLookupValues');
  }

  // for ada
  getId(
    componentName: string,
    uniqueName: string,
    elementType: string,
    componentType?: string
  ) {
    return componentType
      ? `${componentName}-${componentType}-${uniqueName}-${elementType}`
      : `${componentName}-${uniqueName}-${elementType}`;
  }

  saveTemplateForm(saveTemplateDto: any): Observable<any> {
    const url = `${this.etlServiceUrl}save`;
    return this.callHttpPostWithErrorMessage(
      url,
      'SaveTemplate',
      saveTemplateDto
    );
  }

  generateExcelTemplate(data: DownloadExcelTemplateDto): Observable<any> {
    let params = new HttpParams();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.append(key, data[key]);
      }
    }
    const url = `${this.etlServiceUrl}exceltemplate`;
    return this.callHttpGetWithErrorMessageForBlobs(
      url,
      'GenerateExcelTemplate',
      params
    );
  }

  protected callHttpGetWithErrorMessageForBlobs(
    url: string,
    functionName: string,
    httpOptionsParams?: any,
    options?: { responseType: 'blob' }
  ): Observable<Blob> {
    var httpOptions = this.getHttpHeaders();
    if (httpOptionsParams) {
      httpOptions.params = httpOptionsParams;
    }
    if (options) {
      httpOptions = { ...httpOptions, ...options };
    }

    return this.http.get(url, httpOptions).pipe(
      map((x) => x),
      catchError(this.handleErrorReturnMessage(functionName))
    );
  }
}
