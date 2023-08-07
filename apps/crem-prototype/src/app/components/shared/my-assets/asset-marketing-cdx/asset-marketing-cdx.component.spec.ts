import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMarketingCdxComponent } from './asset-marketing-cdx.component';

describe('AssetMarketingCdxComponent', () => {
  let component: AssetMarketingCdxComponent;
  let fixture: ComponentFixture<AssetMarketingCdxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetMarketingCdxComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMarketingCdxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
