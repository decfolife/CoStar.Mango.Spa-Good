import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksSettingsComponent } from './tasks-settings.component';

describe('TasksSettingsComponent', () => {
  let component: TasksSettingsComponent;
  let fixture: ComponentFixture<TasksSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TasksSettingsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
