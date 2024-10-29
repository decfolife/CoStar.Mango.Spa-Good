import { Component, Input } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { PillType } from '@mango/data-models/lib-data-models';
@Component({
  selector: 'crem-pill',
  standalone: true,
  imports: [NgStyle, NgClass],
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
})
export class CremPillComponent {
  @Input() text: string | number;
  @Input() type: PillType;
}
