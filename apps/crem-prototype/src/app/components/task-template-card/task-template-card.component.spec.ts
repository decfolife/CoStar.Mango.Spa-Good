import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskTemplateCardComponent } from './task-template-card.component';

describe('TaskTemplateCardComponent', () => {
  let component: TaskTemplateCardComponent;
  let fixture: ComponentFixture<TaskTemplateCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskTemplateCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskTemplateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
