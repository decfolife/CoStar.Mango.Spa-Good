import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorNotificationComponent } from './error-notification.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('ErrorNotificationComponent', () => {
  let component: ErrorNotificationComponent;
  let fixture: ComponentFixture<ErrorNotificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorNotificationComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(ErrorNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
