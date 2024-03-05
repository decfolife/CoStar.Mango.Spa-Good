import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormEditSectionDialogComponent } from './dynamic-form-edit-section-dialog.component';

describe('DynamicFormEditSectionDialogComponent', () => {
  let component: DynamicFormEditSectionDialogComponent;
  let fixture: ComponentFixture<DynamicFormEditSectionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicFormEditSectionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicFormEditSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
