import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {
  CardModule,
  DropdownModule,
  SimpleGridModule,
} from '@mango/ui-shared/lib-ui-elements';
import { DxLoadPanelModule } from 'devextreme-angular';
import { CremPivotTableModule } from 'libs/ui-shared/lib-ui-elements/src/lib/crem-pivot-table/crem-pivot-table.module';
import { DashboardService } from '../../../services/dashboard.service';

import { DashboardCardComponent } from './dashboard-card.component';

describe('DashboardCardComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardCardComponent, HostComponent],
      imports: [
        DropdownModule,
        CardModule,
        SimpleGridModule,
        DxLoadPanelModule,
        CremPivotTableModule,
        MatIconModule,
        MatMenuModule,
      ],
      providers: [DashboardService, HttpClient, HttpHandler],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  @Component({
    selector: 'mango-host-component',
    template:
      '<mango-accounting-card [config]="config"></mango-accounting-card>',
  })
  class HostComponent {
    private config = {
      allowDrillDown: true,
      apiEndPoint: 'testEndpoint',
      cardType: 'pivot',
      exportFileName: 'testFileName',
      fullWidth: true,
      id: 1,
      pivotDataSource: {
        fields: [{ dataField: 'testField' }],
        store: 'testStore',
      },
      showGrandTotal: true,
      title: 'testTitle',
      visible: true,
      enableChart: true,
    };
  }
});
