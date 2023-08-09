import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginMastheadComponent } from './login-masthead.component';

describe('LoginMastheadComponent', () => {
  let component: LoginMastheadComponent;
  let fixture: ComponentFixture<LoginMastheadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginMastheadComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginMastheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
