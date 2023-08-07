import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsMarketingImpressionsComponent } from './assets-marketing-impressions.component';

describe('AssetsMarketingImpressionsComponent', () => {
  let component: AssetsMarketingImpressionsComponent;
  let fixture: ComponentFixture<AssetsMarketingImpressionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsMarketingImpressionsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsMarketingImpressionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
