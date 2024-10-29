import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { environment } from 'apps/mango/src/environments/environment.local';
import { Observable } from 'rxjs';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class PortfolioMaintenanceService extends EndpointService {
  portfolioMaintenanceUrl: string = UtilitiesService.getBaseApiUrl(
    Api.portfolioMaintenance
  );

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getCompanyHierarchyLabels(masterGroupId: number): Observable<any> {
    const url = `${this.portfolioMaintenanceUrl}PortfolioMaintenance/GetCompanyHierarchyLabels/${masterGroupId}`;
    return this.callHttpGet(url, 'getCompanyHierarchyLabels');
  }

  getGroupContacts(groupId: number): Observable<any> {
    const url = `${this.portfolioMaintenanceUrl}PortfolioMaintenance/GroupContacts/${groupId}`;
    return this.callHttpGet(url, 'getGroupContacts');
  }

  getPortfolioHierarchyList(): Observable<any> {
    const url = `${this.portfolioMaintenanceUrl}PortfolioMaintenance/GetPortfolioHierarchyList`;
    return this.callHttpGet(url, 'getPortfolioHierarchyList');
  }

  deleteCompany(
    portfolioId: number,
    companyId: number,
    isPortfolio: boolean
  ): Observable<any> {
    const url = `${
      this.portfolioMaintenanceUrl
    }PortfolioMaintenance/Delete/${companyId.toString()}`;
    return this.callHttpPost(url, 'delete', {});
  }

  hasData(
    portfolioId: number,
    companyId: number,
    isPortfolio: boolean
  ): Observable<any> {
    const url = `${
      this.portfolioMaintenanceUrl
    }PortfolioMaintenance/HasAssociatedData/${portfolioId.toString()}/${companyId.toString()}/${isPortfolio}`;
    return this.callHttpPost(url, 'HasAssociatedData', {});
  }

  archivePortfolio(
    portfolioId: number,
    canArchive: boolean = false
  ): Observable<any> {
    const url = `${
      this.portfolioMaintenanceUrl
    }PortfolioMaintenance/Archive/${portfolioId.toString()}/${canArchive}`;
    return this.callHttpPost(url, 'Archive', {});
  }

  deletePortfolio(
    portfolioId: number,
    isClearAll: boolean = false,
    name: string
  ): Observable<any> {
    const request: { PortfolioId: number; IsClearAll: boolean; Name: String } =
      { PortfolioId: portfolioId, IsClearAll: isClearAll, Name: name };
    const url = `${this.portfolioMaintenanceUrl}PortfolioMaintenance/DeletePortfolio`;
    return this.callHttpPost(url, 'DeletePortfolio', request);
  }

  saveSubHierarchy(request): Observable<any> {
    const url = `${this.portfolioMaintenanceUrl}PortfolioMaintenance/SaveSubHierarchy`;
    return this.callHttpPost(url, 'SaveSubHierarchy', request);
  }
}
