import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsMarketsComponent } from './assets-markets.component';

describe('AssetsMarketsComponent', () => {
  let component: AssetsMarketsComponent;
  let fixture: ComponentFixture<AssetsMarketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsMarketsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
