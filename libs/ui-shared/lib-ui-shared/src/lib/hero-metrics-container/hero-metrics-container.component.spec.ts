import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroMetricsContainerComponent } from './hero-metrics-container.component';

describe('HeroMetricContainerComponent', () => {
  let component: HeroMetricsContainerComponent;
  let fixture: ComponentFixture<HeroMetricsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroMetricsContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroMetricsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
