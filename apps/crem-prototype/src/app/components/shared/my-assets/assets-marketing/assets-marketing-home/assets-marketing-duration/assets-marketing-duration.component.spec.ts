import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsMarketingDurationComponent } from './assets-marketing-duration.component';

describe('AssetsMarketingDurationComponent', () => {
  let component: AssetsMarketingDurationComponent;
  let fixture: ComponentFixture<AssetsMarketingDurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsMarketingDurationComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsMarketingDurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
