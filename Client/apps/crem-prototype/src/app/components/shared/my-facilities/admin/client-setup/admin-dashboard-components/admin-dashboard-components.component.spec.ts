import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardComponentsComponent } from './admin-dashboard-components.component';

describe('AdminDashboardComponentsComponent', () => {
  let component: AdminDashboardComponentsComponent;
  let fixture: ComponentFixture<AdminDashboardComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDashboardComponentsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDashboardComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
