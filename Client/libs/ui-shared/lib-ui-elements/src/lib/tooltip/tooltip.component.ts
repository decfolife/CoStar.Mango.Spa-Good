import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'crem-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class TooltipComponent implements OnInit {
  // Upon component consumption, the below data object will be your only required Input, structured by the data types popover and history interfaces above
  tooltipId: string;
  tooltipTriggerId: string;
  tooltipPopoverTarget: string;

  @Input() helpTextData: string;
  @Input() externalId: string;
  @Input() helpTextDataIsHtml: boolean = false;
  color = 'gray';
  type = 'text';
  @ViewChild('helpText') helpText!: ElementRef;

  disabled = false;

  withAnimationOptionsVisible: boolean;

  ngOnInit() {
    this.tooltipId = this.externalId + 'Tooltip';
    this.tooltipTriggerId = 't' + this.externalId + 'Tooltip' + 'Trigger';
    this.tooltipPopoverTarget = '#' + this.tooltipTriggerId;
  }

  getHelpText() {
    this.withAnimationOptionsVisible = !this.withAnimationOptionsVisible;
  }

  onKeyDownEvent(e: KeyboardEvent) {
    if (e.key == 'Enter' || e.key == ' ' || e.key === 'Tab') {
      this.withAnimationOptionsVisible = false;
    }
  }

  onHiddenEvent() {
    const tooltipIcon = document.getElementById(
      this.tooltipTriggerId
    ).firstChild;
    (tooltipIcon as HTMLElement).focus();
  }

  // This method insures the screen reader reads the helptext
  onShownHandler() {
    if (!!this.helpText) {
      this.helpText.nativeElement.focus();
    }
  }
}
