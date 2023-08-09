import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsValuationComponent } from './assets-valuation.component';

describe('AssetsValuationComponent', () => {
  let component: AssetsValuationComponent;
  let fixture: ComponentFixture<AssetsValuationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetsValuationComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetsValuationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
