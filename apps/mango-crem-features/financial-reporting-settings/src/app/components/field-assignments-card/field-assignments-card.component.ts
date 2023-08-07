import { Component, EventEmitter, Input, Output } from '@angular/core';

import { SettingsData } from '../../models';

@Component({
  selector: 'mango-field-assignments-card',
  templateUrl: './field-assignments-card.component.html',
  styleUrls: ['./field-assignments-card.component.scss']
})
export class FieldAssignmentsCardComponent {
  @Input()
  settingsData: SettingsData;

  @Input()
  isViewOnly = true;

  @Output()
  changed = new EventEmitter();
}
