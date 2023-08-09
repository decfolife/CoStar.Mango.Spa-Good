import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMarketingPerformanceComponent } from './asset-marketing-performance.component';

describe('AssetMarketingPerformanceComponent', () => {
  let component: AssetMarketingPerformanceComponent;
  let fixture: ComponentFixture<AssetMarketingPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetMarketingPerformanceComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMarketingPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
