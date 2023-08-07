import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { HeroMetricComponent } from './hero-metric.component';

describe('HeroMetricComponent', () => {
  let component: HeroMetricComponent;
  let fixture: ComponentFixture<HeroMetricComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [HeroMetricComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
