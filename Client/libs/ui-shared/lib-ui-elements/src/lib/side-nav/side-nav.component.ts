import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

export interface Link{
  href: string;
  text: string;
  style?: string;
}

@Component({
  selector: 'crem-sidenav',
  templateUrl: 'side-nav.component.html',
  styleUrls: ['side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
events: string[] = [];
opened: boolean;
@Input() links: Link[];
// @Input() collapsible: boolean;
// icon: string;
// iconChoice: boolean;
// faAngleDoubleLeft= faAngleDoubleLeft;
// faAngleDoubleRight= faAngleDoubleRight;
constructor(){

}
ngOnInit(){
  this.opened = true;
}
}
