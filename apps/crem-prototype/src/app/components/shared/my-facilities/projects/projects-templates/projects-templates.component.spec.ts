import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsTemplatesComponent } from './projects-templates.component';

describe('ProjectsTemplatesComponent', () => {
  let component: ProjectsTemplatesComponent;
  let fixture: ComponentFixture<ProjectsTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsTemplatesComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
