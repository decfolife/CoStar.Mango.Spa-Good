import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTeamsComponent } from './projects-teams.component';

describe('ProjectsTeamsComponent', () => {
  let component: ProjectsTeamsComponent;
  let fixture: ComponentFixture<ProjectsTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsTeamsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
