import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExchangeRateSetsComponent } from './exchange-rate-sets.component';

describe('ExchangeRateSets', () => {
  let component: ExchangeRateSetsComponent;
  let fixture: ComponentFixture<ExchangeRateSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExchangeRateSetsComponent],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExchangeRateSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
