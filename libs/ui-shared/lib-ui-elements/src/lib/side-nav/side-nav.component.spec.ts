import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

export interface Link{
  href: string;
  text: string;
  style?: string;
}

@Component({
  selector: 'crem-sidenav',
  templateUrl: 'sidenav.component.html',
  styleUrls: ['sidenav.component.scss'],
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
