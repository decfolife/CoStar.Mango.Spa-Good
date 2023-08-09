import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsMarketingHomeComponent } from './assets-marketing-home.component';

describe('AssetsMarketingHomeComponent', () => {
  let component: AssetsMarketingHomeComponent;
  let fixture: ComponentFixture<AssetsMarketingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsMarketingHomeComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsMarketingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
