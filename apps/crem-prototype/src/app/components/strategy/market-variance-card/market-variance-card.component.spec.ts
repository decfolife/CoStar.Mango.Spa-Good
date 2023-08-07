import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyMarketVarianceCardComponent } from './market-variance-card.component';

describe('StrategyMarketVarianceCardComponent', () => {
  let component: StrategyMarketVarianceCardComponent;
  let fixture: ComponentFixture<StrategyMarketVarianceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StrategyMarketVarianceCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyMarketVarianceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
