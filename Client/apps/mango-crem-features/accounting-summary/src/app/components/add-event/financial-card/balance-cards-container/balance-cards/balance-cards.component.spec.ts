import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCardsComponent } from './balance-cards.component';

describe('BalanceCardsComponent', () => {
  let component: BalanceCardsComponent;
  let fixture: ComponentFixture<BalanceCardsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BalanceCardsComponent],
    });
    fixture = TestBed.createComponent(BalanceCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
