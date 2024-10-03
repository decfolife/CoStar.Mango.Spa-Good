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
import { DxDataGridComponent } from 'devextreme-angular';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'mango-etl-status',
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
  templateUrl: './etl-status.component.html',
  styleUrls: ['./etl-status.component.scss'],
})
export class EtlStatusComponent implements OnInit, OnDestroy {
  @ViewChild('StatusDataGrid') templatesDataGrid: DxDataGridComponent;

  private subs: Subscription = new Subscription();
  statuses;
  searchText: string = '';
  isLoading = true;
  isExpanded: boolean = true;

  constructor(public etlService: ETLService) {}

  ngOnInit(): void {
    this.subs.add(this.getUserPreferences().subscribe());
    this.subs.add(
      this.etlService.getETLStatus().subscribe((result) => {
        if (result.success) {
          this.statuses = result.data;
          this.isLoading = false;
        }
      })
    );
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
