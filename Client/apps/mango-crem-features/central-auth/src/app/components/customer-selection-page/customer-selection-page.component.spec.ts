import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { CentralAuthFacade } from '../../+state/facades';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { CustomerSelectionPageComponent } from './customer-selection-page.component';

describe('Customer Selection Component', () => {
  let component: CustomerSelectionPageComponent;
  let fixture: ComponentFixture<CustomerSelectionPageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CustomerSelectionPageComponent],
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
    fixture = TestBed.createComponent(CustomerSelectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
