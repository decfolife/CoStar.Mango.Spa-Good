import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentDealActivityCardComponent } from './recent-deal-activity-card.component';

describe('RecentDealActivityCardComponent', () => {
  let component: RecentDealActivityCardComponent;
  let fixture: ComponentFixture<RecentDealActivityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RecentDealActivityCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentDealActivityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
