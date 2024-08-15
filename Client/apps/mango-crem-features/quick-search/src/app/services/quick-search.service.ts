import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService, UtilitiesService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Api } from '@mango/data-models/lib-data-models';

@Injectable()
export class QuickSearchService  extends EndpointService {
  quickSearchUrl: string = UtilitiesService.getBaseApiUrl(Api.quickSearch)
  listpagesUrl: string = UtilitiesService.getBaseApiUrl(Api.listpages)
  
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade  ) {
    super(http, facade);
  }

   getQuickSearchResults(searchString: string, moduleId: number): Observable<any> {
      const url = `${this.quickSearchUrl}/quicksearch/getquicksearchresults/${searchString}/${moduleId}`;
      return this.callHttpGet(url, 'getquicksearchresults');
  }

  getRedirectorLinkList() {
    return this.callHttpGet(
      `${this.listpagesUrl}listpage/RedirectorLinkList`,
      'redirectorLinkList'
    );
  }
}

