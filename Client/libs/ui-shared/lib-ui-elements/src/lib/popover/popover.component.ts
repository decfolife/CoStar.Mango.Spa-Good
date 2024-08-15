
import { Component, ElementRef, Input, ViewChild, HostListener } from '@angular/core';
import { DxPopoverComponent } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { LibDataModelsModule } from '@mango/data-models/lib-data-models';
import { DxValidatorModule } from 'devextreme-angular/ui/validator';
import { DxPopoverModule } from 'devextreme-angular/ui/popover';


@Component({
  selector: 'crem-popover',
  standalone: true,
  imports: [
    CommonModule,
    LibDataModelsModule,
    DxPopoverModule,
    DxValidatorModule
  ],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})

export class CremPopoverComponent {
  @Input() showCloseButton = true;
  @Input() isDragEnabled = false;
  @Input() hideOnOutsideClick = false;
  @Input() onMouseEvent: 'click' | 'mouseenter' = 'click'
  @Input() hideEvent: 'mouseleave' | ' ' = ' '
  @Input() width = "300";
  @Input() height = "200";
  @Input() arrowPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';
  @Input() popoverId: string;
  @Input() toolTipData: string;
  @Input() targetId: string;
  @Input() popupAriaLabel: string;
  @Input() getTitle: string;

  @ViewChild(DxPopoverComponent, { static: false }) popover: DxPopoverComponent;
  @ViewChild('toolTip') toolTip!: ElementRef;

  onShownHandler() {
    this.toolTip.nativeElement.focus();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    if (event.key === 'Escape' || event.key === 'Esc') {
      this.closePopover();
    }
  }

  closePopover() {
    if (this.popover) {
      this.popover.visible = false;
    }
  }

}


