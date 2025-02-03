import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormAssociateComponent } from './dynamic-form-associate.component';

describe('DynamicFormAssociateComponent', () => {
  let component: DynamicFormAssociateComponent;
  let fixture: ComponentFixture<DynamicFormAssociateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DynamicFormAssociateComponent],
    });
    fixture = TestBed.createComponent(DynamicFormAssociateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
