import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../apps/mango/src/environments/environment.local';

export interface linkObjects {
  category: string;
  data: SharedLeftNavLink[];
}

@Component({
  selector: 'shared-left-nav',
  templateUrl: 'shared-left-nav.component.html',
  styleUrls: ['shared-left-nav.component.scss'],
})
export class SharedLeftNavComponent implements OnChanges {
  @Input() navigationLinks: any[];
  public navObjs: linkObjects[];
  public expandNav: boolean = true;
  public isRestful: boolean;
  @Input() activeLink: string = null;
  @Output() navigateSpa: EventEmitter<SharedLeftNavLink> = new EventEmitter<SharedLeftNavLink>(null);
  @Output() toActiveLink: EventEmitter<string> = new EventEmitter();

  isSubleftnav$: Observable<boolean> = this.facade.showSubLeftNav$
  constructor(
    private facade: MangoAppFacade
  ) { this.isRestful = environment.isRestful }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName.toLowerCase() === 'navigationlinks') {
        this.getCategorizeLinks();
        break;
      }
    }
  }

  getCategorizeLinks() {
    this.navObjs = [];
    let prevCategory;

    for (let i = 0; i < this.navigationLinks.length; i++) {
      if (!this.navigationLinks[i].category) {
        this.createNavObj(this.navigationLinks[i]);
      } else {
        if (this.navigationLinks[i].category == prevCategory) {
          this.addLinkToCategory(this.navigationLinks[i]);
        } else {
          this.createNavObj(this.navigationLinks[i]);
        }
      }
      prevCategory = this.navigationLinks[i].category
    }
  }

  createNavObj(navLink: SharedLeftNavLink) {
    let data = [];
    data.push(navLink);
    let linkObj: linkObjects = {
      category: navLink.category,
      data: data
    };
    this.navObjs.push(linkObj);
  }

  addLinkToCategory(navLink: SharedLeftNavLink) {
    let p = this.navObjs.find(obj => {
      if (obj.category == navLink.category) { obj.data.push(navLink); }
    })
  }

  sidenavtoggle() {
    if (this.expandNav) {
      document.getElementsByClassName('sharedLeftNav-container')[0].classList.remove('expandNavBar');
      document.getElementsByClassName('sharedLeftNav-container')[0].classList.add('collapseNavBar');
    } else {
      document.getElementsByClassName('sharedLeftNav-container')[0].classList.remove('collapseNavBar');
      document.getElementsByClassName('sharedLeftNav-container')[0].classList.add('expandNavBar');
    }

    this.expandNav = !(this.expandNav);

  }

  onNavLinkClick(navLink: SharedLeftNavLink, event: any) {
    this.activeLink = navLink.name;
    this.toActiveLink.emit(this.activeLink);
    if (!environment.isRestful) {
      window.location.href = navLink.spaUrl ? `${environment.CAUrl}oauth/authorize?client_key=blank&contact_id=2&redirect_uri=${environment.mangoSpaUrl}/auth/validate?redirect_uri=${encodeURIComponent(navLink.spaUrl)}` : `/${navLink.linkUrl}`
    } else {
      this.navigateSpa.emit(navLink)
    }
  }
  
  leftNavOpened(e) {
    if (!e || !e._element || !e._element.nativeElement || !e._element.nativeElement.children)
      return;

    e._element.nativeElement.children[1].removeAttribute('tabindex');
    e._element.nativeElement.children[3].removeAttribute('tabindex');
  }
}
