import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { CentralAuthFacade } from '../../+state/facades';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { ContactRecordsPopupComponent } from './contact-records-popup.component';

describe('Contact Record Component', () => {
  let component: ContactRecordsPopupComponent;
  let fixture: ComponentFixture<ContactRecordsPopupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ContactRecordsPopupComponent],
      providers: [
        CentralAuthErrorHandler,
        CentralAuthFacade,
        provideMockStore(),
        provideRouter([]),
        provideAnimations(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactRecordsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
