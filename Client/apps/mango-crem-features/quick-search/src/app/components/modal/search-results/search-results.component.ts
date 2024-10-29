/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { quickSearchResults } from '../../../models/interfaces/quick-search-results.interface';
import { QuickSearchService } from '../../../services/quick-search.service';
import {
  ApiResponse,
  RedirectorLinks,
  RedirectorLink,
} from '../../../models/interfaces/quick-search-results.interface';

@Component({
  selector: 'mango-quick-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class searchResultsComponent implements OnInit {
  DialogData: any;
  closeButton = true;
  secondaryFooterButtonText = 'Close';
  modalId = 'quickSearch';
  modalTitle = 'Quick Search Results';
  searchResults: quickSearchResults[];
  searchRestultsRetrieved = false;
  selectedPanel = '';
  redirectorLinks: RedirectorLink[];

  constructor(
    public dialogRef: MatDialogRef<searchResultsComponent>,
    private router: Router,
    private quickSearchService: QuickSearchService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.searchRestultsRetrieved = false;
    this.getSearchResultsData(this.data.searchString, this.data.searchObjectId);
    this.quickSearchService
      .getRedirectorLinkList()
      .subscribe((res: ApiResponse) => {
        this.redirectorLinks = (res.data as RedirectorLinks).redirectorLinks;
      });
  }

  contentReady(event: any) {
    //hide these 2 columns
    if (event.component.columnOption('OID', 'visible'))
      event.component.columnOption('OID', 'visible', false);

    if (event.component.columnOption('OTID', 'visible'))
      event.component.columnOption('OTID', 'visible', false);
  }

  getSearchResultsData(searchString: string, objectId: number) {
    this.quickSearchService
      .getQuickSearchResults(searchString, objectId)
      .subscribe(
        (res: any) => {
          this.searchRestultsRetrieved = true;
          if (res.success) {
            if (res.data.listOfSearchResults.length) {
              this.searchResults = res.data.listOfSearchResults.filter(
                (object) => object.results.length
              );
            }
          }
        },
        (error: any) => {
          this.searchRestultsRetrieved = true;
          console.log(
            'Error occurred while getting Quick Search Results: ',
            error
          );
        }
      );
  }

  onTitleClick(event: any) {
    this.selectedPanel = event.itemData.title;
  }

  onItemRendered(event: any) {
    this.selectedPanel = event.itemData.title;
  }

  onRowClick(event: any) {
    let res = this.searchResults.filter((searchResult) => {
      if (searchResult.objectTypeType === this.selectedPanel) return true;
    });

    let otid = parseInt(res[0].objectTypeId);
    this.dialogRef.close();
    this.router.navigate(['/v06/Forms/RenderForm.aspx'], {
      queryParams: { oid: event.data.OID, otid: otid, ottid: event.data.OTID },
    });
  }
}
