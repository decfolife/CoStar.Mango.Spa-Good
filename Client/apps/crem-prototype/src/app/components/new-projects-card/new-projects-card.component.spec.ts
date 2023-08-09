import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProjectsCardComponent } from './new-projects-card.component';

describe('NewProjectsCardComponent', () => {
  let component: NewProjectsCardComponent;
  let fixture: ComponentFixture<NewProjectsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewProjectsCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewProjectsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
