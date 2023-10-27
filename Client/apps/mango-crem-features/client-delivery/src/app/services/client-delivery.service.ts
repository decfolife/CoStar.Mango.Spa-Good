import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { filter, switchMap } from 'rxjs/operators';
import { CentralAuthHttpError } from '@mango/data-models/lib-data-models';
import { UserService } from '@mango/core-shared';


@Injectable({
  providedIn: 'root'
})
export class ClientDeliveryService extends EndpointService 
{
  public isLoading = false;
  public isErrored = false;
  public requestHasBeenSent = false;

  constructor(
    private userService: UserService,
    protected http: HttpClient, @Optional() facade: MangoAppFacade
    )
  {
    super(http, facade);
  }

  getServiceAccounts(filter: string): Observable<any> {       
    let cKey : string;
    this.clientKey$.subscribe(clientKey=>{ cKey = clientKey;})
    if(!cKey) cKey ='retaildemo';  
    if(cKey){
      const url = `${environment.appUrls.authorization}serviceaccounts?Page=1&PageSize=10000&clientKey=${cKey}`;
      return this.callHttpGet(url, 'GetServiceAccounts')
    }
    return of({});
    
  }

  getServiceAccountChangeHistory(contactId: number): Observable<any> {       
    let cKey : string;
    this.clientKey$.subscribe(clientKey=>{ cKey = clientKey;})
    if(!cKey) cKey ='blank';  
    if(cKey){
      const url = `${environment.appUrls.authorization}serviceaccounthistory/${cKey}/${contactId}`;
      return this.callHttpGet(url, 'GetServiceAccountChangeHistory')
    }
    return of({});
    
  } 

  deleteServiceAccount(contactEmailAddress: string, contactID:number, contactActiveFlg: boolean): Observable<any> {    
    const url = `${environment.appUrls.authentication}serviceaccount`;
    var reqbody = {"email": contactEmailAddress, "contactID": contactID, "isActive": contactActiveFlg };            
    return this.callHttpPut(url, 'DeleteServiceAccount', reqbody)
  }

  addServiceAccount(emailAddress: string): Observable<any> {  
     var reqbody = {"email": emailAddress};
     const url = `${environment.appUrls.authentication}serviceaccount`;
     return this.callHttpPost(url, 'AddServiceAccount', reqbody)
  }

  resetPassword(emailAddress: string): Observable<any> {
    // //TODO: Integrate API call
    // const url = `${environment.appUrls.clientDelivery}ResetPassword/${emailAddress}`;
    // return this.callHttpPost(url, 'ResetPassword', {emailAddress})
    let cKey : string;    
    this.clientKey$.subscribe(clientKey=>{ cKey = clientKey; });

    const request = { email: emailAddress, clientKey:cKey };

    this.userService.forceExpirePassword(request).subscribe(
      () => this.sendRequestSuccess(),
      (error) => this.sendRequestFailed(error)
    );
    return of(true);
  }
  private sendRequestSuccess() {
    this.isLoading = false;
    this.isErrored = false;
    this.requestHasBeenSent = true;
  }
  private sendRequestFailed(error: CentralAuthHttpError) {
    this.requestHasBeenSent = false;
    this.isLoading = false;
    this.isErrored = true;
  }
}