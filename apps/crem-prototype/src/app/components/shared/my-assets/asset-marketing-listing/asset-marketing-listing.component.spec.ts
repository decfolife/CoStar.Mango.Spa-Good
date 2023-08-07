import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMarketingListingComponent } from './asset-marketing-listing.component';

describe('AssetMarketingListingComponent', () => {
  let component: AssetMarketingListingComponent;
  let fixture: ComponentFixture<AssetMarketingListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetMarketingListingComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMarketingListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
