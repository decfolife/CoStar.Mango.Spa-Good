import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '@mango/core-shared';
import {
  ContactRecord,
  MANGO_SPA_DEFAULT_PAGE,
  Module,
  ObjectType,
  UserAuth,
} from '@mango/data-models/lib-data-models';
import { combineLatest, Observable, of, Subscription } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';

import { CookieService } from '@mango/core-shared/lib-core-shared';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { MatDialog } from '@angular/material/dialog';
import { EmulateUserPopupComponent } from './emulate-user-popup/emulate-user-popup.component';
import { DateCalculatorComponent } from './date-calculator/date-calculator.component';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';

@Component({
  selector: 'mango-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() quickSearchEvent = new EventEmitter<any>();

  productTitle = 'Real Estate Manager';
  searchObjectId = 99;
  currentContactID = -1;
  ContactObjectTypeTypeId = 500;
  currentUser$: Observable<UserAuth>;
  contactRecord$: Observable<ContactRecord>;
  hasMultipleContactRecords$: Observable<boolean>;
  hasMultipleProfiles$: Observable<boolean>;
  isEmulatedUser$: Observable<boolean>;
  showEmulateUserOption$: Observable<boolean>;
  showSwitchContactOption$: Observable<boolean>;
  showSwitchProfilesOption$: Observable<boolean>;
  filteredOptions;
  myControl = new UntypedFormControl();
  inputSubscription$;
  searchModules: Module[];
  ImageUrl$: Observable<string>;
  currentProfile = 'Default';
  private subs: Subscription[] = [];
  private isDateCalcOpen: boolean = false;
  private isUserPreferencesOpen: boolean = false;
  private redirectorLinks: any[] = null;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private dataService: DataService,
    private facade: MangoAppFacade
  ) {}

  ngOnInit() {
    this.setObservables();
    this.getSearchModules();

    this.subs.push(
      this.dataService.getRedirectorLinkList().subscribe((res) => {
        this.redirectorLinks = res.data;
      })
    );

    this.subs.push(
      this.myControl.valueChanges
        .pipe(
          debounceTime(250),
          switchMap((input) =>
            input && input.length > 2
              ? this.getTypeAheadData(input, this.searchObjectId)
              : of([])
          )
        )
        .subscribe(
          (res) => (this.filteredOptions = res),
          (error) =>
            console.log(
              'Error occurred while subscribing to typeahead data: ',
              error
            )
        )
    );
  }

  setObservables(): void {
    this.currentUser$ = this.facade.authenticatedUser$;
    this.hasMultipleContactRecords$ =
      this.facade.userHasMultipleContactRecords$;
    this.hasMultipleProfiles$ = this.facade.userHasMultipleProfiles$;
    this.contactRecord$ = this.facade.contactRecord$;
    this.isEmulatedUser$ = this.facade.isEmulatedUser$;
    this.facade.clientKey$.subscribe(
      (clientKey) =>
        (this.currentProfile =
          CookieService.getSharedInfoCookie(clientKey).ProfileName)
    );

    this.showEmulateUserOption$ = combineLatest([
      this.isEmulatedUser$,
      this.contactRecord$,
    ]).pipe(
      map(
        ([isEmulatedUser, contact]) =>
          !isEmulatedUser && contact.userRole === 0 && !environment.production
      )
    );

    this.showSwitchContactOption$ = combineLatest([
      this.hasMultipleContactRecords$,
      this.isEmulatedUser$,
    ]).pipe(
      map(
        ([hasMultipleContactRecords, isEmulatedUser]) =>
          hasMultipleContactRecords && !isEmulatedUser
      )
    );

    this.showSwitchProfilesOption$ = combineLatest([
      this.hasMultipleProfiles$,
      this.isEmulatedUser$,
    ]).pipe(
      map(
        ([hasMultipleProfiles, isEmulatedUser]) =>
          hasMultipleProfiles && !isEmulatedUser
      )
    );

    this.ImageUrl$ = this.facade.clientInfo$.pipe(
      filter((client) => !!client),
      map((client) => `${client.imageBaseUrl}${client.logoUri}`)
    );
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }

  getSearchModules() {
    this.dataService.getQuickSearchModules().subscribe(
      (res: any) => {
        if (res.success) {
          this.searchModules = res.data;
        }
      },
      (error: any) => {
        console.log(
          'Error occurred while getting Modules list for Quick Search: ',
          error
        );
      }
    );
  }

  getTypeAheadData(searchString: string, moduleId: number) {
    this.filteredOptions = [];
    return this.dataService.getTypeAheadResults(searchString, moduleId).pipe(
      map((res) => res.data),
      catchError((error) => {
        console.log('ERROR occurred while getting typeahead data: ', error);
        return of(error);
      })
    );
  }

  logout(): void {
    this.facade.logout(true);
  }

  logoClicked() {
    this.router.navigateByUrl(MANGO_SPA_DEFAULT_PAGE);
  }

  selectedOption(event) {
    this.search();
  }

  goToSwitchContact(): void {
    this.subs.push(
      this.facade.clientKey$
        .pipe(
          filter((clientKey) => !!clientKey),
          tap(() => this.facade.setLoading(true)),
          tap((clientKey) =>
            this.facade.goToExternalURL(
              `${environment.CAUrl}/${clientKey}?clientKey=${clientKey}&showMutliContactPopup=true`
            )
          )
        )
        .subscribe()
    );
  }

  goToSwitchProfiles(): void {
    this.subs.push(
      this.facade.clientKey$
        .pipe(
          filter((clientKey) => !!clientKey),
          tap(() => this.facade.setLoading(true)),
          tap((clientKey) =>
            this.facade.goToExternalURL(
              `${environment.cremBaseUrl.replace(
                '[CLIENT]',
                clientKey
              )}/v06/ProfileSelector.aspx?p=2`
            )
          )
        )
        .subscribe()
    );
  }

  moduleChange(e) {
    this.searchObjectId = e.target.value;
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
      this.quickSearchEvent.emit({
        searchStr: searchString,
        searchObjId: this.searchObjectId,
      });
    } else {
      console.log(
        'The search input is empty - enter a search criteria(a string)'
      );
    }
  }

  showEmulateUser() {
    this.dialog.open(EmulateUserPopupComponent, {
      width: '800px',
      height: '528px',
      panelClass: 'emulate-user-dialog',
      disableClose: true,
    });
  }

  stopEmulatingUser() {
    this.facade.stopEmulatingUser();
  }

  public showDateCalculatorDialog(): void {
    if (this.isDateCalcOpen) {
      return;
    }

    this.isDateCalcOpen = true;

    const dialogRef = this.dialog.open(DateCalculatorComponent, {
      hasBackdrop: false,
      height: '440px',
      width: '300px',
    });

    this.subs.push(
      dialogRef.afterClosed().subscribe(() => {
        this.isDateCalcOpen = false;
      })
    );
  }

  public showUserPreferencesDialog(): void {
    if (this.isUserPreferencesOpen) {
      return;
    }

    this.isUserPreferencesOpen = true;

    let dialogRef = this.dialog.open(UserPreferencesComponent, {
      hasBackdrop: true,
      height: '750px',
      width: '920px',
      data: { contactRecord: this.contactRecord$ },
    });

    this.subs.push(
      dialogRef.afterClosed().subscribe(() => {
        this.isUserPreferencesOpen = false;
      })
    );
  }

  redirectToContactRecord() {
    this.contactRecord$.subscribe((u) => {
      this.currentContactID = u.contactID;
      const currURL = this.findUrl(
        this.currentContactID,
        ObjectType.CONTACT,
        this.ContactObjectTypeTypeId
      );
      document.location.href = currURL;
    });
  }

  findUrl(
    objectId: number,
    objectTypeId: number,
    objectTypeTypeId: number
  ): string {
    let found = this.redirectorLinks.find(
      (x) =>
        x.objectTypeId === objectTypeId &&
        x.objectTypeTypeId === objectTypeTypeId
    );

    found =
      found ??
      this.redirectorLinks.find((x) => x.objectTypeId === objectTypeId);

    let urlLink = found ? found.urlLink : 'not found';
    urlLink = urlLink
      .replace(/\[OID\]/, objectId)
      .replace(/\[OTID\]/, objectTypeId)
      .replace(/\[OTTID\]/, objectTypeTypeId);

    return urlLink;
  }

  ngOnDestroy() {
    this.subs.forEach((s) => s.unsubscribe());
  }
}
