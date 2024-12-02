import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputLabelComponent } from '../input';
import { ButtonModule } from '../button';
import { IconModule } from '../icon';
import { ButtonGroupComponent } from '../button-group/button-group.component';
import { DropdownModule } from '../dropdown';
import { CremPillComponent } from '../pill/pill.component';
import { StatusPill, ViewType } from '@mango/data-models/lib-data-models';
import { SplitButtonComponent } from '../split-button/split-button.component';

@Component({
  selector: 'crem-page-header',
  standalone: true,
  imports: [
    CommonModule,
    InputLabelComponent,
    ButtonModule,
    IconModule,
    ButtonGroupComponent,
    DropdownModule,
    CremPillComponent,
    SplitButtonComponent,
  ],
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss'],
})
export class PageHeaderComponent {
  @Input() tabTitle: string;
  @Input() pageTitle: string;
  @Input() primaryButtonText: string;
  @Input() showBookmarkButton = false;
  @Input() showSettingsButton = false;
  @Input() showListOrMapViewButtons = true;
  @Input() customFilters = false;
  @Input() customActions = false;
  @Input() customSettings = false;
  @Input() statusPill: StatusPill = {} as StatusPill;

  @Output() search = new EventEmitter<string>();
  @Output() bookmark = new EventEmitter<Event>();
  @Output() settings = new EventEmitter<Event>();
  @Output() listOrMapView = new EventEmitter<ViewType>();

  listView = true;

  showListOrMapView(viewType: ViewType) {
    this.listView = !this.listView;
    this.listOrMapView.emit(viewType);
  }
}
