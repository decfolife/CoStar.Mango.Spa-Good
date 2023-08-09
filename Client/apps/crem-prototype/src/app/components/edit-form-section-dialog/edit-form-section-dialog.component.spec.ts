import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFormSectionDialogComponent } from './edit-form-section-dialog.component';

describe('EditFormSectionDialogComponent', () => {
  let component: EditFormSectionDialogComponent;
  let fixture: ComponentFixture<EditFormSectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditFormSectionDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFormSectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
