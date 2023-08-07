import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignTagsDialogComponent } from './assign-tags-dialog.component';

describe('AssignTagsDialogComponent', () => {
  let component: AssignTagsDialogComponent;
  let fixture: ComponentFixture<AssignTagsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssignTagsDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignTagsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
