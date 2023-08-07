import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTemplateComponent } from './team-template.component';

describe('TeamTemplateComponent', () => {
  let component: TeamTemplateComponent;
  let fixture: ComponentFixture<TeamTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TeamTemplateComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
