import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormEditFieldDialogComponent } from './dynamic-form-edit-field-dialog.component';

describe('DynamicFormEditFieldDialogComponent', () => {
  let component: DynamicFormEditFieldDialogComponent;
  let fixture: ComponentFixture<DynamicFormEditFieldDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormEditFieldDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormEditFieldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
