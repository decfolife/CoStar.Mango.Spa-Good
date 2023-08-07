import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealCountChartCardComponent } from './deal-count-chart-card.component';

describe('DealCountChartCardComponent', () => {
  let component: DealCountChartCardComponent;
  let fixture: ComponentFixture<DealCountChartCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DealCountChartCardComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealCountChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
