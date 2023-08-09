import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCountByMarketCardComponent } from './deal-count-by-market-card.component';

describe('DealCountByMarketCardComponent', () => {
  let component: DealCountByMarketCardComponent;
  let fixture: ComponentFixture<DealCountByMarketCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DealCountByMarketCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCountByMarketCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
