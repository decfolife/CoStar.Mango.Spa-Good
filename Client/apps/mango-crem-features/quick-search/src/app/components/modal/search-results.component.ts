/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { quickSearchResults } from '../../models/interfaces/quick-search-results.interface';
import { QuickSearchService } from '../../services/quick-search.service';
import {
  CremToastService,
  SelectedTab,
} from '@mango/ui-shared/lib-ui-elements';
import {
  ApiResponse,
  RedirectorLinks,
  RedirectorLink,
} from '../../models/interfaces/quick-search-results.interface';
import { ToastState } from '@mango/data-models/lib-data-models';

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
  private _skeletonInstances = 1;
  loading = true as boolean;
  selectedPanel = '';
  redirectorLinks: RedirectorLink[];
  selectedTab: SelectedTab;

  constructor(
    public dialogRef: MatDialogRef<searchResultsComponent>,
    private router: Router,
    private quickSearchService: QuickSearchService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _toaster: CremToastService
  ) {}

  ngOnInit(): void {
    this.loading = true;
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
          if (res.success) {
            this.loading = false;
            if (res.data.listOfSearchResults.length) {
              this.searchResults = res.data.listOfSearchResults.filter(
                (object) => object.results.length
              );
            }
          }
        },
        (error: any) => {
          const message = 'Error occurred while getting Quick Search Results ';
          console.error('An error occurred: ', message, error);
          this._toaster.show(
            message ?? `An error occurred, please try again.`,
            'Error',
            ToastState.ERROR,
            {
              maxWidth: '360px',
              duration: 180000,
            }
          );
        }
      );
  }

  onRowClick(event: any) {
    const res = this.searchResults.filter((searchResult) => {
      if (searchResult.objectTypeType === this.selectedTab.title) return true;
    });

    const otid = parseInt(res[0].objectTypeId);
    this.router.navigate(['/v06/Forms/RenderForm.aspx'], {
      queryParams: { oid: event.data.OID, otid: otid, ottid: event.data.OTID },
    });
  }

  onSelectedTabChange(e: SelectedTab) {
    this.selectedTab = e;
  }
}
