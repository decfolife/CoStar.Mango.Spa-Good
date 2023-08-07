import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'mango-alert-chip',
  templateUrl: './alert-chip.component.html',
  styleUrls: ['./alert-chip.component.scss']
})
export class AlertChipComponent {

  @Input() message: string
  @Input('action-text') actionText: string
  @Input('action-handler-name') actionHandlerName: string
  @Input() visible: boolean = false

  constructor() { }
}
