/* eslint-disable linebreak-style */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable lines-between-class-members */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/prefer-default-export */
import {
  Component, OnInit, ViewChild, Input, ViewEncapsulation
} from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router, ActivatedRoute } from '@angular/router';
import { faPlus, faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { UtilitiesService } from '../../services/utilities.service';
import { BaseService } from '../../services/base.service';
import { PortfolioDropdownService } from '../../services/portfolio-dropdown.service';
import { DiscountRateService } from '../../services/discount-rate.service';
import { DiscountRateProfile } from '../../models/discount-rate-profile.model';
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver-es';
import { exportDataGrid } from 'devextreme/excel_exporter';

@Component({
  selector: 'app-discount-rate-profiles',
  templateUrl: './discount-rate-profiles.component.html',
  styleUrls: ['./discount-rate-profiles.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DiscountRateProfilesComponent implements OnInit {
  filterBuilderVisible = false;
  showClearFilters = false;
  appliedFilterCount = 0;
  masterGroupID: number;
  profiles: DiscountRateProfile[];
  searchText: string = null;
  annualRateTypes = [{ Id: 1, Name: 'APR' }, { Id: 2, Name: 'APY' }];
  customOperations: any[];
  loadingVisible = true;
  displayContent = false;
  showArchived = false;
  dateFormat = 'MM/dd/yyyy';
  dateTimeFormat = 'MM/dd/yyyy HH:mm';
  hasModuleRights = true;

  @ViewChild('DataGrid') dataGrid: DxDataGridComponent;

  faPlus = faPlus;
  faCaretDown = faCaretDown;

  constructor(public service: DiscountRateService,
    private portfolioService: PortfolioDropdownService,
    private baseService: BaseService,
    public activeRoute: ActivatedRoute,
    public router: Router) {
    this.customOperations = UtilitiesService.getCustomFilterOperation();
    const isEuroElement = document.getElementById('IsEuroDateFormat');

    if (!isEuroElement) {
      return;
    }

    this.service.isEuroDateFormat = isEuroElement.innerHTML.toLowerCase() === 'true';
  }

  ngOnInit(): void {
    this.baseService.HasUserModuleRight().subscribe(response => {
        this.hasModuleRights = response;
        if (this.hasModuleRights) {
          this.baseService.getUserRights().subscribe((result) => {
            this.service.userRights = Number(result);
          });
      
          this.activeRoute.paramMap.subscribe((params) => {
            this.masterGroupID = +params.get('masterGroupId');
          });
      
          if (this.portfolioService.portfolios === undefined
              || this.portfolioService.portfolios.length === 0) {
            this.portfolioService.getPortfolios().subscribe((result) => {
              this.portfolioService.portfolios = result.data;
              if (this.portfolioService.selectedPortfolio === undefined
                  || this.portfolioService.selectedPortfolio === null) {
                const filter = this.portfolioService.portfolios.filter(
                  (obj) => obj.masterGroupID === this.portfolioService.selectedPortfolioId
                );
      
                this.portfolioService.selectedPortfolioId = this.masterGroupID;
                this.portfolioService.selectedPortfolio = filter[0];
              }
            });
          }
      
          if (this.service.isEuroDateFormat) {
            this.dateFormat = 'dd.MM.yyyy';
            this.dateTimeFormat = 'dd.MM.yyyy HH:mm';
          }
        }
    });
  }

  populateDiscountRateProfiles(masterGroupID: number): void {
    this.loadingVisible = true;
    this.service.getDiscountRateProfiles(masterGroupID ?? this.masterGroupID)
      .subscribe((result) => {
        this.profiles = result.data;
        this.loadingVisible = false;
        this.displayContent = true;
      });
  }

  navigateToObject(e): void {
    this.router.navigate(['discountrateprofiles/edit', this.portfolioService.selectedPortfolioId, e.key], { relativeTo: this.activeRoute.parent, queryParamsHandling: 'merge' });
  }

  searchDataGrid(data): void {
    this.dataGrid.instance.searchByText(this.searchText);
  }

  calculateAppliedFilterCount(event): void {
    const filters = this.dataGrid.instance.getCombinedFilter(true);
    const isSearchByText = this.searchText != null && this.searchText !== '';
    if (filters) {
      if (isSearchByText) {
        if (filters.length > 3) {
          this.appliedFilterCount = 0;
          return;
        }
        if (Array.isArray(filters[2][0])) {
          if (this.checkForInclusiveFilter(filters, isSearchByText) === 1) {
            this.appliedFilterCount = 1;
          } else {
            this.appliedFilterCount = Math.floor((filters[2].length / 2)) + 1;
          }
        } else if (this.checkForInclusiveFilter(filters, isSearchByText) === 1) {
          this.appliedFilterCount = 1;
        } else {
          this.appliedFilterCount = Math.floor((filters[2].length / 2)) + 1;
        }
      } else if (Array.isArray(filters[0])) {
        if (this.checkForInclusiveFilter(filters, isSearchByText) === 1) {
          this.appliedFilterCount = 1;
        } else {
          this.appliedFilterCount = Math.floor((filters.length / 2)) + 1;
        }
      } else {
        this.appliedFilterCount = 1;
      }
    } else {
      this.appliedFilterCount = 0;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkForInclusiveFilter(filters, isSearchByText: boolean): number {
    if (isSearchByText) {
      const tempArrayOfNames = [];
      const tempArrayOfQualifiers = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < filters[2].length; i++) {
        if (Array.isArray(filters[2][i])) {
          if (tempArrayOfNames.indexOf(filters[2][i][0]) === -1) {
            tempArrayOfNames.push(filters[2][i][0]);
          }
        } else if (tempArrayOfQualifiers.indexOf(filters[2][i]) === -1) {
          tempArrayOfQualifiers.push(filters[2][i]);
        }
      }

      if (tempArrayOfNames.length === 1 && tempArrayOfQualifiers.length === 1) {
        return 1;
      }
      return 0;
    }
    const tempArrayOfNames = [];
    const tempArrayOfQualifiers = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < filters.length; i++) {
      if (Array.isArray(filters[i])) {
        if (tempArrayOfNames.indexOf(filters[i][0]) === -1) {
          tempArrayOfNames.push(filters[i][0]);
        }
      } else if (tempArrayOfQualifiers.indexOf(filters[i]) === -1) {
        tempArrayOfQualifiers.push(filters[i]);
      }
    }

    if (tempArrayOfNames.length === 1 && tempArrayOfQualifiers.length === 1) {
      return 1;
    }
    return 0;
  }

  toggleClearFilters(): void {
    this.showClearFilters = !this.showClearFilters;
  }

  clearGridFilters(e): void {
    e.stopPropagation();
    this.dataGrid.instance.clearFilter();
    this.searchText = '';
    this.showClearFilters = false;
    this.showArchived = true;
  }

  showFilterBuilder(): void {
    this.filterBuilderVisible = true;
  }

  exportDataGrid() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet');
    exportDataGrid({
      component: this.dataGrid.instance,
      worksheet: worksheet,
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer: BlobPart) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'CoStar_DiscountRateProfiles.xlsx');
      });
    });
  }

  showColumnChooser(): void {
    this.dataGrid.instance.showColumnChooser();
  }

  public addDiscountRateProfile(e) {
    this.router.navigate(['discountrateprofiles/add', this.portfolioService.selectedPortfolioId], { relativeTo: this.activeRoute.parent, queryParamsHandling: 'merge' });
  }

  public toggleArchiveFilter(e: MatSlideToggleChange): void {
    const showArchived = e.checked;

    if (showArchived) {
      this.dataGrid.instance.columnOption('active', 'filterValue', undefined);
    } else {
      this.dataGrid.instance.columnOption('active', 'filterValue', true);
    }
  }
}
