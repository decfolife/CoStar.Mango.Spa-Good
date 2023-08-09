import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFilesPopoverComponent } from './project-files-popover.component';

describe('ProjectFilesPopoverComponent', () => {
  let component: ProjectFilesPopoverComponent;
  let fixture: ComponentFixture<ProjectFilesPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectFilesPopoverComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectFilesPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
