import { Component, Input, OnInit, ElementRef } from '@angular/core';
import { ProjectsDashboardLeftNavService } from '../services/projects-dashboard-left-nav.service';

@Component({
  selector: 'mango-module-left-nav',
  templateUrl: './module-left-nav.component.html',
  styleUrls: ['./module-left-nav.component.scss']
})
export class ModuleLeftNavAppComponent implements OnInit {
  @Input() moduleId: number;
  @Input() activeLink: string = null;
  public navigationLinks: any = [];
  public navLinksFetched: boolean = false;

  constructor(private leftNavService: ProjectsDashboardLeftNavService,
              private elementRef: ElementRef) { }

  ngOnInit(): void {
    let modId = Number(this.elementRef.nativeElement.getAttribute('moduleId'));
    this.getModuleNavLinksNew(modId);
  }

  getModuleNavLinksNew(moduleId: number) {
    this.leftNavService.getModuleNavigationLinks(moduleId).subscribe(
      (res:any) => {
        //if (res.succeeded) {
          const globalNavLinks = res?.data || [];
          this.leftNavService.getModuleNavigationLinksClient(moduleId).subscribe(
            (res: any) => {
              if (res && res.data && res.data.length) {
                for(const clientLink of res.data) {
                  for (const link of globalNavLinks) {
                    if (clientLink.moduleNavLinkID === link.id) {
                      const i = globalNavLinks.indexOf(link);
                      if(clientLink.isActive === true) {
                        globalNavLinks[i] = clientLink;
                      } else {
                        globalNavLinks.splice(i, 1);
                      }
                    }
                  }
                }
              }
              this.navigationLinks = globalNavLinks;
            }
          )
        //}
        this.navLinksFetched = true;
      },
      (error: any) => {
        this.navLinksFetched = true;
      },
      () => {
      }
    );
  }


}
