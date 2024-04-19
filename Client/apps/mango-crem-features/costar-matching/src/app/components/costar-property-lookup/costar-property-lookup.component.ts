import { Component, inject } from '@angular/core';
import { CardModule } from '@mango/ui-shared/lib-ui-elements';
import { CoStarProperty, BuildingInfo } from '@mango/data-models/lib-data-models';
import {CostarMatchingService} from '../../services/costar-matching.service';
import { Observable, Subscription, of } from 'rxjs';
import { DxDataGridModule } from 'devextreme-angular';
import { CommonModule } from '@angular/common';
import { ButtonModule } from '../../../../../../../libs/ui-shared/lib-ui-elements/src';
import { SearchModule } from '../../../../../../../libs/ui-shared/cosmos/src';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { map, switchMap } from 'rxjs/operators';

@Component({
  standalone: true,
  imports: [CommonModule, CardModule, DxDataGridModule, ButtonModule, SearchModule],
  selector: 'app-costar-property-lookup',
  templateUrl: './costar-property-lookup.component.html',
  styleUrls: ['./costar-property-lookup.component.css']
})
export class CostarPropertyLookupComponent {
  properties: CoStarProperty[];
  buildingId: number;
  public buildingInfo: BuildingInfo;

  private subs: Subscription[] = [];

  private customSelection = false;

  http = inject(HttpClient);

  constructor(private route: ActivatedRoute, private costarMatchingService: CostarMatchingService) {     
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(queryParam => {
      this.buildingId = queryParam['oid'];
      // if (this.buildingId > 0) {
        this.getBuildingInfo(this.buildingId);

        const request = {    
          "buildingID": this.buildingInfo.buildingId,
          "buildingName": this.buildingInfo.buildingName,
          "addressStreet": this.buildingInfo.buildingAddress_1,
          "address2": this.buildingInfo.buildingAddress_2,
          "city": this.buildingInfo.buildingCity,
          "state": this.buildingInfo.buildingState,
          "zip": this.buildingInfo.buildingZipCode,
          "countryCode": this.buildingInfo.buildingCountry
        };
        this.getCostarProperties(request);
        // });
      // }
    })
  }


  onSelectionChanged(e: any) {
    if (this.customSelection) return;
            
    this.customSelection = true;
    e.component.selectRows(e.currentSelectedRowKeys[0], false);
    this.customSelection = false;
  }

  searchCostarProperties(searchText: string): void {
    const request = {    
      "buildingID": "",
      "buildingName": "",
      "addressStreet": searchText,
      "address2": "",
      "city": "",
      "state": "",
      "zip": "",
      "countryCode": ""
    };
    this.getCostarProperties(request);
  }

  saveCostarInfo(e: any){
    this.subs.push (
      this.costarMatchingService.saveCostarProperty('12345')
        .subscribe(result => {
          console.log('test');
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  private getCostarProperties(request: any) {
    this.subs.push (
      this.costarMatchingService.getMatchedCostarProperty(request)
        .subscribe(result => {    
          this.properties = result;
      })
    );
  }

  private getBuildingInfo(buildingId: number)
  { 
    this.subs.push (
      this.costarMatchingService.getBuildingInfo(buildingId)
        .subscribe(result => {    
          this.buildingInfo = result;
      })
    );
  }
}


