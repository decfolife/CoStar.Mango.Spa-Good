import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanTasksTemplateComponent } from './kanban-tasks-template.component';

describe('KanbanTasksTemplateComponent', () => {
  let component: KanbanTasksTemplateComponent;
  let fixture: ComponentFixture<KanbanTasksTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [KanbanTasksTemplateComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanTasksTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
