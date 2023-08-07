import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSectionMaintenanceComponent } from './form-section-maintenance.component';

describe('FormSectionMaintenanceComponent', () => {
  let component: FormSectionMaintenanceComponent;
  let fixture: ComponentFixture<FormSectionMaintenanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormSectionMaintenanceComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormSectionMaintenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
