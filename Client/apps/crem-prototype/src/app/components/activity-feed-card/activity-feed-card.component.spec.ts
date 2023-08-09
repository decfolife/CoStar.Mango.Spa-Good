import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityFeedCardComponent } from './activity-feed-card.component';

describe('ActivityFeedCardComponent', () => {
  let component: ActivityFeedCardComponent;
  let fixture: ComponentFixture<ActivityFeedCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityFeedCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityFeedCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
