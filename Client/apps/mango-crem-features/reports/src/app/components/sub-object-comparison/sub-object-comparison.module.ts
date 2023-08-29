import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DxDataGridModule, DxLoadPanelModule } from 'devextreme-angular';
import { SharedModule } from '../../shared/shared.module';
import { SubObjectComparisonService } from './sub-object-comparison.service';
import { SubObjectComparisonComponent } from './sub-object-comparison.component';
import { MatMenuModule } from '@angular/material/menu';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule } from '@mango/ui-shared/lib-ui-elements';
import { ProjectGanttChartService } from '../project-gantt-chart/project-gantt-chart.service';
import { SharedService } from '../../shared/services/shared.service';
import { SafeHtmlPipe } from '../../pipe/safe-html.pipe';
import { PlaintextToHtmlPipe } from '../../pipe/plaintext-to-html.pipe';

// TODO: The 'crem-icon' should be utilized instead of directly using the FontAwesome library.
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

@NgModule({
  declarations: [
    SubObjectComparisonComponent,
    SafeHtmlPipe,
    PlaintextToHtmlPipe
  ],

  imports: [
    CommonModule,
    DxDataGridModule,
    SharedModule,
    MatMenuModule,
    MatButtonModule,
    SearchModule,
    FontAwesomeModule,
    DxLoadPanelModule,
    ButtonModule,
    RouterModule.forChild([
      {
        path: '',
        data: { pageTitle: 'Sub Object Comparison' },
        component: SubObjectComparisonComponent
      },
      {
        path: ':formId/:childObjectTypeId/:parentObjectId/:parentObjectTypeId/:widgetId',
        data: { pageTitle: 'Sub Object Comparison' },
        component: SubObjectComparisonComponent
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    DatePipe,
    CurrencyPipe,
    DecimalPipe,
    SubObjectComparisonService,
    ProjectGanttChartService,
    SharedService,
  ]
})
export class SubObjectComparisonModule { }