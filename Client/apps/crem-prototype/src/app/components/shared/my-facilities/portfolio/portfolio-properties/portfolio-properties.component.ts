import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Service, Building, ListPageQuery } from '../../../../../app.service';

@Component({
  selector: 'portfolio-properties',
  templateUrl: './portfolio-properties.component.html',
  styleUrls: ['./portfolio-properties.component.scss'],
  providers: [Service],
})
export class PortfolioPropertiesComponent implements OnInit {
  buildings: Building[];
  columns: Array<any>;
  queries: ListPageQuery[];
  rowClickRoute: String;
  addWizards: Array<any>;
  keyFields: String[];

  constructor(
    private service: Service,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.buildings = this.service.getBuildings();
    this.queries = this.service.getListPageQueriesByObjectType('building');
    this.rowClickRoute = '../../property';
    this.keyFields = ['systemBuildingID'];
    this.addWizards = [
      { name: 'Building' },
      { name: 'Equipment Lease' },
      { name: 'Lease' },
      { name: 'Supplier' },
    ];
    this.columns = [
      {
        dataField: 'buildingName',
        visible: true,
        dataType: 'string',
        fixed: 'true',
      },
      {
        dataField: 'systemBuildingID',
        alignment: 'left',
        visible: true,
        dataType: 'number',
        width: '188px',
      },
      {
        dataField: 'address1',
        visible: true,
        dataType: 'string',
      },
      {
        dataField: 'city',
        visible: true,
        dataType: 'string',
      },
      {
        dataField: 'state',
        visible: true,
        dataType: 'string',
        width: '88px',
      },
      {
        dataField: 'zipCode',
        visible: true,
        dataType: 'string',
        width: '112px',
      },
      {
        dataField: 'country',
        visible: true,
        dataType: 'string',
      },
      {
        dataField: 'buildingRentableArea',
        alignment: 'right',
        visible: true,
        dataType: 'number',
        precision: 0,
        caption: 'Building Rentable Area SF',
        width: '240px',
      },
      {
        dataField: 'buildingType',
        visible: true,
        dataType: 'string',
        width: '145px',
      },
      {
        dataField: 'ownershipType',
        visible: true,
        dataType: 'string',
        width: '160px',
      },
      {
        dataField: 'estimatedRent',
        visible: true,
        dataType: 'string',
        width: '151px',
      },
      {
        dataField: 'market',
        visible: true,
        dataType: 'string',
      },
      {
        dataField: 'subMarket',
        visible: true,
        dataType: 'string',
      },
      {
        dataField: 'starRating',
        visible: true,
        dataType: 'number',
        cellTemplate: 'starsRatingTemplate',
        width: '125px',
      },
      {
        dataField: 'vacancy',
        visible: true,
        dataType: 'number',
        precision: 0,
        caption: 'Vacancy SF',
        label: 'vacancy',
        width: '130px',
      },
    ];
  }
}
