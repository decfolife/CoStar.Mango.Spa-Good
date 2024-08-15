import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskNoteComponent } from './add-task-note.component';

describe('AddTaskNoteComponent', () => {
  let component: AddTaskNoteComponent;
  let fixture: ComponentFixture<AddTaskNoteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskNoteComponent]
    });
    fixture = TestBed.createComponent(AddTaskNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
