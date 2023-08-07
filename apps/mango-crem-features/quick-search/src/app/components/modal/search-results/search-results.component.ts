/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { quickSearchResults } from '../../../models/quickSearchResults';
import { QuickSearchService } from '../../../services/quick-search.service';

@Component({
  selector: 'mango-quick-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class searchResultsComponent implements OnInit {

  public DialogData: any;
  public closeButton = true;
  public secondaryFooterButtonText = 'Close';
  public modalId = 'quickSearch';
  public modalTitle: string = "Quick Search Results";
  public searchResults: quickSearchResults [];
  public searchRestultsRetrieved: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<searchResultsComponent>,
    private router: Router,
    private quickSearchService: QuickSearchService,
    @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {
    this.searchRestultsRetrieved = false;
    this.getSearchResultsData(this.data.searchString, this.data.searchObjectId);
  }

  contentReady(event: any) {
      //hide these 2 columns
      if(event.component.columnOption("OID", "visible"))
        event.component.columnOption("OID", "visible", false);

      if(event.component.columnOption("OTID", "visible"))
        event.component.columnOption("OTID", "visible", false);
  }

  getSearchResultsData(searchString: string, objectId: number) {
    this.quickSearchService.getQuickSearchResults(searchString, objectId).subscribe(
      (res: any) => {
        this.searchRestultsRetrieved = true;
        if (res.success) {
          if(res.data.listOfSearchResults.length) {
            this.searchResults = res.data.listOfSearchResults.filter(object => object.results.length);
          }
        }
      },
      (error: any) => {
          this.searchRestultsRetrieved = true;
          console.log('Error occurred while getting Quick Search Results: ', error)
        }
    );
  }

}
