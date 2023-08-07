import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMaintenanceComponent } from './form-maintenance.component';

describe('FormMaintenanceComponent', () => {
  let component: FormMaintenanceComponent;
  let fixture: ComponentFixture<FormMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormMaintenanceComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
