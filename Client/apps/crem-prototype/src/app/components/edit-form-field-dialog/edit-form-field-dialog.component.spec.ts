import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormFieldDialogComponent } from './edit-form-field-dialog.component';

describe('EditFormFieldDialogComponent', () => {
  let component: EditFormFieldDialogComponent;
  let fixture: ComponentFixture<EditFormFieldDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditFormFieldDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormFieldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
