import { CommonModule, Location } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Renderer2,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  ButtonModule,
  DropdownModule,
  LibUiElementsModule,
  LoaderModule,
  ModalModule,
  PageHeaderComponent,
  ToastComponent,
} from '@mango/ui-shared/lib-ui-elements';
import {
  DxDataGridComponent,
  DxDataGridModule,
  DxLoadPanelModule,
} from 'devextreme-angular';
import {
  BehaviorSubject,
  EMPTY,
  Observable,
  Subscription,
  combineLatest,
  of,
} from 'rxjs';
import {
  catchError,
  filter,
  finalize,
  map,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';

import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';
import { AmIVisibleDirective } from '@forms/am-ivisible.directive';
import { ISection } from '@forms/model/dynamic-forms.interface';
import { DynamicFormsService } from '@forms/services/dynamic-forms.service';
import {
  IChangeLossPreventedComponent,
  MangoDialogService,
} from '@mango/core-shared';
import {
  BreadCrumb,
  ContactRecord,
  Pill,
  RenderFormHeaderData,
  StatusPill,
  ToastState,
} from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { DynamicFormSectionComponent } from './dynamic-form-sections/dynamic-form-section.component';
import { ListPageService } from '@list-pages/components/listpage/core/services/listpage.service';
import { CopyLeaseComponent } from '@forms/modals/copy-lease/copy-lease.component';

@Component({
  selector: 'mango-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    AmIVisibleDirective,
    DynamicFormSectionComponent,
    ReactiveFormsModule,
    LibUiElementsModule,
    SearchModule,
    ButtonModule,
    MatIconModule,
    DxDataGridModule,
    DxLoadPanelModule,
    ModalModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDialogModule,
    LoaderModule,
    DropdownModule,
    ToastComponent,
    PageHeaderComponent,
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  providers: [ListPageService],
})
export class DynamicFormComponent
  implements OnInit, OnDestroy, IChangeLossPreventedComponent
{
  private readonly subs = new Subscription();
  private readonly SECTIONS_INITIAL_LOAD_COUNT = 6;

  @ViewChild('availableSectionsGrid')
  availableSectionsGrid: DxDataGridComponent;
  @ViewChild('dynamicFormContent') dynamicFormContent: ElementRef;
  @ViewChildren(DynamicFormSectionComponent)
  childForms: QueryList<DynamicFormSectionComponent>;

  form: FormGroup;
  sectionsVisible: ISection[] = [];
  lastVisibleIndex = 0;
  externalCremLink: string;

  // State flags
  isLoading = false;
  errorLoading = false;
  isRenderForm = false;
  editMode = false;
  hasParentObjectLinker = false;
  isAddingSection = false;
  isToastVisible = false;
  hasChanges = false;

  // Form data
  userMessage = '';
  formId?: number;
  objectId: number;
  objectTypeId: number;
  objectTypeTypeId: number;
  sectionIdToBeAdded = 0;
  toastMessageHeader = '';
  toastState: ToastState;
  statusPillInfo: StatusPill;

  private currentUserInfo$: Observable<ContactRecord>;
  isSuperUser: boolean = false;

  readonly selectFormActions$ = this.dynamicFormsFacade.selectedFormActions$;
  readonly selectAvailableFormSections$ =
    this.dynamicFormsFacade.selectAvailableFormSections$;
  readonly selectFormSections$ = this.dynamicFormsFacade.selectFormSections$;
  readonly selectFormName$ = this.dynamicFormsFacade.selectFormName$;
  readonly breadcrumbs$ = this.mangoAppFacade.breadcrumbs$;
  readonly dropdownFormActions$ = this.returnActionsDropdown();
  readonly buttonFormActions$ = this.returnActionsButtons();

  public googleMapAPIKey: any;
  public googleMappingChannel: any;
  public canLoadMap: boolean = false;

  public formTitle: string = '';

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private dynamicFormsFacade: DynamicFormsFacade,
    private mangoAppFacade: MangoAppFacade,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: MangoDialogService,
    private dialog: MatDialog,
    private listpageService: ListPageService,
    private renderer2: Renderer2,
    private dynamicFormsService: DynamicFormsService
  ) {}

  tryPreventChangeLoss(): Observable<boolean> {
    return this.handleChangeLossPrevention();
  }

  ngOnInit(): void {
    this.initializeForm();
    this.setupInitialState();
    this.statusPillInfo = this.getStatus();

    this.currentUserInfo$ = this.mangoAppFacade.contactRecord$;
    this.subs.add(
      this.currentUserInfo$.subscribe((contact) => {
        this.isSuperUser =
          contact.userRoleName.toLowerCase().trim() == 'superuser'
            ? true
            : false;
      })
    );

    this.configGoogleMapKey();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      formName: [''],
      objectType: [''],
    });
  }

  private setupInitialState(): void {
    this.isLoading = true;
    this.showOldDynamicFormLink();
    this.handleRouting();
    this.registerFormSaving();
  }

  private handleRouting(): void {
    this.handleNavigationEvents();
    this.handleRouteParams();
  }

  private handleNavigationEvents(): void {
    this.subs.add(
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          map(() => {
            let route = this.router.routerState.root;
            while (route.firstChild) route = route.firstChild;
            return route;
          }),
          filter((route) => route.outlet === 'primary'),
          map((route) =>
            route.snapshot.url.map((segment) => segment.path).join('/')
          ),
          filter((url) => url.includes('render-form'))
        )
        .subscribe(() => window.location.reload())
    );
  }

  private handleRouteParams(): void {
    this.subs.add(
      this.route.params.subscribe(() => {
        const segments = this.route.snapshot.url;
        this.isRenderForm = segments.some(
          (segment) => segment.path === 'render-form'
        );

        const queryParams = this.toLowerParams(this.route.snapshot.queryParams);
        this.setQueryParams(queryParams);

        this.load();
      })
    );
  }

  private setQueryParams(params: Params): void {
    this.objectId = Number(this.removeEndingQueryString(params['oid']));
    this.objectTypeId = Number(this.removeEndingQueryString(params['otid']));
    this.objectTypeTypeId = Number(
      this.removeEndingQueryString(params['ottid'])
    );
    this.formId = Number(this.removeEndingQueryString(params['fid']));
  }

  private removeEndingQueryString(value: string) {
    const questionMarkIndex = value.indexOf('?');
    if (questionMarkIndex < 0) return value;

    const returnValue = value.substring(0, questionMarkIndex);

    return returnValue;
  }

  private load(): void {
    if (!this.formId) return;

    this.dynamicFormsFacade.loadDynamicForm(this.formId, this.objectId);
    this.handleDynamicFormResponse();
  }

  private handleDynamicFormResponse(): void {
    this.subs.add(
      this.dynamicFormsFacade.selectDynamicFormApiResponse$
        .pipe(
          filter((res) => res.dynamicFormApiResponse !== null),
          take(1),
          switchMap(({ dynamicFormApiResponse }) => {
            if (!dynamicFormApiResponse.success) {
              return this.handleError(dynamicFormApiResponse);
            }
            return this.handleSuccess(dynamicFormApiResponse.data);
          }),
          catchError((error) => this.handleLoadError(error)),
          finalize(() => (this.isLoading = false))
        )
        .subscribe()
    );
  }

  private returnActionsDropdown(): Observable<any> {
    return this.selectFormActions$.pipe(
      map((formAction) => {
        if (!!formAction) {
          let filteredFormActions = formAction.filter(
            (fa) => fa.formActionGroup === 'sActionMenu'
          );
          return filteredFormActions;
        }

        return formAction;
      })
    );
  }

  private returnActionsButtons(): Observable<any> {
    return this.selectFormActions$.pipe(
      map((formAction) => {
        if (!!formAction) {
          let filteredFormActions = formAction.filter(
            (fa) => fa.formActionGroup === 'sButtons'
          );
          let buttonsDataList = [];
          filteredFormActions.forEach((ffa) => {
            let buttonColor =
              ffa.formActionLabel === 'Save' || ffa.formActionLabel === 'Apply'
                ? 'primary'
                : 'secondary';

            buttonsDataList.push({
              id: `dynamic_button_${ffa.formActionLabel}_id`,
              text: ffa.formActionLabel,
              color: buttonColor,
            });
          });

          return buttonsDataList;
        }

        return [];
      })
    );
  }

  showPropertyHeaderAndUpdateBreadcrumbName(): void {
    const firstBreadCrumb = this.populateFirstBreadCrumb();
    const formNameSubject = new BehaviorSubject<string | null>(null);

    const selectFormNameSubscription = this.dynamicFormsFacade.selectFormName$
      .pipe(filter((formData) => formData !== null))
      .subscribe((formName) => {
        formNameSubject.next(formName);
        const renderFormHeaderData = new RenderFormHeaderData(true, {
          formName,
          objectTypeId: this.objectTypeId,
        });
        window.dispatchEvent(
          new CustomEvent('RenderFormShowPropertyHeader', {
            detail: renderFormHeaderData,
          })
        );
      });

    const combinedSubscription = combineLatest([
      formNameSubject,
      this.mangoAppFacade.breadcrumbs$.pipe(take(1)),
    ]).subscribe(([formName, breadCrumbs]: [string | null, BreadCrumb[]]) => {
      if (breadCrumbs?.length && formName) {
        this.updateBreadcrumbs(breadCrumbs, firstBreadCrumb, formName);
      }
    });

    this.subs.add(selectFormNameSubscription);
    this.subs.add(combinedSubscription);
  }

  private updateBreadcrumbs(
    breadCrumbs: BreadCrumb[],
    firstBreadCrumb: BreadCrumb,
    formName: string
  ): void {
    const updatedBreadcrumbs: BreadCrumb[] = [];
    let firstAdded = false;

    for (const breadcrumb of breadCrumbs) {
      if (!firstAdded) {
        updatedBreadcrumbs.push(firstBreadCrumb);
        firstAdded = true;
      }
      if (breadcrumb.url === '/crem/forms/render-form') {
        updatedBreadcrumbs.push({
          ...breadcrumb,
          label: formName,
          activeLink: firstBreadCrumb.activeLink,
        });
      }
    }

    this.mangoAppFacade.setBreadcrumbs(updatedBreadcrumbs);
  }

  populateFirstBreadCrumb(): BreadCrumb {
    const breadcrumbMap: { [key: number]: BreadCrumb } = {
      1: this.createDefaultBreadCrumb(
        'Projects',
        this.router.serializeUrl(
          this.router.createUrlTree(['crem', 'projects', 'projects'])
        ),
        'Tasks'
      ),
      3: this.createDefaultBreadCrumb(
        'Buildings',
        this.router.serializeUrl(
          this.router.createUrlTree(['crem', 'portfolio', 'buildings'])
        ),
        'Building'
      ),
      4: this.createDefaultBreadCrumb(
        'Leases',
        this.router.serializeUrl(
          this.router.createUrlTree(['crem', 'portfolio', 'leases'])
        ),
        'Abstract'
      ),
      5: this.createDefaultBreadCrumb(
        'Contacts',
        this.router.serializeUrl(
          this.router.createUrlTree(['crem', 'contacts', 'contacts-list'])
        ),
        'Contacts'
      ),
    };

    return (
      breadcrumbMap[this.objectTypeId] ||
      this.createDefaultBreadCrumb('', '', '')
    );
  }

  toggleEditViewMode() {
    this.editMode = !this.editMode;
  }

  private createDefaultBreadCrumb(
    label: string,
    url: string,
    activeLink: string
  ): BreadCrumb {
    return { label, url, activeLink };
  }

  getMoreSections(visible: boolean, sectionId: number): void {
    if (
      !this.isRenderForm ||
      !visible ||
      sectionId !== this.sectionsVisible.length
    ) {
      return;
    }

    this.subs.add(
      this.selectFormSections$
        .pipe(
          filter((sections) => sections !== null),
          take(1)
        )
        .subscribe((sections) => {
          this.loadMoreSections(sections);
        })
    );
  }

  handleHasParentObjectLinkerChange(value: boolean): void {
    if (!this.hasParentObjectLinker) {
      this.hasParentObjectLinker = value;
      this.dynamicFormsFacade.loadParentLink(this.objectId, this.objectTypeId);
    }
  }

  designModeClicked(): void {
    this.router.navigate(['/crem/forms/admin-forms/dynamic-form'], {
      relativeTo: this.route,
      queryParams: { FID: this.formId },
      queryParamsHandling: 'merge',
    });
  }

  scrollToTop(): void {
    document
      .getElementById('scroll-to-top-div')
      ?.scrollIntoView({ behavior: 'smooth' });
  }

  close(): void {
    this.location.back();
  }

  getTabTitle(): string {
    if (!this.isRenderForm) {
      const objectType = this.form.get('objectType')?.value?.toUpperCase();
      const titleMap: { [key: string]: string } = {
        LEASE: 'Lease Abstract',
        BUILDING: 'Building Details',
        CONTACT: 'Contact Details',
      };
      return titleMap[objectType] || 'Default Content';
    }
    return this.form.get('objectType')?.value || '';
  }

  getPageTitle(): string {
    let pageTitle = '';
    this.selectFormName$.pipe(take(1)).subscribe((res) => (pageTitle = res));
    this.formTitle = pageTitle;
    return pageTitle;
  }

  getStatus(): StatusPill {
    let statusPill = {} as StatusPill;

    this.subs.add(
      this.dynamicFormsService
        .getLockingInfo(this.objectId, this.objectTypeId)
        .subscribe((res) => {
          if (res != null && res.success && res.data != null) {
            if (!res.data.leaseActive) {
              statusPill.text = 'Archived';
              statusPill.type = Pill.BASIC;
            } else if (res.data.isLocked) {
              statusPill.text = 'Locked';
              statusPill.type = Pill.BASIC;
              statusPill.titleOnHover = res.data.lockedReason;
            }
          }
        })
    );

    return statusPill;
  }

  trackBySection(_: number, section: ISection): number {
    return section.formSectionID;
  }

  searchAvailableSectionsDataGrid(searchText: string): void {
    this.availableSectionsGrid.instance.searchByText(searchText);
  }

  onActionButtonClick(buttonLabel: string) {
    switch (buttonLabel.toLowerCase()) {
      case 'edit': {
        this.editMode = true;
        this.dynamicFormsFacade.loadFormActions(
          this.formId,
          this.objectId,
          this.objectTypeId,
          this.objectTypeTypeId,
          this.editMode
        );
        break;
      }
      case 'save':
      case 'cancel': {
        this.editMode = false;
        this.dynamicFormsFacade.loadFormActions(
          this.formId,
          this.objectId,
          this.objectTypeId,
          this.objectTypeTypeId,
          this.editMode
        );
        break;
      }
      default: {
        break;
      }
    }
  }

  private loadMoreSections(sections: any[]): void {
    const currentLength = this.sectionsVisible.length;
    const endLimit = currentLength + this.SECTIONS_INITIAL_LOAD_COUNT;
    const endIndex = Math.min(endLimit, sections.length);

    const filteredSections = sections
      .slice(this.lastVisibleIndex, endIndex)
      .map((section, index) => ({
        ...section,
        id: currentLength + index + 1,
      }));

    this.sectionsVisible = [...this.sectionsVisible, ...filteredSections];
    this.lastVisibleIndex = endIndex;
  }

  private handleLoadError(error: any): Observable<null> {
    console.error('Error loading dynamic form:', error);
    this.errorLoading = true;
    this.userMessage = 'Error loading dynamic form';
    return of(null);
  }

  private handleSuccess(formData: any): Observable<null> {
    this.loadFormData(formData);
    return of(null);
  }

  private handleError(response: any): Observable<null> {
    this.errorLoading = true;
    if (response.statusCode === 403) {
      this.userMessage = response.clientErrorMessage;
    }
    return EMPTY;
  }

  private loadFormData(formData: any): void {
    this.dynamicFormsFacade.loadFormSections(this.formId);
    this.handleFormSectionsLoad();
    this.dynamicFormsFacade.loadFormActions(
      this.formId,
      this.objectId,
      this.objectTypeId,
      this.objectTypeTypeId,
      this.editMode
    );

    if (!this.isRenderForm) {
      this.loadDesignModeData(formData);
    } else {
      this.loadRenderModeData(formData);
    }
  }

  private loadDesignModeData(formData: any): void {
    this.dynamicFormsFacade.loadAvailableSections(
      this.formId,
      formData.objectTypeId
    );
    this.dynamicFormsFacade.loadAvailableFields(
      this.formId,
      formData.objectTypeId
    );
    this.dynamicFormsFacade.loadFormItemControlTypes();
    this.dynamicFormsFacade.loadFormItemDataTypes();
    this.dynamicFormsFacade.loadFormItemDatabaseTables();
  }

  private loadRenderModeData(formData: any): void {
    this.dynamicFormsFacade.setObjectId(this.objectId);
    this.dynamicFormsFacade.loadRenderForm(
      formData.formId,
      this.objectId,
      formData.objectTypeId
    );
    this.dynamicFormsFacade.setisRenderForm(this.isRenderForm);
    this.showPropertyHeaderAndUpdateBreadcrumbName();
    this.form.patchValue(formData);
  }

  private toLowerParams(params: Params): Params {
    return Object.keys(params).reduce((acc, key) => {
      acc[key.toLowerCase()] = params[key];
      return acc;
    }, {} as Params);
  }

  private registerFormSaving(): void {
    this.subs.add(
      this.dynamicFormsFacade.selectRenderFormResponse$
        .pipe(
          filter((response) => !!response.selectRenderFormResponse),
          map((response) => {
            this.toastMessageHeader = response.selectRenderFormResponse.success
              ? 'Successfully Saved'
              : 'Error Saving';
            this.toastState = response.selectRenderFormResponse.success
              ? ToastState.SUCCESS
              : ToastState.ERROR;
            this.showToast();
          }),
          catchError(() => {
            this.toastMessageHeader = 'Error Saving';
            this.toastState = ToastState.ERROR;
            this.showToast();
            return of(null);
          })
        )
        .subscribe()
    );
  }

  private showToast(): void {
    setTimeout(() => {
      this.isToastVisible = true;
    });
  }

  private showOldDynamicFormLink(): void {
    const renderFormParams = this.router.url.split('?')[1];
    this.subs.add(
      this.mangoAppFacade.clientKey$.subscribe((clientKey) => {
        this.externalCremLink = `${environment.cremBaseUrl.replace(
          '[CLIENT]',
          clientKey
        )}/v06/Forms/OldRenderForm.aspx?${renderFormParams}`;
      })
    );
  }

  private handleFormSectionsLoad(): void {
    this.subs.add(
      this.selectFormSections$
        .pipe(filter((sections) => sections !== null))
        .subscribe((sections) => {
          if (this.isRenderForm) {
            this.handleRenderFormSections(sections);
          } else {
            this.handleDesignFormSections(sections);
          }
        })
    );
  }

  private handleRenderFormSections(sections: any[]): void {
    const initialSections = sections
      .slice(0, this.SECTIONS_INITIAL_LOAD_COUNT)
      .map((section, index) => ({
        ...section,
        id: index + 1,
      }));

    this.sectionsVisible = [...this.sectionsVisible, ...initialSections];
    this.lastVisibleIndex = this.SECTIONS_INITIAL_LOAD_COUNT;
  }

  private handleDesignFormSections(sections: any[]): void {
    if (this.isAddingSection) {
      this.handleSectionAddition(sections);
    } else {
      this.sectionsVisible = [...this.sectionsVisible, ...sections];
      this.lastVisibleIndex = this.SECTIONS_INITIAL_LOAD_COUNT;
    }
  }

  private handleSectionAddition(sections: any[]): void {
    const sectionsArray = Object.values(sections);
    const sectionToBeAdded = sectionsArray.find(
      (item) => item.formSectionID === this.sectionIdToBeAdded
    );

    if (sectionToBeAdded) {
      this.sectionsVisible = [...this.sectionsVisible, sectionToBeAdded];
      this.isAddingSection = false;
      this.sectionIdToBeAdded = 0;
    }
  }

  // Handle Browser Native Navigation events
  @HostListener('window:beforeunload', ['$event'])
  async windowBeforeUnload($event: any): Promise<void> {
    if (this.hasChanges) $event.preventDefault();
  }

  handleChangeLossPrevention(
    { title, message }: { title?: string; message?: string } = {
      message: null,
      title: null,
    }
  ) {
    if (this.hasChanges) {
      this.mangoAppFacade.setChangeLossPreventIsActive(true);
      return this.dialogService
        .confirm(
          title ?? 'Changes Made!',
          message ??
            'Changes you made have not been saved. Would you like to continue editing or leave?',
          'Continue',
          'Leave'
        )
        .pipe(map((continueEdit) => !continueEdit));
    }

    return of(true);
  }

  markAsChanged() {
    this.hasChanges = true;
  }

  configGoogleMapKey() {
    this.subs.add(
      combineLatest([
        this.listpageService.getGoogleMapAPIKey(),
        this.listpageService.getGoogleMappingChannel(),
      ])
        .pipe(
          filter(([gmk, gmc]) => !!gmk && !!gmc),
          tap(([gmk, gmc]) => {
            this.googleMapAPIKey = gmk.data.googleMapAPIKey;
            this.googleMappingChannel = gmc.data.googleMappingChannel;
            this.loadGoogleMapsAPIScript();
          })
        )
        .subscribe()
    );
  }

  loadGoogleMapsAPIScript() {
    const googleUrl = `https://maps.googleapis.com/maps/api/js?key=${this.googleMapAPIKey}&channel=${this.googleMappingChannel}`;
    const s = this.renderer2.createElement('script');
    s.type = 'text/javascript';
    s.src = googleUrl;
    s.async = true;
    this.renderer2.appendChild(document.body, s);
    this.canLoadMap = true;
  }

  performFormAction(action: any) {
    //This code will be refactored to add more functions
    if (action.formActionLabel.toLowerCase().trim() == 'copy') {
      if (this.objectTypeId == 4) {
        this.copyLease();
      } else {
        return;
      }
    }
  }

  copyLease() {
    this.dialog.open(CopyLeaseComponent, {
      height: '400px',
      width: '800px',
      panelClass: 'df-addLeasePopup',
      data: {
        lease: this.formTitle,
        leaseId: this.objectId,
      },
      disableClose: true,
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getFormId() {
    // this format is driven by the API
    return `dynamic-form_${this.formId}`;
  }

  getFormSectionId(section) {
    // this format is driven by the API
    return `dynamic-form_section_${section.formSectionID}`;
  }
}
