import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CentralAuthFacade } from '../../+state/facades';
import { CentralAuthErrorHandler } from '../../services/error-handler.service';
import { PasswordResetRequestModule } from './password-reset-request.module';
import { PasswordResetRequestComponent } from './password-reset-request.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StorageService } from '@mango/core-shared';
import { Environment } from '@mango/data-models/lib-data-models';
import { environment } from '../../../environments/environment.dev';
import { ReactiveFormsModule } from '@angular/forms';
import { provideRouter } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { CardModule, IconModule } from '@mango/ui-shared/lib-ui-elements';
import { TextFieldModule } from '@mango/ui-shared/cosmos';
import { MatButtonModule } from '@angular/material/button';
import { DxTextBoxModule } from 'devextreme-angular';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('Password Reset Component', () => {
  let component: PasswordResetRequestComponent;
  let fixture: ComponentFixture<PasswordResetRequestComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordResetRequestComponent],
      imports: [HttpClientTestingModule,
        ReactiveFormsModule,
        CardModule,
        TextFieldModule,
        MatButtonModule,
        IconModule,
        MatCardModule,
        DxTextBoxModule
      ],
      providers: [
        CentralAuthErrorHandler,
        CentralAuthFacade,
        StorageService,
        provideRouter([]),
        provideAnimations(),
        { provide: Environment, useValue: environment }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordResetRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});