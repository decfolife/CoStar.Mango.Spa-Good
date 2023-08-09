import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDashboardAdminComponent } from './user-dashboard-admin.component';

describe('UserDashboardAdminComponent', () => {
  let component: UserDashboardAdminComponent;
  let fixture: ComponentFixture<UserDashboardAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserDashboardAdminComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDashboardAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
