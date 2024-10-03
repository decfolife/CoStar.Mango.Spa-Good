import { Component, OnInit, ViewChild } from '@angular/core';
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
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'mango-etl-log',
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
  templateUrl: './etl-log.component.html',
  styleUrls: ['./etl-log.component.scss'],
})
export class EtlLogComponent implements OnInit {
  @ViewChild('TemplateLogDataGrid')
  templateHistoryDataGrid: DxDataGridComponent;
  private subs: Subscription = new Subscription();
  templateLogData: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public etlService: ETLService
  ) {}

  ngOnInit(): void {
    this.subs.add(this.getUserPreferences().subscribe());
    this.subs.add(
      this.etlService.getImportLog().subscribe((result) => {
        if (result.success) {
          this.templateLogData = result.data;
        }

        this.isLoading = false;
      })
    );
  }

  getUserPreferences(): Observable<any> {
    return this.etlService.getUserPreferences().pipe(
      filter((res) => !!res && !!res.success),
      map((res) => this.etlService.setUserDateFormat(res.data.isDatesEU))
    );
  }
}
