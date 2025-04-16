import { Component, Input } from '@angular/core';
import { NgClass, CommonModule } from '@angular/common';
import { PillType } from '@mango/data-models/lib-data-models';
import { IconModule } from '../icon';

@Component({
  selector: 'crem-pill',
  standalone: true,
  imports: [NgClass, IconModule, CommonModule],
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
})
export class CremPillComponent {
  @Input() text: string | number;
  @Input() type: PillType;
  @Input() titleOnHover?: string = '';
  @Input() displayLockIcon?: boolean = false;
}
