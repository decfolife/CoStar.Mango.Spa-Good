import { Component, Input } from '@angular/core';

@Component({
  selector: 'crem-vertical-stepper',
  templateUrl: './vertical-stepper.component.html',
  styleUrls: ['./vertical-stepper.component.scss'],
})

export class VerticalStepperComponent {

  @Input() display: string;
  @Input() showBorder = true;
  @Input() hideStepper = false;
  
}