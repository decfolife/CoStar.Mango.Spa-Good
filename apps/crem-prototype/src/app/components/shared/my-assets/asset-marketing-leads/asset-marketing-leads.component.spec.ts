import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetMarketingLeadsComponent } from './asset-marketing-leads.component';

describe('AssetMarketingLeadsComponent', () => {
  let component: AssetMarketingLeadsComponent;
  let fixture: ComponentFixture<AssetMarketingLeadsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetMarketingLeadsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetMarketingLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
