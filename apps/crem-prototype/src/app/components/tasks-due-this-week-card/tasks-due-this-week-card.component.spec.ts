import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDueThisWeekCardComponent } from './tasks-due-this-week-card.component';

describe('TasksDueThisWeekCardComponent', () => {
  let component: TasksDueThisWeekCardComponent;
  let fixture: ComponentFixture<TasksDueThisWeekCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksDueThisWeekCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDueThisWeekCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
