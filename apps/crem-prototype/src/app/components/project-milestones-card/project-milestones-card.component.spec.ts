import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMilestonesCardComponent } from './project-milestones-card.component';

describe('ProjectMilestonesCardComponent', () => {
  let component: ProjectMilestonesCardComponent;
  let fixture: ComponentFixture<ProjectMilestonesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectMilestonesCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMilestonesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
