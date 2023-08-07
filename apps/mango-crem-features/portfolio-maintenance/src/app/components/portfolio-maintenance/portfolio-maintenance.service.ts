import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'apps/mango/src/environments/environment.local';
import { Observable } from 'rxjs';
import { EndpointService } from '../../shared/services/endpoint.service';

@Injectable()
export class PortfolioMaintenanceService extends EndpointService {
  constructor(protected http: HttpClient) {
    super(http);
  }

  getCompanyHierarchyLabels(masterGroupId: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.portfolioMaintenance}PortfolioMaintenance/GetCompanyHierarchyLabels/${masterGroupId}`;
      return this.callHttpGet(url, 'getCompanyHierarchyLabels')
    }

    const url = `${environment.appUrls.portfolioMaintenance}GetCompanyHierarchyLabels`;
    return this.callHttpGet(url, 'getCompanyHierarchyLabels',
      {
        masterGroupId: masterGroupId
      }
    )
  }

  getGroupContacts(groupId: number): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.portfolioMaintenance}PortfolioMaintenance/GroupContacts/${groupId}`;
      return this.callHttpGet(url, 'getGroupContacts')
    }

    const url = `${environment.appUrls.portfolioMaintenance}GroupContacts`;
    return this.callHttpGet(url, 'getGroupContacts',
      {
        id: groupId
      }
    )
  }

  getPortfolioHierarchyList(): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.portfolioMaintenance}PortfolioMaintenance/GetPortfolioHierarchyList`;
      return this.callHttpGet(url, 'getPortfolioHierarchyList')
    }
    const url = `${environment.appUrls.portfolioMaintenance}GetPortfolioHierarchyList`;
    return this.callHttpGet(url, 'getPortfolioHierarchyList')
  }

  deleteCompany(portfolioId: number, companyId: number, isPortfolio: boolean): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.portfolioMaintenance}PortfolioMaintenance/Delete/${companyId.toString()}`;
      return this.callHttpPost(url, 'delete', {})
    }
    const url = `${environment.appUrls.portfolioMaintenance}Delete`;
    return this.callHttpPost(url, 'delete', { companyId })
  }

  hasData(portfolioId: number, companyId: number, isPortfolio: boolean): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.portfolioMaintenance}PortfolioMaintenance/HasAssociatedData/${portfolioId.toString()}/${companyId.toString()}/${isPortfolio}`;
      return this.callHttpPost(url, 'HasAssociatedData', {})
    }
    const url = `${environment.appUrls.portfolioMaintenance}HasAssociatedData`;
    return this.callHttpPost(url, 'HasAssociatedData', { portfolioId, companyId, isPortfolio })
  }

  archivePortfolio(portfolioId: number, canArchive: boolean = false): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.portfolioMaintenance}PortfolioMaintenance/Archive/${portfolioId.toString()}/${canArchive}`;
      return this.getHttpPostApiResponse(url, 'Archive', {})
    }
    const url = `${environment.appUrls.portfolioMaintenance}Archive`;
    return this.getHttpPostApiResponse(url, 'Archive', { portfolioId, canArchive })
  }

  deletePortfolio(portfolioId: number, isClearAll: boolean = false, name: string): Observable<any> {
    const request : {PortfolioId: number, IsClearAll: boolean, Name: String} = {PortfolioId: portfolioId, IsClearAll: isClearAll, Name: name};
    if (environment.isRestful) {
      const url = `${environment.appUrls.portfolioMaintenance}PortfolioMaintenance/DeletePortfolio`;
      return this.getHttpPostApiResponse(url, 'DeletePortfolio', request)
    }
    const url = `${environment.appUrls.portfolioMaintenance}DeletePortfolio`;
    return this.getHttpPostApiResponse(url, 'DeletePortfolio', {request})
  }

  saveSubHierarchy(request): Observable<any> {
    if (environment.isRestful) {
      const url = `${environment.appUrls.portfolioMaintenance}PortfolioMaintenance/SaveSubHierarchy`;
      return this.getHttpPostApiResponse(url, 'SaveSubHierarchy', request)
    }
    const url = `${environment.appUrls.portfolioMaintenance}SaveSubHierarchy`;
    return this.getHttpPostApiResponse(url, 'SaveSubHierarchy', { request })
  }
}
