import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksDueSoonCardComponent } from './tasks-due-soon-card.component';

describe('TasksDueSoonCardComponent', () => {
  let component: TasksDueSoonCardComponent;
  let fixture: ComponentFixture<TasksDueSoonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksDueSoonCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksDueSoonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
