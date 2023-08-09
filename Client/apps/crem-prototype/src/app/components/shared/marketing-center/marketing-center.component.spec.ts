import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingCenterComponent } from './marketing-center.component';

describe('MarketingCenterComponent', () => {
  let component: MarketingCenterComponent;
  let fixture: ComponentFixture<MarketingCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MarketingCenterComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketingCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
