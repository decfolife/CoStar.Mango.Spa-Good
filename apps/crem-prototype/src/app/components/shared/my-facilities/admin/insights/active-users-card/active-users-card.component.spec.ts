import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveUsersCardComponent } from './active-users-card.component';

describe('ActiveUsersCardComponent', () => {
  let component: ActiveUsersCardComponent;
  let fixture: ComponentFixture<ActiveUsersCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActiveUsersCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveUsersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
