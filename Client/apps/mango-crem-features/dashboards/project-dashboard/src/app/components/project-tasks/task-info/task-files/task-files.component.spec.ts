import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskFilesComponent } from './task-files.component';

describe('TaskFilesComponent', () => {
  let component: TaskFilesComponent;
  let fixture: ComponentFixture<TaskFilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskFilesComponent]
    });
    fixture = TestBed.createComponent(TaskFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
