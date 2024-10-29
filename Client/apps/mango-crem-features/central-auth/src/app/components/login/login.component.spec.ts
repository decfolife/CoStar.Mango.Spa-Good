import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { provideRouter } from '@angular/router';
import { CentralAuthFacade } from '../../+state/facades';
import { provideStore } from '@ngrx/store';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('Login Component', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        CentralAuthErrorHandler,
        CentralAuthFacade,
        provideStore(),
        provideRouter([]),
        provideAnimations(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
