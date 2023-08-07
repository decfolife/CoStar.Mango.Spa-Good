import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTasksCardComponent } from './new-tasks-card.component';

describe('NewTasksCardComponent', () => {
  let component: NewTasksCardComponent;
  let fixture: ComponentFixture<NewTasksCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewTasksCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTasksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
