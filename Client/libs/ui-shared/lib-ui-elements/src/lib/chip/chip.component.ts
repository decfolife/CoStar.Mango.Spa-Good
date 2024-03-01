import { Component, Input } from '@angular/core';

@Component({
  selector: 'crem-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {
  withAnimationOptionsVisible: boolean;

  @Input() id: any;
  maxWidth?: string;
  @Input() chipContent: string;
  @Input() matTooltipContent?: string;
  matTooltipClass: string;
  @Input() chipStatus: string;
  chipColor: string;
  constructor() {
    this.withAnimationOptionsVisible = false;

  }
  toggleAnimationOptions() {
    this.withAnimationOptionsVisible = !this.withAnimationOptionsVisible;
  }

  ngOnInit() {

    switch(this.chipStatus) {
      case 'costar':
        this.chipColor = 'color-brand-primary';
        break;
      case 'completeStatus':
        this.chipColor = 'color-neutral-medium';
        break;
      case 'upcomingStatus':
        this.chipColor = 'color-brand-primary-light';
        break;
      case 'overdueStatus':
        this.chipColor = 'color-brand-red';
        break;
      case 'activeStatus':
        this.chipColor = 'color-brand-green';
        break;
      case 'daysStatus':
        this.chipColor = 'color-brand-yellow';
        break;
    }
    
  }

}
