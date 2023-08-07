import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmortizationProfileListComponent } from './amortization-profile-list.component';

describe('AmortizationProfileListComponent', () => {
  let component: AmortizationProfileListComponent;
  let fixture: ComponentFixture<AmortizationProfileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AmortizationProfileListComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmortizationProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
