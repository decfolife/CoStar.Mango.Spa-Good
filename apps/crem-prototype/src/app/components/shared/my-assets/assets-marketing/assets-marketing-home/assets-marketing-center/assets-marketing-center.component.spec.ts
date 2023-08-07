import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsMarketingCenterComponent } from './assets-marketing-center.component';

describe('AssetsMarketingCenterComponent', () => {
  let component: AssetsMarketingCenterComponent;
  let fixture: ComponentFixture<AssetsMarketingCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsMarketingCenterComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsMarketingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
