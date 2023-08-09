import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsMarketingDetailViewsComponent } from './assets-marketing-detail-views.component';

describe('AssetsMarketingDetailViewsComponent', () => {
  let component: AssetsMarketingDetailViewsComponent;
  let fixture: ComponentFixture<AssetsMarketingDetailViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsMarketingDetailViewsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsMarketingDetailViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
