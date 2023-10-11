import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from '@mango/core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientDeliveryService extends EndpointService 
{
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) 
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

  deleteServiceAccount(serviceAccountsData: any, contactID: number, contactEmailAddress: string, contactActiveFlg: boolean, filter:string): Observable<any> {    
            let cKey : string;
            this.clientKey$.subscribe(clientKey=>{ cKey = clientKey;})
            
            if(cKey){
              const url = `${environment.appUrls.authentication}serviceaccount/${contactEmailAddress}/${cKey}`;
              var reqbody = {"email": contactEmailAddress,  "clientKey": cKey, "isActive": contactActiveFlg };            
              return this.callHttpPost(url, 'DeleteServiceAccount', reqbody)
            }
            return of({});
  }

  addServiceAccount(emailAddress: string): Observable<any> {  
     let cKey : string; 
   // let uID : number;
    this.clientKey$.subscribe(clientKey=>{ cKey = clientKey; });
    //this.userId$.subscribe(userid=>{ uID = userid; }); 
    if(!cKey) {
      cKey = "RETAILDEMO";
    }   
     var reqbody = {"email": emailAddress,  "clientKey": cKey };
     const url = `${environment.appUrls.authentication}user/serviceaccount/`;
     return this.callHttpPost(url, 'AddServiceAccount', reqbody)
  }

  resetPassword(emailAddress: string): Observable<any> {
    // //TODO: Integrate API call
    // const url = `${environment.appUrls.clientDelivery}ResetPassword/${emailAddress}`;
    // return this.callHttpPost(url, 'ResetPassword', {emailAddress})

    return of(true);
  } 
}
