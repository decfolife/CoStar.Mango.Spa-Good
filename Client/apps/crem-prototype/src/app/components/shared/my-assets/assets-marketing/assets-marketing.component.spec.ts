import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsMarketingComponent } from './assets-marketing.component';

describe('AssetsMarketingComponent', () => {
  let component: AssetsMarketingComponent;
  let fixture: ComponentFixture<AssetsMarketingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsMarketingComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsMarketingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
