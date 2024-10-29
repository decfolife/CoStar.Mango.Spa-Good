import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToolbarModuleLink } from '@mango/data-models/lib-data-models';
import { BookmarksModule } from '@mango/ui-shared/lib-ui-elements';
import { EnvInfoChipModule } from '../env-info-chip';

@Component({
  selector: 'mango-toolbar',
  templateUrl: './toolbar.component.html',
  standalone: true,
  imports: [CommonModule, RouterModule, EnvInfoChipModule, BookmarksModule],
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  isCostarStyle = false;
  envPopoverVisible = false;

  @Input() chipContent: string;
  @Input() popoverContent: string;
  @Input() moduleLinks: ToolbarModuleLink[];

  ngOnInit(): void {
    this.isCostarStyle = false;
  }

  toggleEnvironmentPopover() {
    this.envPopoverVisible = !this.envPopoverVisible;
  }

  raiseToggleBookmarkDrawerEvent() {
    const evt = new CustomEvent('ToogleBookmarkDrawer', { detail: 'toggle' });
    window.dispatchEvent(evt);
  }
}
