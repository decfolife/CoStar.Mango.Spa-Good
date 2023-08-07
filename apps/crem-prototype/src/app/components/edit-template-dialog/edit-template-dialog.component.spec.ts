import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTemplateDialogComponent } from './edit-template-dialog.component';

describe('EditTemplateDialogComponent', () => {
  let component: EditTemplateDialogComponent;
  let fixture: ComponentFixture<EditTemplateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditTemplateDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
