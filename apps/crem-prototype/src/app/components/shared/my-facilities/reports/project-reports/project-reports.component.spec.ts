import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectReportsComponent } from './project-reports.component';

describe('ProjectReportsComponent', () => {
  let component: ProjectReportsComponent;
  let fixture: ComponentFixture<ProjectReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectReportsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
