import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  standalone: true,
  selector: 'crem-tab-item',
  imports: [CommonModule],
  template: `
    <div
      *ngIf="active"
      class="tab-content"
      role="tabpanel"
      tabindex="0"
      [attr.id]="'tabpanel-' + id"
      [attr.aria-labelledby]="id"
      [ngStyle]="{ height: height }"
    >
      <ng-content></ng-content>
    </div>
  `,
  animations: [
    trigger('tabSwitchMotion', [
      state(
        'leave',
        style({
          opacity: 0,
          visibility: 'hidden',
        })
      ),
      transition('* => enter', [
        style({
          opacity: 0,
          visibility: 'visible',
        }),
        animate(
          '0.3s',
          style({
            opacity: 1,
          })
        ),
      ]),
      transition('* => leave, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        }),
        animate(
          '0.3s',
          style({
            opacity: 0,
          })
        ),
      ]),
    ]),
  ],
  styles: [
    `
      .tab-content {
        padding: 1em;
      }
    `,
  ],
  host: {
    '[@tabSwitchMotion]': `active ? 'enter' : 'leave'`,
  },
})
export class CremTabItemComponent {
  @Input() title: string;
  @Input() active = false;
  @Input() disabled = false;
  @Input() id: string = null;
  @Input() height: string;
}
