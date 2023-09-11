import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../../mango/src/environments/environment.local';
import { EndpointService } from '../../../../../../libs/core-shared/src/lib/services/endpoint.service';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';

@Injectable({
  providedIn: 'root'
})
export class ClientDeliveryService extends EndpointService {
  constructor(protected http: HttpClient, @Optional() facade: MangoAppFacade) {
    super(http, facade);
  }

  getServiceAccounts(filter: string): Observable<any> {
    // //TODO: Integrate API call
    // const url = `${environment.appUrls.clientDelivery}GetServiceAccounts/${emailAddress}`;
    // return this.callHttpGet(url, 'GetServiceAccounts')

    //For now, using mock data
    const testData = [
      {contactID: 1, contactEmailAddress: 'test1@test.com', isActive: 'active'},
      {contactID: 2, contactEmailAddress: 'test2@test.com', isActive: 'active'},
      {contactID: 3, contactEmailAddress: 'test3@test.com', isActive: 'inactive'}, 
      {contactID: 4, contactEmailAddress: 'test4@test.com', isActive: 'active'},
      {contactID: 5, contactEmailAddress: 'test5@test.com', isActive: 'inactive'},
      {contactID: 6, contactEmailAddress: 'test6@test.com', isActive: 'active'},
      {contactID: 7, contactEmailAddress: 'test7@test.com', isActive: 'active'},
      {contactID: 8, contactEmailAddress: 'test8@test.com', isActive: 'inactive'}, 
      {contactID: 9, contactEmailAddress: 'test9@test.com', isActive: 'active'},
      {contactID: 10, contactEmailAddress: 'test10@test.com', isActive: 'inactive'},
      {contactID: 11, contactEmailAddress: 'test11@test.com', isActive: 'active'},
      {contactID: 12, contactEmailAddress: 'test12@test.com', isActive: 'active'},
      {contactID: 13, contactEmailAddress: 'test13@test.com', isActive: 'inactive'}, 
      {contactID: 14, contactEmailAddress: 'test14@test.com', isActive: 'active'},
      {contactID: 15, contactEmailAddress: 'test15@test.com', isActive: 'inactive'},
      {contactID: 16, contactEmailAddress: 'test16@test.com', isActive: 'active'},
      {contactID: 17, contactEmailAddress: 'test17@test.com', isActive: 'active'},
      {contactID: 18, contactEmailAddress: 'test18@test.com', isActive: 'inactive'}, 
      {contactID: 19, contactEmailAddress: 'test19@test.com', isActive: 'active'},
      {contactID: 20, contactEmailAddress: 'test20@test.com', isActive: 'inactive'},
      {contactID: 21, contactEmailAddress: 'test21@test.com', isActive: 'active'},
      {contactID: 22, contactEmailAddress: 'test22@test.com', isActive: 'active'},
      {contactID: 23, contactEmailAddress: 'test23@test.com', isActive: 'inactive'}, 
      {contactID: 24, contactEmailAddress: 'test24@test.com', isActive: 'active'},
      {contactID: 25, contactEmailAddress: 'test25@test.com', isActive: 'inactive'},
      {contactID: 26, contactEmailAddress: 'test26@test.com', isActive: 'active'},
      {contactID: 27, contactEmailAddress: 'test27@test.com', isActive: 'active'},
      {contactID: 28, contactEmailAddress: 'test28@test.com', isActive: 'inactive'}, 
      {contactID: 29, contactEmailAddress: 'test29@test.com', isActive: 'active'},
      {contactID: 30, contactEmailAddress: 'test30@test.com', isActive: 'inactive'},
      {contactID: 31, contactEmailAddress: 'test31@test.com', isActive: 'active'},
      {contactID: 32, contactEmailAddress: 'test32@test.com', isActive: 'active'},
      {contactID: 33, contactEmailAddress: 'test33@test.com', isActive: 'inactive'}, 
      {contactID: 34, contactEmailAddress: 'test34@test.com', isActive: 'active'},
      {contactID: 35, contactEmailAddress: 'test35@test.com', isActive: 'inactive'},
      {contactID: 36, contactEmailAddress: 'test36@test.com', isActive: 'active'},
      {contactID: 37, contactEmailAddress: 'test37@test.com', isActive: 'active'},
      {contactID: 38, contactEmailAddress: 'test38@test.com', isActive: 'inactive'}, 
      {contactID: 39, contactEmailAddress: 'test39@test.com', isActive: 'active'},
      {contactID: 40, contactEmailAddress: 'test40@test.com', isActive: 'inactive'},
      {contactID: 41, contactEmailAddress: 'test41@test.com', isActive: 'active'},
      {contactID: 42, contactEmailAddress: 'test42@test.com', isActive: 'active'},
      {contactID: 43, contactEmailAddress: 'test43@test.com', isActive: 'inactive'}, 
      {contactID: 44, contactEmailAddress: 'test44@test.com', isActive: 'active'},
      {contactID: 45, contactEmailAddress: 'test45@test.com', isActive: 'inactive'},
      {contactID: 46, contactEmailAddress: 'test46@test.com', isActive: 'active'},
      {contactID: 47, contactEmailAddress: 'test47@test.com', isActive: 'active'},
      {contactID: 48, contactEmailAddress: 'test48@test.com', isActive: 'inactive'}, 
      {contactID: 49, contactEmailAddress: 'test49@test.com', isActive: 'active'},
      {contactID: 50, contactEmailAddress: 'test50@test.com', isActive: 'inactive'},
      {contactID: 51, contactEmailAddress: 'test51@test.com', isActive: 'active'},
      {contactID: 52, contactEmailAddress: 'test52@test.com', isActive: 'active'},
    ]

    if (filter === 'all')
      return of(testData);
    else
      return of(testData.filter(x=>x.isActive.toLowerCase() === filter.toLowerCase()));
  }

  deleteServiceAccount(serviceAccountsData: any, contactID: number, filter:string): Observable<any> {
  // deleteServiceAccount(contactID: number, filter:string): Observable<any> {
    // //TODO: Integrate API call
    // const url = `${environment.appUrls.clientDelivery}DeleteServiceAccount/${contactID}`;
    // return this.callHttpPost(url, 'DeleteServiceAccount', {contactID});

    const index = serviceAccountsData.findIndex((item) => {
      return item.contactID.toString() === contactID.toString();
    });
    serviceAccountsData[index].isActive = 'inactive';

    if (filter === 'all') {
      return of(serviceAccountsData);
    } 
    else {
      const filteredData = serviceAccountsData.filter(x=>x.isActive.toLowerCase() === filter.toLowerCase());
      return of(filteredData);
    }
  }

  addServiceAccount(emailAddress: string): Observable<any> {
    // //TODO: Integrate API call
    // const url = `${environment.appUrls.clientDelivery}AddServiceAccount/${emailAddress}`;
    // return this.callHttpPost(url, 'AddServiceAccount', {emailAddress})

    //reqestion: callHttpDelete?
    return of({contactID: 1000, contactEmailAddress: emailAddress, isActive: 1});
  }

  resetPassword(emailAddress: string): Observable<any> {
    // //TODO: Integrate API call
    // const url = `${environment.appUrls.clientDelivery}ResetPassword/${emailAddress}`;
    // return this.callHttpPost(url, 'ResetPassword', {emailAddress})

    return of(true);
  } 
}
