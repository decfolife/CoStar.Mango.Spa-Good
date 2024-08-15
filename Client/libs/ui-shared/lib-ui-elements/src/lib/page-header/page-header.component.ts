import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputLabelComponent } from '../input';
import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { ButtonGroupComponent } from '../button-group/button-group.component';
import { DropdownModule } from '../dropdown';

@Component({
  selector: 'crem-page-header',
  standalone: true,
  imports: [
    CommonModule, 
    InputLabelComponent,
    ButtonModule,
    IconModule,
    ButtonGroupComponent,
    DropdownModule
  ],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input() pageTitle: string;
  @Input() showTitleInfo = false;
  @Input() primaryButtonText: string
  @Input() showSearchButton = false
  @Input() showBookmarkButton = false
  @Input() showSettingsButton = false
  @Input() customFilters = false
  @Input() customActions = false
  @Input() customSettings = false

  @Output() search = new EventEmitter<string>()
  @Output() bookmark = new EventEmitter<Event>()
  @Output() settings = new EventEmitter<Event>()
}
