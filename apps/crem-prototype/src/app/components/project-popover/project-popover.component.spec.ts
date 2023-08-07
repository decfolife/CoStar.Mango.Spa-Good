import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPopoverComponent } from './project-popover.component';

describe('ProjectPopoverComponent', () => {
  let component: ProjectPopoverComponent;
  let fixture: ComponentFixture<ProjectPopoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectPopoverComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
