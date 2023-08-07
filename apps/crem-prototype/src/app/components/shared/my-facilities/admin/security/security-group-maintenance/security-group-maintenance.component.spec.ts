import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityGroupMaintenanceComponent } from './security-group-maintenance.component';

describe('SecurityGroupMaintenanceComponent', () => {
  let component: SecurityGroupMaintenanceComponent;
  let fixture: ComponentFixture<SecurityGroupMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityGroupMaintenanceComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityGroupMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
