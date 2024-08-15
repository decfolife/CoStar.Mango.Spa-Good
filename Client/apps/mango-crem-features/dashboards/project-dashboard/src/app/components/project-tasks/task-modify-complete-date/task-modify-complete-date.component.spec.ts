import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskModifyCompleteDateComponent } from './task-modify-complete-date.component';

describe('TaskModifyCompleteDateComponent', () => {
  let component: TaskModifyCompleteDateComponent;
  let fixture: ComponentFixture<TaskModifyCompleteDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskModifyCompleteDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskModifyCompleteDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
