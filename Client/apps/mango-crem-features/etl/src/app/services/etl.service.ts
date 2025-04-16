import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EndpointService } from '../../../../../../libs/core-shared/src';
import { UtilitiesService } from '@mango/core-shared';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';
import { DataGridQueryDto } from '@etl/model/data-grid-query-dto';
import { DownloadExcelTemplateDto } from '@etl/model/download-excel-template-dto';
import { TemplateType } from '@etl/model/template-type-dto';

@Injectable({
  providedIn: 'root',
})
export class ETLService extends EndpointService {
  etlServiceUrl: string = UtilitiesService.getBaseApiUrl(Api.etl);
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
    const url = `${this.etlServiceUrl}ETL/etl`;
    return this.callHttpGetWithErrorMessage(url, 'GetETLRight');
  }

  getETLTemplates(): Observable<any> {
    const url = `${this.etlServiceUrl}ETL/templates`;
    return this.callHttpGetWithErrorMessage(url, 'GetETLTemplates');
  }

  getHasEditRights(): Observable<any> {
    const url = `${this.etlServiceUrl}ETL/templatesEdit`;
    return this.callHttpGetWithErrorMessage(url, 'GetETLHasEditRights');
  }

  getETLImports(): Observable<any> {
    const url = `${this.etlServiceUrl}ETL/imports`;
    return this.callHttpGetWithErrorMessage(url, 'GetETLImports');
  }

  getETLStatus(): Observable<any> {
    const url = `${this.etlServiceUrl}ETL/status`;
    return this.callHttpGetWithErrorMessage(url, 'GetETLStatus');
  }

  getTemplateDetails(templateId: number): any {
    const url = `${this.etlServiceUrl}ETL/template/${templateId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetTemplateDetails');
  }

  getTemplateHistory(templateId: number): any {
    const url = `${this.etlServiceUrl}ETL/history/${templateId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetTemplateHistory');
  }

  getImportLog(): any {
    const url = `${this.etlServiceUrl}ETL/logs`;
    return this.callHttpGetWithErrorMessage(url, 'GetImportLog');
  }

  getKeyField(
    formId: number,
    objectTypeId: number,
    keyField: string,
    templateTypeId: number,
    updateOnly: boolean
  ): Observable<any> {
    const url = `${this.etlServiceUrl}ETL/keyfield/${formId}/${objectTypeId}/${keyField}/${templateTypeId}/${updateOnly}`;
    return this.callHttpGetWithErrorMessage(url, 'GetKeyField');
  }

  getForms(): any {
    const url = `${this.etlServiceUrl}ETL/forms`;
    return this.callHttpGetWithErrorMessage(url, 'GetForms');
  }

  getForm(formId: number): any {
    const url = `${this.etlServiceUrl}ETL/form/${formId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetForm');
  }

  getETLTemplateTypes(): Observable<any> {
    const url = `${this.etlServiceUrl}ETL/GetTemplateTypes`;
    return this.callHttpGet(url, 'GetTemplateTypes');
  }

  getUserPreferences(): Observable<any> {
    let url = `${this.dashboardsUrl}Dashboards/GetUserPreferences`;
    return this.callHttpGetWithErrorMessage(url, 'GetUserPreferences');
  }

  getPortfolios(): any {
    const url = `${this.etlServiceUrl}ETL/portfolios`;
    return this.callHttpGetWithErrorMessage(url, 'GetPortfolios');
  }

  getFiscalCalendarPortfolios(): Observable<any> {
    const url = `${this.etlServiceUrl}ETL/fiscalPortfolios`;
    return this.callHttpGetWithErrorMessage(url, 'GetFiscalCalendarPortfolios');
  }

  getParent(objectTypeId: number, formId: number): any {
    const url = `${this.etlServiceUrl}ETL/parent/${objectTypeId}/${formId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetParent');
  }

  getObject(objectTypeId: number): any {
    const url = `${this.etlServiceUrl}ETL/objectType/${objectTypeId}`;
    return this.callHttpGetWithErrorMessage(url, 'GetObject');
  }

  getDataGridFields(data: DataGridQueryDto): Observable<any> {
    let params = new HttpParams();
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        params = params.append(key, data[key]);
      }
    }
    const url = `${this.etlServiceUrl}ETL/fields`;
    return this.callHttpGetWithErrorMessage(url, 'GetDataGridFields', params);
  }

  checkTemplateName(templateName: string): any {
    const url = `${this.etlServiceUrl}ETL/name/${templateName}`;
    return this.callHttpGetWithErrorMessage(url, 'CheckTemplateName');
  }

  getParentLookupValues(parentObjectTypeId: number): any {
    const url = `${this.etlServiceUrl}ETL/parentLookups/${parentObjectTypeId}`;
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
    const url = `${this.etlServiceUrl}ETL/save`;
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
    const url = `${this.etlServiceUrl}ETL/exceltemplate`;
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

    return this.http
      .get(url, httpOptions)
      .pipe(catchError(this.handleErrorReturnMessage(functionName)));
  }

  hasDocumentImportRight(): Observable<any> {
    const url = `${this.etlServiceUrl}etldocumentmigration/hasdocumentimportright`;
    return this.callHttpGetWithErrorMessage(url, 'hasDocumentImportRight');
  }

  getFilesFromSftp(): Observable<any> {
    const url = `${this.etlServiceUrl}etldocumentmigration/getfilesfromsftp`;
    return this.http.post(url, 'getFilesFromSftp');
  }

  validateFiles(): Observable<any> {
    const url = `${this.etlServiceUrl}etldocumentmigration/validateFiles`;
    return this.http.post(url, 'validateFiles');
  }

  getValidateResults(): Observable<any> {
    const url = `${this.etlServiceUrl}etldocumentmigration/getvalidateresults`;
    return this.callHttpGetWithErrorMessage(url, 'getValidateResults');
  }

  documentsUpload(formData: any): Observable<any> {
    const url = `${this.etlServiceUrl}etldocumentmigration/uploadfile`;
    return this.http.post(url, formData, {
      headers: new HttpHeaders({ enctype: 'multipart/form-data' }),
      reportProgress: true,
      observe: 'events',
    });
  }

  getDocumentUploadStatus(untrustedFileName: string): any {
    const url = `${this.etlServiceUrl}etldocumentmigration/documentuploadstatus`;
    let params = new HttpParams();
    params = params.append('untrustedFileName', untrustedFileName);
    return this.callHttpGetWithErrorMessage(
      url,
      'getDocumentUploadStatus',
      params
    );
  }

  updateDocumentUploadStatus(untrustedFileName: string): any {
    const url = `${this.etlServiceUrl}etldocumentmigration/updatedocumentuploadstatus`;
    //const url = `https://localhost:54458/api/etldocumentmigration/updatedocumentuploadstatus`;
    let params = new HttpParams();
    params = params.append('untrustedFileName', untrustedFileName);
    return this.callHttpPostWithErrorMessage(
      url,
      'updateDocumentUploadStatus',
      { untrustedFileName }
    );
  }

  async chunkFileUpload(formData: any, isLastChunk: boolean): Promise<any> {
    const url = `${this.etlServiceUrl}etldocumentmigration/uploadchunk`;
    return this.http.post(url, formData, {
      headers: new HttpHeaders({ enctype: 'multipart/form-data' }),
      reportProgress: true,
      observe: 'events',
    });
  }

  downloadExcel() {
    const url = `${this.etlServiceUrl}etldocumentmigration/downloadvalidationreslts`;
    this.http.get(url, { responseType: 'blob' }).subscribe((blob) => {
      const a = document.createElement('a');
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = 'ValidationResults.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    });
  }
}
