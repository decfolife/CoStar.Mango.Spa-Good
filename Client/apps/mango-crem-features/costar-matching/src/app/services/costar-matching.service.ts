import { Injectable, Optional } from '@angular/core';
import { EndpointService } from '../../../../../../libs/core-shared/src';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { HttpClient } from '@angular/common/http';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { Observable, of} from 'rxjs';
import { CoStarProperty, BuildingInfo } from '@mango/data-models/lib-data-models';

@Injectable({
  providedIn: 'root'
})
export class CostarMatchingService extends EndpointService 
{
  public isLoading = false;
  public isErrored = false;
  public requestHasBeenSent = false;

  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getMatchedCostarProperty(request: any): Observable<CoStarProperty[]> {    
    const costarProperties: CoStarProperty[] = [
      {
        coStarId: 100,
        address: '333 Peachtree Rd, Atlanta, GA 30326',
        propertyType: 'Building',
        confidenceScore: 40,
      },
      {
        coStarId: 101,
        address: '400 Peachtree Rd, Atlanta, GA 30326',
        propertyType: 'Lease',
        confidenceScore: 20,
      },
      {
        coStarId: 102,
        address: '500 Peachtree Rd, Atlanta, GA 30326',
        propertyType: 'Office',
        confidenceScore: 0,
      }
    ];

    return of(costarProperties);
    // const url = `${environment.appUrls.costarMatch}properties/`;          
    // return this.callHttpGet(url, 'matchall', request)
  }

  getBuildingInfo(buildingID: number): Observable<any> {    
    const buildingInfo: BuildingInfo = {
      buildingId: 111,
      coStarId: 222,
      buildingActive: true,
      buildingName: 'Phipps Plaza Heights',
      buildingAddress_1: '3438 Main street',
      buildingAddress_2: '',
      buildingCity: 'Altanta',
      buildingState: 'GA',
      buildingZipCode: '30020',
      buildingCountry: 'United States',
    };
    return of(buildingInfo);
    // const clientKey = 'blank';
    // const url = `${environment.appUrls.costarMatch}properties/buildinginformation/{buildingID}/{clientKey}`;          
    // return this.callHttpGet(url, 'buildinginformation', buildingID)
  }

  saveCostarProperty(costarProperty: any) : Observable<any>{
    return of(true);
  }
}
