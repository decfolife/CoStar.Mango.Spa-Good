import {Component, Input } from '@angular/core';



@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'cs-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {
  withAnimationOptionsVisible: boolean;

  @Input() id: any ;
  maxWidth?: string;
  @Input() chipContent: string;
  @Input() matTooltipContent?: string;
   matTooltipClass : string;
  // eslint-disable-next-line max-len
  // eslint-disable-next-line max-len
  @Input() chipStatus: string;
  chipColor: string;
  constructor() {
    this.withAnimationOptionsVisible = false;

  }
 toggleAnimationOptions() {
    this.withAnimationOptionsVisible = !this.withAnimationOptionsVisible;
  }

ngOnInit(){
  if(this.chipStatus === 'costar'){
    this.chipColor = 'color-brand-primary'
  }
  else if(this.chipStatus=== 'completeStatus'){
    this.chipColor = 'color-neutral-medium'
  }
  else if(this.chipStatus === 'upcomingStatus'){
    this.chipColor= 'color-brand-primary-light'
  }
  else if(this.chipStatus === 'overdueStatus'){
    this.chipColor = 'color-brand-red';

  }
  else if (this.chipStatus==='activeStatus'){
    this.chipColor = 'color-brand-green'
  }
  else if ( this.chipStatus=== 'daysStatus'){
    this.chipColor = 'color-brand-yellow';
  }
}

  // OffWithAnimationOptions() {
  //   this.withAnimationOptionsVisible = false;
  // }
}
