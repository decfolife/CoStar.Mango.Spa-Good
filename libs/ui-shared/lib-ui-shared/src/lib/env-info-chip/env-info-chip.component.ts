import { Component, ElementRef, Input, OnInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

export interface EnvInfoChip {
  env: string;
  clientId: string;
  data: string[];
}
export interface EnvInfoChipStyle {
  type: string;
  color: string;
}
export enum Type { 'primary', 'secondary', 'tertiary' };
export enum Color { 'costar', 'error' };

@Component({
  selector: 'crem-env-info-chip',
  templateUrl: './env-info-chip.component.html',
  styleUrls: ['./env-info-chip.component.scss']
})
export class EnvInfoChipComponent implements OnInit {
  withAnimationOptionsVisible: boolean;
  @Input() id: any;
  @Input() width: string;
  @Input() chipContent: string;
  @Input() popoverContent: string[];
  @Input() chipStyle: EnvInfoChipStyle;
  @Input() withPopup: boolean = true;
  @Input() actionText: string;
  @Input() actionHandlerWindowFunction: string;
  @Input() closable: boolean = false;

  constructor(private elementRef: ElementRef) {
    this.withAnimationOptionsVisible = false;
  }

  ngOnInit(): void {
    this.chipStyle = {
      type: 'secondary',
      color: 'costar',
    }
  }

  toggleAnimationOptions($event): void {
    this.withAnimationOptionsVisible = !this.withAnimationOptionsVisible;
  }

  handleAction(): void {
    (window[this.actionHandlerWindowFunction] || function () { })()
  }

  closeChip() {
    this.elementRef.nativeElement.remove()
  }
}
