import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import {
  Service,
  ProspectiveSpace,
  BuildingStrategy,
  StrategyLease,
  MarketActivity,
  MarketTransaction,
  TaxHistory,
  Insurance,
  AppraisalHistory,
  FormField,
  Building,
  Lease,
} from '../../../../../../app.service';

@Component({
  selector: 'property-strategy-three',
  templateUrl: './property-strategy-three.component.html',
  styleUrls: ['./property-strategy-three.component.scss'],
  providers: [Service],
})
export class PropertyStrategyThreeComponent implements OnInit {
  formFields: Object[];
  propertyId: Number;
  property: Building;
  strategyLeases: StrategyLease[];
  prospectiveSpaces: ProspectiveSpace[];
  buildingStrategy: BuildingStrategy;
  marketActivity: MarketActivity[];
  marketTransaction: MarketTransaction[];
  tooltip: any;
  addDealPopupVisible: Boolean = false;

  constructor(
    private service: Service,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.prospectiveSpaces = this.service.getProspectiveSpaces();

    this.buildingStrategy = this.service.getBuildingStrategies()[0];

    this.strategyLeases = this.service.getStrategyLeases();

    this.marketActivity = this.service.getMarketActivities();

    this.marketTransaction = this.service.getMarketTransactions();

    this.tooltip = {
      enabled: true,
      format: (value) => {
        return value;
      },
      showMode: 'always',
      position: 'bottom',
    };
  }

  ngOnInit() {
    this.route.parent.params.subscribe((params) => {
      this.propertyId = params['property_id'];

      this.property = this.service.getBuilding(this.propertyId);

      this.formFields = [
        {
          sectionName: 'Property Strategy',
          colCount: 3,
          class: {
            'col-md-12': true,
          },
          fields: [
            new FormField( 100, 'Property Strategy', 'propertyStrategy', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{ value: 'Renew', display: 'Renew' }], false, null, null ),
            new FormField( 200, 'Targeted Period', 'targetedPeriod', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null ),
            new FormField( 300, 'Budgeted Capital', 'budgetedCapital', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null ),
            new FormField( 29, 'Notes', 'strategyNotes', 'dxTextBox', '', '', '', '3', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null ),
          ],
        },
        {
          sectionName: 'Current Property Metrics',
          class: {
            'col-md-6': true,
          },
          fields: [
            new FormField( 1, 'Lease Count', 'leaseCount', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 3, 'Total Leased SF', 'totalLeaseSf', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 3, 'Utilization Rate', 'utilizationRate', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 21, 'Rent / SF (vs Market)', 'rentSfVsMarket', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 4, 'Total Seats', 'totalSeats', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 19, 'SF / Seat (vs Portfolio)', 'sfSeatVsPortfolio', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 5, 'Total Headcount', 'totalHeadcount', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 17, 'Estimated Renewal Rent', 'estimatedRenewalRent', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 7, 'Total Available Seats', 'totalAvailableSeats', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
          ],
        },
        {
          sectionName: 'Future Requirements',
          class: {
            'col-md-6': true,
          },
          fields: [
            new FormField( 26, 'Min Seat Count', 'minSeatCount', 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null ),
            new FormField( 33, 'Max Seat Count', 'maxSeatCount', 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null ),
            new FormField( 26, 'SF Per Seat', 'minSfPerSeat', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'rangeSliderTemplate', [], false, null, null ),
            new FormField( 25, 'Min Rentable Area', 'minRentableArea', 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null ),
            new FormField( 32, 'Max Rentable Area', 'maxRentableArea', 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null ),
            new FormField( 28, 'Min Term', 'minTerm', 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null ),
            new FormField( 35, 'Max Term', 'maxTerm', 'dxTextBox', '', '', '', '', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], false, null, null ),
            new FormField( 29, 'Location (submarket)', 'location', 'dxTextBox', '', '', '', '2', '', true, '', '', '', '', '', '', null, 'selectBoxTemplate', [{ value: 'Upper Buckhead', display: 'Upper Buckhead' }], false, null, null ),
            new FormField( 36, 'Space Type', 'spaceType', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: 'Office', display:'Office'}], false, null, null ),
            new FormField( 30, 'Building Class', 'buildingClass', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'selectBoxTemplate', [{value: 'A', display:'A'}], false, null, null ),
            new FormField( 37, 'Est Commencement Date', 'estCommencementDate', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'dateBoxTemplate', [], false, null, null ),
          ],
        },
        {
          sectionName: 'Leases',
          class: {
            'col-md-12': true,
          },
          isTableData: true,
          allowEditing: false,
          preventExport: true,
          data: this.strategyLeases,
          columns: [
            {
              dataField: 'id',
              alignment: 'left',
              visible: true,
              allowEditing: false,
              dataType: 'number',
              precision: 0,
              caption: 'System Lease ID',
            },
            {
              dataField: 'expirationDate',
              alignment: 'center',
              visible: true,
              allowEditing: true,
              dataType: 'string',
              precision: 0,
            },
            {
              dataField: 'leasedSf',
              alignment: 'right',
              visible: true,
              allowEditing: true,
              dataType: 'number',
              precision: 0,
              caption: 'Lease SF',
            },
            {
              dataField: 'rentPsf',
              alignment: 'right',
              visible: true,
              allowEditing: true,
              dataType: 'currency',
              precision: 2,
              caption: 'Rent / SF',
            },
            {
              dataField: 'totalSeats',
              alignment: 'right',
              visible: true,
              allowEditing: true,
              dataType: 'number',
              precision: 0,
            },
            {
              dataField: 'headcount',
              alignment: 'right',
              visible: true,
              allowEditing: true,
              dataType: 'number',
              precision: 0,
            },
            {
              dataField: 'availableSeats',
              alignment: 'right',
              visible: true,
              allowEditing: true,
              dataType: 'number',
              precision: 0,
            },
            {
              dataField: 'utilization',
              alignment: 'right',
              visible: true,
              allowEditing: true,
              dataType: 'string',
              precision: 0,
            },
            {
              dataField: 'sfPerSeat',
              alignment: 'right',
              visible: true,
              allowEditing: true,
              dataType: 'number',
              precision: 0,
              caption: 'SF / Seat',
            },
          ],
        },
        {
          sectionName: 'Alternative Spaces Available',
          class: {
            'col-md-12': true,
          },
          isTableData: true,
          allowEditing: false,
          listMapToggle: true,
          preventExport: true,
          data: this.prospectiveSpaces,
          columns: [
            {
              dataField: 'propertyName',
              alignment: 'left',
              visible: true,
              allowEditing: false,
              dataType: 'string',
              precision: 0,
            },
            {
              dataField: 'propertyAddress',
              alignment: 'left',
              visible: true,
              allowEditing: false,
              dataType: 'string',
              precision: 0,
              caption: 'Address',
            },
            {
              dataField: 'stars',
              alignment: 'left',
              visible: true,
              allowEditing: false,
              dataType: 'number',
              precision: 0,
              caption: 'Star Rating',
              cellTemplate: 'starsRatingTemplate',
            },
            {
              dataField: 'buildingStatus',
              alignment: 'left',
              visible: true,
              allowEditing: false,
              dataType: 'string',
              precision: 0,
            },
            {
              dataField: 'totalAvailableSf',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'number',
              precision: 0,
              caption: 'Total Avail. SF',
            },
            {
              dataField: 'estimatedRent',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'currency',
              precision: 2,
              caption: 'Est. Rent',
            },
            {
              dataField: 'submarketName',
              alignment: 'center',
              visible: true,
              allowEditing: false,
              dataType: 'string',
              precision: 0,
            },
            {
              dataField: 'percentLeased',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'string',
              precision: 0,
              caption: '% Leased',
            },
            {
              dataField: 'leasingCompanyContact',
              alignment: 'left',
              visible: true,
              allowEditing: false,
              dataType: 'string',
              precision: 0,
              caption: 'Leasing Company/Contact',
            },
          ],
        },
        {
          sectionName: 'Market Rent Per SF',
          class: {
            'col-md-6': true,
          },
          isTableData: false,
          allowEditing: true,
          data: null,
          imagePath: 'assets/images/marketRentPerSF.png',
        },
        {
          sectionName: 'Market Transactions',
          class: {
            'col-md-6': true,
          },
          isTableData: true,
          allowEditing: false,
          listMapToggle: false,
          preventExport: true,
          data: this.marketTransaction,
          columns: [
            {
              dataField: 'blockSize',
              alignment: 'left',
              visible: true,
              allowEditing: false,
              dataType: 'string',
              precision: 0,
              caption: 'Block Size (SF)',
              cellTemplate: 'customTemplate',
            },
            {
              dataField: 'classType',
              alignment: 'left',
              visible: true,
              allowEditing: false,
              dataType: 'string',
              precision: 0,
              caption: 'Type',
            },
            {
              dataField: 'rating',
              alignment: 'left',
              visible: true,
              allowEditing: false,
              dataType: 'number',
              precision: 0,
              caption: 'Star Rating',
              cellTemplate: 'starsRatingTemplate',
            },
            {
              dataField: 'signDate',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'date',
              caption: 'Sign Date',
            },
            {
              dataField: 'rentPerArea',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'currency',
              precision: 2,
              caption: 'Rent Per Area',
            },
            {
              dataField: 'term',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'string',
              caption: 'Term Years',
            },
          ],
        },

        {
          sectionName: 'Availability & Vacancy Rate',
          class: {
            'col-md-6': true,
          },
          isTableData: false,
          allowEditing: true,
          data: null,
          imagePath: 'assets/images/availabilityVacancyRate.png',
        },
        {
          sectionName: 'Market Rent Growth (YOY)',
          class: {
            'col-md-6': true,
          },
          isTableData: false,
          allowEditing: true,
          data: null,
          imagePath: 'assets/images/marketRentGrowthYOY.png',
        },
        {
          sectionName: 'Vacancy Rate',
          class: {
            'col-md-6': true,
          },
          isTableData: false,
          allowEditing: true,
          data: null,
          imagePath: 'assets/images/vacancyRate.png',
        },
        {
          sectionName: 'Daily Vacancy Rate',
          class: {
            'col-md-6': true,
          },
          isTableData: false,
          allowEditing: true,
          data: null,
          imagePath: 'assets/images/dailyVacancyRate.png',
        },
        {
          sectionName: 'Availability Rate',
          class: {
            'col-md-6': true,
          },
          isTableData: false,
          allowEditing: true,
          data: null,
          imagePath: 'assets/images/availabilityRate.png',
        },
        {
          sectionName: 'Occupancy Rate',
          class: {
            'col-md-6': true,
          },
          isTableData: false,
          allowEditing: true,
          data: null,
          imagePath: 'assets/images/occupancyRate.png',
        },
        {
          sectionName: 'Leasing Activity',
          class: {
            'col-md-6': true,
          },
          isTableData: false,
          allowEditing: true,
          data: null,
          imagePath: 'assets/images/leasingActivity.png',
        },
      ];
    });
  }

  launchAddDealModal() {
    this.addDealPopupVisible = true;
  }

  saveDeal(e) {
    this.addDealPopupVisible = false;
  }

  cancelAddDeal(e) {
    this.addDealPopupVisible = false;
  }
}