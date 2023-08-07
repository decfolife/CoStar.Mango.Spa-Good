import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLeftNavDialogComponent } from './edit-left-nav-dialog.component';

describe('EditLeftNavDialogComponent', () => {
  let component: EditLeftNavDialogComponent;
  let fixture: ComponentFixture<EditLeftNavDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditLeftNavDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLeftNavDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
