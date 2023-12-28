import { Component, ElementRef, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'crem-tooltip-basic',
  templateUrl: './tooltip-basic.component.html',
  styleUrls: ['./tooltip-basic.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TooltipBasicComponent implements OnInit {
  // Upon component consumption, the below data object will be your only required Input, structured by the data types popover and history interfaces above
  tooltipId: string;
  @Input() helpTextData: string;
  @Input() externalId: string;
  color = 'gray';
  type = 'text';
  @ViewChild('helpText') helpText!: ElementRef;

  disabled = false;

  withAnimationOptionsVisible: boolean;
  constructor() {}

  ngOnInit() {
    this.tooltipId = this.externalId;
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        // code to hide help text
        this.withAnimationOptionsVisible = false;
      }
    });
  }

  getHelpText() {
    this.withAnimationOptionsVisible = !this.withAnimationOptionsVisible;
  }

  // This method insures the screen reader readers the helptext
  onShownHandler(e) {
    this.helpText.nativeElement.focus();
  }
}
