import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectRemindersComponent } from './object-reminders.component';

describe('ObjectRemindersComponent', () => {
  let component: ObjectRemindersComponent;
  let fixture: ComponentFixture<ObjectRemindersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ObjectRemindersComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObjectRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
