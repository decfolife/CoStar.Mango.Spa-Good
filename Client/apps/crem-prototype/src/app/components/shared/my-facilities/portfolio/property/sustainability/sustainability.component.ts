import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Service,
  FormField,
  Sustainability,
} from '../../../../../../app.service';

@Component({
  selector: 'property-sustainability',
  templateUrl: './sustainability.component.html',
  styleUrls: ['./sustainability.component.scss'],
  providers: [Service],
})
export class PropertySustainabilityComponent implements OnInit {
  formFields: Object[];
  propertyId: Number;
  sustainability: Sustainability;
  tooltip: any;

  constructor(
    private service: Service,
    private route: ActivatedRoute
  ) {
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
      this.sustainability = this.service.getSustainability(Number(this.propertyId));
      // console.log({ propertyId: Number(this.propertyId), sustainability: this.sustainability });
      // console.log(this.sustainability.propertyCertifications['leedStatus']);
      console.log(this.sustainability);
      this.formFields = [
        {
          sectionName: 'Property Certifications',
          type: 'fields',
          colCount: 3,
          class: {
            'col-md-12': true,
          },
          data: this.sustainability.propertyCertifications,
          fields: [
            new FormField( 1, 'LEED', 'leedStatus', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 2, 'Score', 'leedScore', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 3, 'Date', 'leedDate', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 4, 'Energy Star', 'energyStarStatus', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 5, 'Score', 'energyStarScore', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 6, 'Date', 'energyStarDate', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 7, 'BREEAM', 'breeamStatus', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 8, 'Date', 'breeamDate', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 9, 'GBI Guiding Principles', 'gbiStatus', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 10, 'Date', 'gbiDate', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 11, 'Green Globes Existing Building', 'greenGlobesExistingBuildingStatus', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 12, 'Date', 'greenGlobesExistingBuildingDate', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 13, 'Green Globes New Construction', 'greenGlobesNewConstructionStatus', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 14, 'Date', 'greenGlobesNewConstructionDate', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 13, 'Green Globes Sustainable Interior', 'greenGlobesSustainableInterior', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 13, 'Date', 'greenGlobesSustainableInteriorDate', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 15, 'WELL', 'wellStatus', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 16, 'Score', 'wellScore', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 17, 'Date', 'wellDate', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 18, 'WELL Health Safety Seal', 'wellHealthSafetySealStatus', 'dxTextBox', '', '', '', '3', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 19, 'EPC Rating', 'epcRating', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 20, 'Date', 'epcRatingDate', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 21, 'BOMA 360', 'boma360Status', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 22, 'Date', 'fitwellStatus', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 23, 'Fitwell', 'fitwellDate', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 24, 'Date', 'energyCertification', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 25, 'Energy Certification', 'energyCertification', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 25, 'Energy Certification Value', 'energyCertificationValue', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 26, 'Renewable Energy', 'renewableEnergy', 'dxTextBox', '', '', '', '2', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 27, 'Renewable Energy Type', 'renewableEnergyType', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 28, 'Minergie Score', 'minergieScore', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 29, 'SNBS', 'snbs', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 30, 'NABERS Score', 'nabersScore', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),

            new FormField( 31, 'Wired Score', 'wiredScore', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
          ],
        },
        {
          sectionName: 'CoStar Data',
          type: 'fields',
          colCount: 2,
          class: {
            'col-md-12': true,
          },
          data: this.sustainability.costarData,
          fields: [
            new FormField( 1, 'Walkability Score', 'walkabilityScore', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 1, 'Transit Score', 'transitScore', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 1, 'BOMA Certification', 'bomaCertification', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
            new FormField( 1, 'Flood Risk', 'floodRisk', 'dxTextBox', '', '', '', '1', '', null, '', '', '', '', '', '', null, 'textBoxTemplate', [], true, null, null ),
          ],
        },
        {
          sectionName: 'Building Performance Metrics',
          type: 'table',
          class: {
            'col-md-12': true,
          },
          isTableData: true,
          allowEditing: false,
          listMapToggle: false,
          preventExport: true,
          data: this.sustainability.buildingPerformanceMetrics,
          columns: [
            {
              dataField: 'period',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'string',
            },
            {
              dataField: 'energyUseIntensity',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'string',
            },
            {
              dataField: 'co2Emissions',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'string',
            },
            {
              dataField: 'waterUse',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'string',
            },
            {
              dataField: 'energyStarScore',
              alignment: 'right',
              visible: true,
              allowEditing: false,
              dataType: 'number',
            },
            {
              dataField: 'occupantSatisfaction',
              alignment: 'right',
              visible: true,
              dataType: 'string',
            },
          ],
        },
        {
          sectionName: 'Green Lease Clauses',
          type: 'clauses',
          class: {
            'col-md-12': true,
          },
          clauses: this.sustainability.greenLeaseClause,
        },
      ];
    });
  }

}