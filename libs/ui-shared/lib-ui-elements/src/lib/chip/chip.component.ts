import {Component, Input } from '@angular/core';

export interface Chip {
  env: string;
  clientId: string;
  data:string[];
}
export interface ChipStyle {
  type: 'primary'| 'secondary' | 'tertiary';
  color: 'costar'| 'color-brand-yellow'| 'color-brand-red'| 'color-brand-green'| 'color-neutral-medium' | 'color-brand-primary-light';
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'crem-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {
  withAnimationOptionsVisible: boolean;
  @Input() id: any;
  @Input() width?: string;
  @Input() chipContent: string;
    @Input() popoverContent?: string[];
@Input() chipStyle: ChipStyle;
  constructor() {
    this.withAnimationOptionsVisible = false;
  }

 toggleAnimationOptions($event) {
    this.withAnimationOptionsVisible = !this.withAnimationOptionsVisible;
  }
  // OffWithAnimationOptions() {
  //   this.withAnimationOptionsVisible = false;
  // }
}
