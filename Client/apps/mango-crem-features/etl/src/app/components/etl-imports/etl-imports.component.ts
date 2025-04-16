import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ETLService } from '@etl/services/etl.service';
import { Observable, Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  LoaderModule,
  ButtonModule,
  DropdownModule,
  IconModule,
} from '@mango/ui-shared/lib-ui-elements';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
import { DxDataGridComponent } from 'devextreme-angular';
import { ProjectsDashboardLeftNavService } from '@micro-components/services/projects-dashboard-left-nav.service';
import { SharedLeftNavLink } from '@mango/data-models/lib-data-models';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'mango-etl-imports',
  standalone: true,
  imports: [
    CommonModule,
    LoaderModule,
    MatDialogModule,
    MatCardModule,
    MatDividerModule,
    DevExpressModule,
    SearchModule,
    ButtonModule,
    DropdownModule,
    IconModule,
    MatIconModule,
    MatMenuModule,
  ],
  templateUrl: './etl-imports.component.html',
  styleUrls: ['./etl-imports.component.scss'],
})
export class EtlImportsComponent implements OnInit, OnDestroy {
  @ViewChild('ImportsDataGrid') templatesDataGrid: DxDataGridComponent;

  private subs: Subscription = new Subscription();
  imports;
  searchText: string = '';
  isLoading = true;
  isExpanded: boolean = true;

  constructor(
    public etlService: ETLService,
    private leftNavService: ProjectsDashboardLeftNavService
  ) {}

  ngOnInit(): void {
    this.subs.add(this.getUserPreferences().subscribe());
    // this.subs.add(
    //   this.leftNavService
    //     .getETLModulesNavigationLinks()
    //     .pipe()
    //     .subscribe((response) => {
    //       this.setCustomLeftNav(response.data);
    //     })
    // );

    this.subs.add(
      this.etlService.getETLImports().subscribe((result) => {
        if (result.success) {
          this.imports = result.data;
          this.isLoading = false;
        }
      })
    );
  }

  setCustomLeftNav(data: any) {
    const customLeftNavDataList: SharedLeftNavLink[] = data;
    const evt = new CustomEvent('SetCustomLeftNavItems', {
      detail: customLeftNavDataList,
    });
    window.dispatchEvent(evt);
  }

  searchDataGrid(data) {
    this.searchText = data;
    this.templatesDataGrid.instance.searchByText(data);
  }

  getUserPreferences(): Observable<any> {
    return this.etlService.getUserPreferences().pipe(
      filter((res) => !!res && !!res.success),
      map((res) => this.etlService.setUserDateFormat(res.data.isDatesEU))
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
