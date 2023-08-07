import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTimelinesCardComponent } from './project-timelines-card.component';

describe('ProjectTimelinesCardComponent', () => {
  let component: ProjectTimelinesCardComponent;
  let fixture: ComponentFixture<ProjectTimelinesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectTimelinesCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTimelinesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
