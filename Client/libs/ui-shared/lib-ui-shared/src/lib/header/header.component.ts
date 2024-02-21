import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from '@mango/core-shared/lib-core-shared';
import { DataService } from '@mango/core-shared';
import { ContactRecord, MANGO_SPA_DEFAULT_PAGE, UserAuth } from '@mango/data-models/lib-data-models';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, debounceTime, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';

import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { MatDialog } from '@angular/material/dialog';
import { EmulateUserPopupComponent } from './emulate-user-popup/emulate-user-popup.component';
import { DateCalculatorComponent } from './date-calculator/date-calculator.component';

export interface module {
  objectTypeTypeId: number;
  objectTypeType: string;
}

@Component({
  selector: 'mango-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() quickSearchEvent = new EventEmitter<any>();

  productTitle: string = 'Real Estate Manager';
  searchObjectId: number = 99;
  currentUser$: Observable<UserAuth>;
  contactRecord$: Observable<ContactRecord>;
  filteredOptions;
  myControl = new UntypedFormControl();
  inputSubscription$;
  searchModules: module[];
  ImageUrl$: Observable<string>;
  private subs: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private headerService: HeaderService,
    private dataService: DataService,
    private facade: MangoAppFacade
  ) { }

  ngOnInit() {
    this.currentUser$ = this.facade.authenticatedUser$;
    this.contactRecord$ = this.facade.contactRecord$;
    this.ImageUrl$ = this.facade.userClient$.pipe(
      filter(client => !!client),
      map(client => `${client.imageBaseUrl}${client.logoUri}`)
    )

    this.getSearchModules();
    this.subs.push(this.myControl.valueChanges
      .pipe(
        //tap((data: string) => console.log("Data tapped: ", data)),  //leaving this comment, it helps for debugging
        debounceTime(250),
        switchMap(input => ((input && input.length > 2) ? this.getTypeAheadData(input, this.searchObjectId) : of([])))
      )
      .subscribe(
        (res => this.filteredOptions = res),
        (error => console.log("Error occurred while subscribing to typeahead data: ", error))
      )
    );
  }

  getSearchModules() {
    this.dataService.getQuickSearchModules().subscribe(
      (res: any) => {
        if (res.success) {
          this.searchModules = res.data;
        }
      },
      (error: any) => {
        console.log('Error occurred while getting Modules list for Quick Search: ', error)
      }
    );
  }

  getTypeAheadData(searchString: string, moduleId: number) {
    this.filteredOptions = [];
    return this.dataService.getTypeAheadResults(searchString, moduleId).pipe(
      map(res => res.data),
      catchError(error => {
        console.log("ERROR occurred while getting typeahead data: ", error);
        return of(error);
      }
      )
    );
  }

  logout(): void {
    this.facade.logout()
  }

  logoClicked() {
    this.router.navigateByUrl(MANGO_SPA_DEFAULT_PAGE);
  }

  selectedOption(event) {
    this.search();
  }

  moduleChange(e) {
    this.searchObjectId = e.value;
    this.search();
  }

  inputBlurred() {
    this.filteredOptions = [];
  }

  search() {
    this.inputBlurred();
    let searchString;

    if (this.myControl.value) { 
      searchString = this.myControl.value.toLowerCase().trim(); 
    }

    if (searchString) {
      this.filteredOptions = [];
      this.quickSearchEvent.emit({ searchStr: searchString, searchObjId: this.searchObjectId });
    } else {
      console.log("The search input is empty - enter a search criteria(a string)");
    }
  }

  showEmulateUser() {
    const dialogRef = this.dialog.open(EmulateUserPopupComponent, {
      width: '800px',
      height: '528px',
      panelClass: 'emulate-user-dialog',
      disableClose: true
    });
  }

  public showDateCalculatorDialog() {

    let dialogRef = this.dialog.open(DateCalculatorComponent, {
      hasBackdrop: false,
      height: '350px',
      width: '450px',
    });
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }
}
