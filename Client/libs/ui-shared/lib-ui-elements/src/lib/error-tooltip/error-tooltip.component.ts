import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { IconModule } from '../icon';
import { DxTooltipModule } from 'devextreme-angular';

@Component({
  selector: 'crem-error-tooltip',
  templateUrl: './error-tooltip.component.html',
  standalone: true,
  imports: [CommonModule, IconModule, DxTooltipModule],
  styleUrls: ['./error-tooltip.component.scss'],
})
export class ErrorTooltipComponent implements OnInit {
  @Input() status: any;
  @Input({ required: true }) message: string = '';

  isHovered: boolean = false;
  targetElement: Element;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.targetElement = this.el.nativeElement;
  }
}
