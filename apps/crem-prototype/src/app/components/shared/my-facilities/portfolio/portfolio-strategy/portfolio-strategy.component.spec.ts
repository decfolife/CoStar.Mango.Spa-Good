import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioStrategyComponent } from './portfolio-strategy.component';

describe('PortfolioStrategyComponent', () => {
  let component: PortfolioStrategyComponent;
  let fixture: ComponentFixture<PortfolioStrategyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioStrategyComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioStrategyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
