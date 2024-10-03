import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link';
import { Observable } from 'rxjs';

export interface NavLinksByCategory {
  category: string;
  children: SharedLeftNavLink[];
}

@Component({
  selector: 'shared-left-nav',
  templateUrl: 'shared-left-nav.component.html',
  styleUrls: ['shared-left-nav.component.scss'],
})
export class SharedLeftNavComponent implements OnChanges {
  @Input() navigationLinks: SharedLeftNavLink[];
  regularLeftNavItems: NavLinksByCategory[] = [];
  commonLeftNavItems: NavLinksByCategory[] = []

  expandNav: boolean = true;

  @Input() activeLink: string = null;
  @Output() navigateSpa: EventEmitter<SharedLeftNavLink> = new EventEmitter<SharedLeftNavLink>(null);
  @Output() toActiveLink: EventEmitter<string> = new EventEmitter();


  constructor(private facade: MangoAppFacade) { }

  isSubleftnav$: Observable<boolean> = this.facade.showSubLeftNav$

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName.toLowerCase() === 'navigationlinks') {
        this.getCategorizeLinks();
        break;
      } else if (propName.toLowerCase() === 'activelink') {
        const navLink: SharedLeftNavLink | undefined =
          this.navigationLinks?.filter(
            (x) => x.name === changes.activeLink.currentValue
          )[0];
        if (navLink && navLink.moduleID && navLink.dynamicName) {
          const id =
            'left-nav__' +
            navLink.moduleID +
            '-' +
            navLink.dynamicName.toLowerCase().replace(' ', '-');

          const element = document.getElementById(id);

          if (element) {
            element.focus();
          }
        }
      }
      else if (propName.toLowerCase() === 'activelink') {
        const navLink : SharedLeftNavLink = this.navigationLinks.filter(x => x.name === changes.activeLink.currentValue)[0];
        const id = 'left-nav__' + navLink?.moduleID + '-' + navLink?.dynamicName?.toLowerCase()?.replace(' ', '-');
        document.getElementById(id).focus();
      }
    }
  }

  getCategorizeLinks() {
    this.regularLeftNavItems = this.categorizeNavLinks(this.navigationLinks.filter(navlink => !navlink.isCommon))
    this.commonLeftNavItems = this.categorizeNavLinks(this.navigationLinks.filter(navLink => !!navLink.isCommon))
  }

  categorizeNavLinks(navLinks: SharedLeftNavLink[]): NavLinksByCategory[] {
    return navLinks.reduce((acc: NavLinksByCategory[], currentNavLink) => {
      if (!currentNavLink.category) {
        acc.push({ category: currentNavLink.category, children: [currentNavLink]})
      } else {
        const existingNavLinkItem = acc.find(navLink => navLink.category === currentNavLink.category)
        existingNavLinkItem ? existingNavLinkItem.children.push(currentNavLink) : acc.push({ category: currentNavLink.category, children: [currentNavLink]})
      }
      return acc
    }, [])
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
    this.navigateSpa.emit(navLink)
  }

  leftNavOpened(e) {
    if (!e || !e._element || !e._element.nativeElement || !e._element.nativeElement.children)
      return;

    e._element.nativeElement.children[1].removeAttribute('tabindex');
    e._element.nativeElement.children[3].removeAttribute('tabindex');
  }
}
