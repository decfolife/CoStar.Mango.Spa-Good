import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastNoteDialogComponent } from './last-note-dialog.component';

describe('LastNoteDialogComponent', () => {
  let component: LastNoteDialogComponent;
  let fixture: ComponentFixture<LastNoteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LastNoteDialogComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastNoteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
