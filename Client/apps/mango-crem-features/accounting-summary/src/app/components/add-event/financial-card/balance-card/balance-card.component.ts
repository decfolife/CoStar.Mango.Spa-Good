import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { InputComponent, DropdownModule } from '@mango/ui-shared/lib-ui-elements';
import { IconModule } from '@mango/ui-shared/lib-ui-elements';
import { BalanceCardType, CardsConfiguration } from './balance-card';

@Component({
  selector: 'mango-balance-card',
  standalone: true,
  templateUrl: './balance-card.component.html',
  styleUrls: ['./balance-card.component.scss'],
  imports: [
    CommonModule,
    IconModule,
    InputComponent,
    DropdownModule,
  ],
})
export class BalanceCardComponent implements OnInit{

  /**
   * The cards' data
   *
   * @type {BalanceCardsType}
   * @memberof BalanceCardComponent
   */
  @Input() cards: BalanceCardType[];

  /**
   * The Cards presentation configuration
   *
   * @type {CardsConfiguration}
   * @memberof BalanceCardComponent
   */
  @Input() configuration?: CardsConfiguration;
  private defaultCardConfiguration: Partial<BalanceCardType> = {
    valueTarget: 'self',
  }
  @Output() valueChange = new EventEmitter();

  ngOnInit(): void {
    this.cards.forEach(element => {return {...this.defaultCardConfiguration, ...element};});
    this.configuration = { // e.g. 'repeat(auto-fit, minmax(200px, 1fr))'
      gap: 10,
      direction: 'column',
      repeat: 'auto-fit',
      maxWidth: 200,
    };
  }

  valueInputChange(
    value: string | number,
    cardTitle: string,
    elementLabel: string,
    previousValue?: string | number,
  ): void {
    this.valueChange.emit({value: value, cardTitle: cardTitle, elementLabel: elementLabel, previousValue: previousValue});
  }

}
