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
  @Input() showTitleInfo: boolean = false;
  @Input() primaryButtonText: string
  @Input() showSearchButton: boolean = false
  @Input() showBookmarkButton: boolean = false
  @Input() showSettingsButton: boolean = false
  @Input() customFilters: boolean = false
  @Input() customActions: boolean = false
  @Input() customSettings: boolean = false

  @Output() onSearchClick = new EventEmitter<string>()
  @Output() onBookmarkClick = new EventEmitter<Event>()
  @Output() onSettingsClick = new EventEmitter<Event>()
}
