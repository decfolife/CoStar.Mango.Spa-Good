import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskKanbanCardComponent } from './task-kanban-card.component';

describe('TaskKanbanCardComponent', () => {
  let component: TaskKanbanCardComponent;
  let fixture: ComponentFixture<TaskKanbanCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskKanbanCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskKanbanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
