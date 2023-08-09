import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityChannelComponent } from './activity-channel.component';

describe('ActivityChannelComponent', () => {
  let component: ActivityChannelComponent;
  let fixture: ComponentFixture<ActivityChannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ActivityChannelComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
