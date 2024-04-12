import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonGroupItem } from '@mango/data-models/lib-data-models';
import { DxButtonGroupModule } from 'devextreme-angular';

@Component({
  selector: 'crem-button-group',
  standalone: true,
  imports: [CommonModule, DxButtonGroupModule],
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss'],
})
export class ButtonGroupComponent {
  @Input() items: ButtonGroupItem[] 
  @Input() stylingMode: 'contained' | 'outlined' | 'text' = 'text'
  @Output() itemClick: EventEmitter<ButtonGroupItem> = new EventEmitter<ButtonGroupItem>()


  onClick(e) {
    this.itemClick.emit(e.itemData)
  }
}
