import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormItemMaintenanceComponent } from './form-item-maintenance.component';

describe('FormItemMaintenanceComponent', () => {
  let component: FormItemMaintenanceComponent;
  let fixture: ComponentFixture<FormItemMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormItemMaintenanceComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormItemMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
