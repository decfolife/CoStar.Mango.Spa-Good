import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '@mango/core-shared';
import { UserSite } from '@mango/data-models/lib-data-models';
import { ToolbarModuleLink } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isCostarStyle: boolean = false;
  envPopoverVisible: boolean = false;
  
  selectedCustomer: UserSite;

  // chip items
  @Input() chipContent: string;
  @Input() popoverContent: string[];
  @Input() moduleLinks: ToolbarModuleLink[];

  id = 'cremChip';
  chipStyle: ChipStyle = {
    type: 'secondary',
    color: 'costar',
  };

  constructor(private userService: UserService) { }

  ngOnInit(): void {
      // this.route.parent.url.subscribe((url) => {
    //   if (url[0].path == 'costar') {
    //     this.isCostarStyle = true;
    //   }
    // });
    this.isCostarStyle = false;
    this.selectedCustomer = this.userService.selectedSiteValue
  }

  toggleEnvironment() {}

  toggleEnvironmentPopover() {
    this.envPopoverVisible = !this.envPopoverVisible;
  }

  raiseToggleBookmarkDrawerEvent(){
    let evt = new CustomEvent("ToogleBookmarkDrawer", {detail: "toggle"});
    window.dispatchEvent(evt);
  }

}
export interface ChipStyle {
  type: string;
  color: string;
}

