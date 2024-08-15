import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '@mango/core-shared';
import { HttpClientModule } from '@angular/common/http'; 

import { HeroMetricsContainerModule } from './hero-metrics-container.module';
import { HeroMetricsContainerComponent } from './hero-metrics-container.component';

describe('HeroMetricContainerComponent', () => {
  let component: HeroMetricsContainerComponent;
  let fixture: ComponentFixture<HeroMetricsContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeroMetricsContainerComponent ],
      imports: [ HeroMetricsContainerModule, HttpClientModule ],
      providers: [ DataService ],
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
