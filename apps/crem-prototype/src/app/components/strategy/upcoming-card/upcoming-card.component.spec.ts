import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyUpcomingCardComponent } from './upcoming-card.component';

describe('StrategyUpcomingCardComponent', () => {
  let component: StrategyUpcomingCardComponent;
  let fixture: ComponentFixture<StrategyUpcomingCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StrategyUpcomingCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyUpcomingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
