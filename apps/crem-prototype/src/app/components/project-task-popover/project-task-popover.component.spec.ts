import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTaskPopoverComponent } from './project-task-popover.component';

describe('ProjectTaskPopoverComponent', () => {
  let component: ProjectTaskPopoverComponent;
  let fixture: ComponentFixture<ProjectTaskPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectTaskPopoverComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTaskPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
