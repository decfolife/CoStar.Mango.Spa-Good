import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { quickSearchResults } from '../../models/interfaces/quick-search-results.interface';
import { QuickSearchService } from '../../services/quick-search.service';
import {
  ApiResponse,
  RedirectorLinks,
  RedirectorLink,
} from '../../models/interfaces/quick-search-results.interface';
import {
  CremToastService,
  SelectedTab,
} from '@mango/ui-shared/lib-ui-elements';
import { ToastState } from '@mango/data-models/lib-data-models';

@Component({
  selector: 'mango-quick-search',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  searchResults: quickSearchResults[];
  loading = true as boolean;
  selectedPanel = '' as string;
  redirectorLinks: RedirectorLink[];
  selectedTab: SelectedTab;
  private _skeletonInstances = 1;
  flikeclause: string;
  fmodule: number;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private quickSearchService: QuickSearchService,
    private _toaster: CremToastService
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.activatedRoute.queryParams.subscribe(
      (res) => {
        this.flikeclause = res['flikeclause'];
        this.fmodule = res['fmodule'];

        if (this.flikeclause && this.fmodule) {
          this.getSearchResultsData(this.flikeclause, this.fmodule);
          this.quickSearchService
            .getRedirectorLinkList()
            .subscribe((res: ApiResponse) => {
              this.redirectorLinks = (
                res.data as RedirectorLinks
              ).redirectorLinks;
            });
        } else {
          this.searchResults = [];
          this.loading = false;
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

  contentReady(event: any) {
    if (event.component.columnOption('OID', 'visible')) {
      event.component.columnOption('OID', 'visible', false);
    }

    if (event.component.columnOption('OTID', 'visible')) {
      event.component.columnOption('OTID', 'visible', false);
    }
  }

  getSearchResultsData(flikeclause: string, objectId: number) {
    this.quickSearchService
      .getQuickSearchResults(flikeclause, objectId)
      .subscribe(
        (res: any) => {
          if (res.success) {
            if (res.data.listOfSearchResults.length) {
              this.searchResults = res.data.listOfSearchResults.filter(
                (object) => object.results.length
              );
              this.loading = false;
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
