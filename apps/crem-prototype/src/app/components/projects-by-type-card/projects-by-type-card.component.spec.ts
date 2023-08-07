import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsByTypeCardComponent } from './projects-by-type-card.component';

describe('ProjectsByTypeCardComponent', () => {
  let component: ProjectsByTypeCardComponent;
  let fixture: ComponentFixture<ProjectsByTypeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProjectsByTypeCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsByTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
