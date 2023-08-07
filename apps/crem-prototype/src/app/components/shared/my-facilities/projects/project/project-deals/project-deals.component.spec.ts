import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDealsComponent } from './project-deals.component';

describe('ProjectDealsComponent', () => {
  let component: ProjectDealsComponent;
  let fixture: ComponentFixture<ProjectDealsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectDealsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDealsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
