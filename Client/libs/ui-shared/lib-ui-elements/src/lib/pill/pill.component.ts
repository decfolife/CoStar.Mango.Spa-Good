import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { PillType } from '@mango/data-models/lib-data-models';
@Component({
  selector: 'crem-pill',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
})
export class CremPillComponent {
  @Input() text: string | number;
  @Input() type: PillType;
  @Input() titleOnHover?: string = '';
}
