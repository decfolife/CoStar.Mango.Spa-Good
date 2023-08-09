import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationComponent } from './amortization.component';

describe('AmortizationComponent', () => {
  let component: AmortizationComponent;
  let fixture: ComponentFixture<AmortizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmortizationComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmortizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
