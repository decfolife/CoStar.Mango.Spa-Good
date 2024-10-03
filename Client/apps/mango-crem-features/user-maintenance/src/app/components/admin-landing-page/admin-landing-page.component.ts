import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { ObjectActionsComponent } from '@micro-components/object-actions/object-actions/object-actions.component';
import { ProjectsDashboardLeftNavService } from '@micro-components/services/projects-dashboard-left-nav.service';
import { SharedLeftNavLink } from 'libs/data-models/lib-data-models/src/lib/models/link';
import { map } from 'rxjs/operators';


@Component({
  selector: 'admin-landing-page',
  templateUrl: './admin-landing-page.component.html',
  styleUrls: ['./admin-landing-page.component.scss']
})
export class AdminLandingPageComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  public objectName: string;
  public objectTypeId: number;
  public objectId: number;
  public objectTypeTypeId: number;
  public hiddenPremise: number;
  isLoading = true;

  externalCremLink: string;

  @ViewChild('ObjectActions') objectActions: ObjectActionsComponent;
  groupedData: { [key: string]: any[] } = {};

  constructor(
    private facade: MangoAppFacade,
    private leftNavService: ProjectsDashboardLeftNavService
  ) {}

  ngOnInit(): void {
    const moduleId = 6; // Replace with actual moduleId if dynamic
    this.leftNavService
      .getAdminModulesNavigationLinks(moduleId)
      .pipe(map((response) => response.data))
      .subscribe((data) => {
        this.groupDataByCategory(data);
        this.isLoading = false;
      });
  }

  groupDataByCategory(data: any[]): void {
    data.forEach((item) => {
      if (!this.groupedData[item.category]) {
        this.groupedData[item.category] = [];
      }
      this.groupedData[item.category].push(item);
    });
  }

  getCategories(): string[] {
    return Object.keys(this.groupedData);
  }

  cardClicked(navLink: SharedLeftNavLink) {
    this.facade.navigateLeftNevMenu(navLink);
  }

  public archiveBuilding(event) {
    this.objectName = "Test";
    this.objectTypeId = 3;
    this.objectId = 1176;
    this.objectTypeTypeId = 300;
    this.hiddenPremise = 0;
    setTimeout(() => {
      this.objectActions.openObjectActionArchivePopup();
    })
    
  }

  public archiveLease(event) {
    this.objectName = "Test";
    this.objectTypeId = 4;
    this.objectId = 914;
    this.objectTypeTypeId = 400;
    this.hiddenPremise = 0;
    setTimeout(() => {
      this.objectActions.openObjectActionArchivePopup();
    })
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}
}
