// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { NO_ERRORS_SCHEMA } from '@angular/core';
// import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
// import { SharedModule } from '../../../shared/shared.module';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule } from '@angular/common/http';
// import { LocalStoreManagerService } from '../../../../dataconnector/core/services/local-store-manager.service';
// import { LoggerService } from '../../../../dataconnector/core/services/logger.service';
// import { DataService } from '../../../../dataconnector/core/services/data.service';
// import { CustomerSelectionListComponent } from './customer-selection-list.component';
// import { Observable } from 'rxjs/Observable';
// import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
// import { CustomerSelectionModalService } from '../../shared/modals/customer-selection/customer-selection-modal.service';
// import { By } from '@angular/platform-browser';

// describe('CustomerSelectionListComponent', () => {

//     let component: CustomerSelectionListComponent;
//     let fixture: ComponentFixture<CustomerSelectionListComponent>;

//     const testData = [
//             {
//                 databaseId: 1,
//                 name: 'RetailDemo',
//                 databaseName: 'VP_RetailDemo_V05',
//                 vpDocumentsPath: 'C:/fs/dev/vpdocuments/',
//                 isActive: true
//             },
//             {
//                 databaseId: 2,
//                 name: 'Blank',
//                 databaseName: 'VP_BLANK_V05',
//                 vpDocumentsPath: 'C:/fs/dev/vpdocuments/',
//                 isActive: true
//             },
//         ];

//     class DataServiceStub {
//         getAllCustomersEndpoint() {
//             return Observable.of(testData);
//         }
//     }

//     const router = {
//         navigate: jasmine.createSpy('navigate'),
//         navigateByUrl: jasmine.createSpy('navigateByUrl'),
//         events: Observable.of(new NavigationEnd(0, '/', '/')),
//     };
//     const activatedRouteStub = {
//         params: Observable.of({ path: 'customer-selection' })
//     };
//     const modal = {
//         openDialog: jasmine.createSpy('openDialog'),
//         closeDialog: jasmine.createSpy('closeDialog'),
//     };

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports: [SharedModule, BrowserAnimationsModule, HttpClientModule],
//             declarations: [CustomerSelectionListComponent],
//             schemas: [NO_ERRORS_SCHEMA],
//             providers: [LoggerService, LocalStoreManagerService
//                 , { provide: DataService, useValue: new DataServiceStub() }
//                 , { provide: Router, useValue: router }
//                 , { provide: ActivatedRoute, useValue: activatedRouteStub }
//                 , { provide: CustomerSelectionModalService, useValue: modal }
//                 , { provide: MatDialogRef, useValue: {} } // close: (dialogResult: any) => { }
//                 , { provide: MAT_DIALOG_DATA, useValue: {} }
//             ]
//         })
//         .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(CustomerSelectionListComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     // it('should find all in drop down', async(async () => {
//     //     const trigger = fixture.debugElement.query(By.css('.mat-select-trigger')).nativeElement;
//     //     trigger.click();
//     //     fixture.detectChanges();
//     //     await fixture.whenStable().then(() => {
//     //         const inquiryOptions = fixture.debugElement.queryAll(By.css('.mat-option-text'));
//     //         expect(inquiryOptions.length).toEqual(2);
//     //     });
//     // }));

//   });
