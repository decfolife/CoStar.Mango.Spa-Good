import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectKanbanCardComponent } from './project-kanban-card.component';

describe('ProjectKanbanCardComponent', () => {
  let component: ProjectKanbanCardComponent;
  let fixture: ComponentFixture<ProjectKanbanCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectKanbanCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectKanbanCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
