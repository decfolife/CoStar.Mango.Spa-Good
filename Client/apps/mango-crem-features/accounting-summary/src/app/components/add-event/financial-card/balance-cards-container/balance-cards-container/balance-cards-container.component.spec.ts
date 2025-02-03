import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceCardsContainerComponent } from './balance-cards-container.component';

describe('BalanceCardsContainerComponent', () => {
  let component: BalanceCardsContainerComponent;
  let fixture: ComponentFixture<BalanceCardsContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BalanceCardsContainerComponent],
    });
    fixture = TestBed.createComponent(BalanceCardsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
