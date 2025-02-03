import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckBoxComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/checkbox';

@Component({
  selector: 'mango-balance-cards',
  standalone: true,
  imports: [CommonModule, CheckBoxComponent],
  templateUrl: './balance-cards.component.html',
  styleUrls: ['./balance-cards.component.scss'],
})
export class BalanceCardsComponent {
  @Input() title!: string;
  @Input() amount = 0;
  @Input() currency = 'USD';
  @Input() customHeader: false; // Flag to toggle between custom header and showing amount only

  /**
   * @param base - The base string (e.g., title).
   * @param suffix - The suffix to append to the ID.
   * @returns The formatted ID.
   */
  generateId(base: string, suffix: string): string {
    if (!base) {
      return suffix;
    }
    return `${base.replace(/\s+/g, '-').toLowerCase()}-${suffix}`;
  }
}
