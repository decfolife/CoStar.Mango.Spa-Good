import { CommonModule, formatDate } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';
import { DynamicFormEditFieldDialogComponent } from '@forms/admin-render-forms/dynamic-form-edits/dynamic-form-edit-field-dialog/dynamic-form-edit-field-dialog.component';
import {
  IFieldDetails,
  IFields,
  ISection,
  RenderFormItemDetails,
} from '@forms/model/dynamic-forms.interface';
import { UseDynamicFormFieldConfigDirective } from '@forms/pipes/use-dynamic-form-field-config.pipe';
import { DynamicFormsService } from '@forms/services/dynamic-forms.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { ListPageService } from '@list-pages/components/listpage/core/services/listpage.service';
import {
  MapDataRequest,
  Marker,
} from '@list-pages/components/listpage/shared/models';
import { SearchModule } from '@mango/ui-shared/cosmos';
import {
  ButtonModule,
  CremRadioComponent,
  CremRadioGroupComponent,
  DatePickerModule,
  DropdownModule,
  FieldHistoryComponent,
  IconModule,
  InputComponent,
  InputLabelComponent,
  LibUiElementsModule,
  LoaderModule,
  ModalModule,
  SkeletonModule,
} from '@mango/ui-shared/lib-ui-elements';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { environment } from '@mangoSpa/src/environments/environment.local';
import { DxDataGridComponent, DxListModule } from 'devextreme-angular';
import { DxSortableTypes } from 'devextreme-angular/ui/sortable';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
import { CheckBoxComponent } from 'libs/ui-shared/lib-ui-elements/src/lib/checkbox';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import {
  Observable,
  Subject,
  Subscription,
  combineLatest,
  from,
  of,
} from 'rxjs';
import {
  concatMap,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
  toArray,
} from 'rxjs/operators';
import { FieldsControlService } from '../../../services/fields-control.service';
import { DynamicFormFieldDocSecPageComponent } from '../dynamic-form-fields/dynamic-form-field-doc-sec-page/dynamic-form-field-doc-sec-page.component';
import { DynamicFormWidgetComponent } from '../dynamic-form-widgets/dynamic-form-widget.component';
import { DynamicFormComponent } from '../dynamic-form.component';
import {
  ParseFormItemParametersPipe,
  transform as parseFormItemParametersPipeTransform,
} from '../pipes/parse-form-item-parameters';
import { isTruthy, MangoDialogService } from '@mango/core-shared';
import { isNumeric } from 'rxjs/util/isNumeric';
import { DomSanitizer } from '@angular/platform-browser';
import {
  FieldHistoryDataSource,
  ObjectType,
  ObjectTypeType,
} from '@mango/data-models/lib-data-models';
import { FormWizardService } from '@micro-components/services/form-wizard.service';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

export class tempList {
  columnNum: number;
  listOfFields: IFields[];
}

type DxoItemDraggingProperties = DxSortableTypes.Properties;

// map for radio button values
const booleanStringMap = {
  ['True']: '1',
  ['False']: '0',
};

@Component({
  selector: 'mango-dynamic-form-section',
  standalone: true,
  templateUrl: './dynamic-form-section.component.html',
  styleUrls: ['./dynamic-form-section.component.scss'],
  providers: [FieldsControlService, ListPageService],
  imports: [
    CommonModule,
    DynamicFormWidgetComponent,
    DynamicFormFieldDocSecPageComponent,
    ReactiveFormsModule,
    LibUiElementsModule,
    ScreenLoaderModule,
    SearchModule,
    ButtonModule,
    MatIconModule,
    ModalModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
    LoaderModule,
    MatDialogModule,
    MatCardModule,
    DropdownModule,
    DevExpressModule,
    DxListModule,
    InputComponent,
    SkeletonModule,
    DynamicFormEditFieldDialogComponent,
    InputLabelComponent,
    FieldHistoryComponent,
    DatePickerModule,
    IconModule,
    CremRadioGroupComponent,
    CheckBoxComponent,
    CremRadioComponent,
    UseDynamicFormFieldConfigDirective,
    ParseFormItemParametersPipe,
    GoogleMapsModule,
  ],
  animations: [
    trigger('expandCollapse', [
      state(
        'collapsed',
        style({ height: '0px', overflow: 'hidden', opacity: 0 })
      ),
      state('expanded', style({ height: '*', opacity: 1 })),
      transition('collapsed <=> expanded', animate('300ms ease-in-out')),
    ]),
  ],
})
export class DynamicFormSectionComponent
  implements OnInit, OnDestroy, OnChanges
{
  @ViewChild('availableFieldsGrid') availableFieldsGrid: DxDataGridComponent;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChildren('SectionMenuItem') menuItemsElements: QueryList<ElementRef>;
  @ViewChild('sectionTitle') sectionTitle: ElementRef;

  /**
   * Interact with Dynamic Form Widget (data grid)
   *
   * @type {ElementRef<>}
   * @memberof DynamicFormSectionComponent
   */
  @ViewChild(DynamicFormWidgetComponent)
  dynamicFormWidget: DynamicFormWidgetComponent;

  /**
   * This is used with Dynamic Form widget to show the download button on the card's header
   *
   * @private
   * @memberof DynamicFormSectionComponent
   */
  private canShowDownload = false as boolean;

  private currentSecMenuFocusIndex = 0;
  private subs: Subscription = new Subscription();
  private destroy$ = new Subject<void>();

  @Input() section!: ISection;
  @Input() form!: FormGroup;
  @Input() editMode: boolean;
  @Input() isRenderForm: boolean;
  @Input() hidePremise: boolean;
  @Input() hasParentObjectLinker = false as boolean;
  @Input() isSuperUser = false as boolean;
  @Input() canLoadMap = false as boolean;
  @Input() allFormItemsKeys: RenderFormItemDetails[];
  @Output() hasParentObjectLinkerChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Input() formGroupName: string;
  childForm: FormGroup = new FormGroup({});

  faCog = faCog;
  sampleRadioItems: string[] = ['Option A', 'Option B', 'Option C'];
  tempList: tempList[] = [];

  formId?: number;
  objectId: number;
  objectTypeId: number;
  objectTypeTypeId: number;

  isLoading: boolean;

  /**
   * Controls how many instances of the skeleton to show per card
   *
   * @private
   * @type {number}
   * @memberof DynamicFormSectionComponent
   */
  private _skeletonInstances: number;

  /**
   * Controls the card expansion state
   *
   * @memberof DynamicFormSectionComponent
   */
  isExpanded = true as boolean;
  private canExpand: boolean;
  showLoader: boolean;
  hasChanges: boolean;

  selectedFormItem: IFields;
  formItemPopupTitle: string;
  formSectionPopupVisible: boolean;
  isDropdownValuesLoading = false;
  initialData: any;
  sectionFields$: Observable<IFields[]>;
  selectAvailableFormFieldsBySectionId$: Observable<IFields[]>;
  dropdownValues$: Observable<any[]>;

  selectRenderFormData: any;
  validationErrors: any;
  showParentLinker = false;
  showSectionHeader = true;
  sectionLabelMenuEntered = false as boolean;
  sectionLabelMenuOpened = false as boolean;
  sectionLabelEntered = false as boolean;
  externalCremLink: string;
  clientKey = '' as string;
  sectionEditUrl = '' as string;
  formItemDetailsUrl = '' as string;

  selectRenderParentLink$ = this.dynamicFormsFacade.selectRenderParentLink$;
  dateFormatPreference$ = this.mangoFacade.dateFormatPreference$;
  private dateFormatPreferenceValue: string;
  isTruthy = isTruthy;

  //*********** Google Maps ***************/

  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    zoom: 15,
    maxZoom: 20,
    minZoom: 0,
  };
  zoom = 4;
  loadMapFlag$: Observable<boolean>;
  markers: Marker[];
  advMarkers: any;
  objectTypeText = '';
  //*** end Google maps */

  dfHelpTextToggle = false as boolean;

  //*****************field-history*******************

  controlInfoHistData: FieldHistoryDataSource = {
    helpTextPage: '',
    helpTextSubject: '',
    helpTextName: 'Help Text',
    helpTextText: '',
    helpTextImage: '',
    helpTextHistory: [],
  };

  //*************************************************
  constructor(
    private dynamicFormsFacade: DynamicFormsFacade,
    private mangoFacade: MangoAppFacade,
    public dialog: MatDialog,
    private fcs: FieldsControlService,
    private route: ActivatedRoute,
    private router: Router,
    private listpageService: ListPageService,
    private dynamicFormContainer: DynamicFormComponent,
    private dynamicFormsService: DynamicFormsService,
    private sanitized: DomSanitizer,
    private dialogService: MangoDialogService,
    private formWizardService: FormWizardService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this._skeletonInstances = 3; // TODO: Dynamically calculate the shape of the skeleton, instead of being hard-coded

    this.form.addControl(this.formGroupName, this.childForm);

    this.subs.add(
      this.route.queryParamMap.subscribe((queryParamMap) => {
        const segments = this.route.snapshot.url;
        const getQueryParamValue = (key: string): number | null => {
          const lowerCaseKey = key.toLowerCase();
          const value =
            queryParamMap.get(lowerCaseKey) ||
            queryParamMap.get(lowerCaseKey.toUpperCase());
          return value !== null ? parseInt(value) : null;
        };

        this.objectId = getQueryParamValue('oid');
        this.objectTypeId = getQueryParamValue('otid');
        this.objectTypeTypeId = getQueryParamValue('ottid');
        this.formId = getQueryParamValue('fid');
      })
    );

    this.subs.add(
      this.dateFormatPreference$.subscribe((dfpValue) => {
        this.dateFormatPreferenceValue = dfpValue;
      })
    );

    this.subs.add(
      this.mangoFacade.clientKey$.subscribe((clientKey) => {
        this.clientKey = clientKey;
      })
    );

    this.loadSectionFormFields();
    this.loadAvailableSectionFields();
    this.sectionEditUrl = this.getSectionEditUrl(this.section?.formSectionID);
    this.formItemDetailsUrl = this.getFormItemDetailsUrl(
      this.section?.formSectionID
    );

    if (this.objectTypeId == ObjectType.PREMISE) this.hidePremise = true;
  }

  loadSectionFormFields(): void {
    this.showSectionHeader = this.section.formSectionDisplayHeading;
    if (!this.showSectionHeader) {
      // Always expands if is missing card title
      this.isExpanded = true;
    }

    this.subs.add(
      this.dynamicFormsFacade.selectedDynamicForm$
        .pipe(
          filter((dynamicForm) => dynamicForm !== null),
          take(1),
          switchMap((dynamicForm) => {
            this.dynamicFormsFacade.loadFields(
              dynamicForm.formId,
              this.section.formSectionID,
              dynamicForm.objectTypeId
            );

            return combineLatest([
              this.dynamicFormsFacade
                .selectFormFieldsBySectionId(this.section.formSectionID)
                .pipe(
                  filter((fields) => !!fields),
                  take(1)
                ),
              this.dynamicFormsFacade.selectRenderFormData$.pipe(
                filter((renderFormData) => !!renderFormData),
                take(1),
                concatMap((renderFormData) =>
                  this.transformDataForUi(renderFormData)
                )
              ),
            ]);
          })
        )
        .subscribe({
          next: ([fields, renderFormData]) => {
            if (this.isRenderForm) {
              this.selectRenderFormData = renderFormData;

              this.processFormFields(fields);
              this.setupRenderFormDropdownsSubscription();
              this.filterRenderFormData();
              this.updateChildFormAddRenderFormData();
            }
          },
        })
    );
  }

  processFormFields(data: any[]): void {
    if (data && data.length > 0) {
      this.tempList = [];
      this.sectionFields$ = of(data); // Convert array to observable

      if (this.section.formSectionColumns > 4)
        this.section.formSectionColumns = 4;

      const outlier = data.filter(
        (field) =>
          field.formItemSectionDetail.columnNum >
          this.section.formSectionColumns
      );

      for (let i = 1; i <= this.section.formSectionColumns; i++) {
        let fieldsInColumn = data.filter(
          (field) => field.formItemSectionDetail.columnNum === i
        );

        if (outlier.length && i == 1)
          fieldsInColumn = fieldsInColumn.concat(outlier);

        fieldsInColumn = this.addAdditionalInfoToFields(fieldsInColumn);

        if (fieldsInColumn.length)
          this.tempList.push({ columnNum: i, listOfFields: fieldsInColumn });
      }

      this.sectionFields$ = of(data);
    }
    this.isLoading = false;
  }

  private addAdditionalInfoToFields(fieldsArray: any[]): any[] {
    //Created a function just in case we need to add more fields
    const modifiedFieldsArray = [];
    fieldsArray.map((f) => {
      const newField = JSON.parse(JSON.stringify(f));
      newField['dataTypeID'] = null;
      newField['formItemAnswer'] = null;
      newField['formItemAnswerViewMode'] = null;
      newField['formItemName'] = null;
      newField['formItemViewOnly'] = null;
      newField['sourceURL'] = null;
      newField['formItemFieldWidth'] = null;
      newField['formItemFieldHeight'] = null;
      newField['formItemParameters'] = null;
      newField['numDecimals'] = null;
      newField['sourceDocument'] = null;
      newField['sourcePage'] = null;
      newField['sourceSection'] = null;
      newField['sourceDate'] = null;
      newField['formItemSectionID'] = null;

      const formItemData = this.getMatchingItem(f.formItemID);
      if (!!formItemData) {
        newField.dataTypeID = formItemData.dataTypeID;
        newField.formItemAnswer = formItemData.formItemAnswer;
        newField.sourceURL = formItemData.sourceURL;
        newField.formItemName = formItemData.formItemName;
        newField.formItemViewOnly = formItemData.formItemViewOnly === 'True';
        newField.formItemFieldWidth = formItemData.formItemFieldWidth;
        newField.formItemFieldHeight = formItemData.formItemFieldHeight;
        newField.formItemParameters = formItemData.formItemParameters;
        newField.numDecimals = formItemData.numDecimals;
        newField.helpText = formItemData.helpText;
        newField.sourceDocument = formItemData.sourceDocument;
        newField.sourcePage = formItemData.sourcePage;
        newField.sourceSection = formItemData.sourceSection;
        newField.sourceDate = formItemData.sourceDate;
        newField.formItemSectionID = formItemData.formItemSectionID;

        /// format date field for view labels
        if (
          ['2', '9'].some((typeId) => formItemData.formItemTypeID === typeId) &&
          formItemData.dataTypeID === '7'
        ) {
          if (
            (!this.editMode ||
              formItemData.formItemViewOnly.toLowerCase === 'true') &&
            !!formItemData.formItemAnswer
          ) {
            newField.formItemAnswerViewMode = formatDate(
              formItemData.formItemAnswer,
              this.dateFormatPreferenceValue,
              'en-US'
            );
          }
        }
      }

      modifiedFieldsArray.push(newField);
    });

    return modifiedFieldsArray;
  }

  filterRenderFormData(): void {
    if (this.sectionFields$) {
      this.subs.add(
        this.sectionFields$
          .pipe(
            filter((fields) => {
              return fields && fields.length > 0;
            }),
            tap((fields) => {
              this.selectRenderFormData = this.selectRenderFormData.filter(
                (item) =>
                  fields.some(
                    (field) => field.formItemID === Number(item.formItemID)
                  )
              );
            })
          )
          .subscribe()
      );
    }
  }

  private setupRenderFormDropdownsSubscription(): void {
    this.subs.add(
      this.dynamicFormsFacade.selectRenderFormDropdowns$
        .pipe(filter((formData) => formData !== null))
        .subscribe((data) => {
          const dropdownValues = this.selectRenderFormData.reduce(
            (
              acc: { [key: string]: { value: string; display: string }[] },
              item: any
            ) => {
              return acc;
            },
            {}
          );
          const transformedData = { ...data, ...dropdownValues };
          this.dropdownValues$ = of(transformedData);
          this.isDropdownValuesLoading = false;
        })
    );
  }

  private createOldClauseObject(formItemData: any): any {
    const oldClauseValue = {
      ClauseTypeId: formItemData.clauseTypeID,
      ClauseText: formItemData.formItemAnswer,
      Document: formItemData.sourceDocument,
      Section: formItemData.sourceSection,
      Page: formItemData.sourcePage,
      ClauseDate: formItemData.sourceDate,
    };

    return oldClauseValue;
  }

  updateChildFormAddRenderFormData(): void {
    this.childForm = this.fcs.toFormGroup(
      this.selectRenderFormData,
      this.editMode
    );

    this.selectRenderFormData.forEach((formItem) => {
      const item = {
        formItemId: formItem.formItemID,
        formItemTypeId: formItem.formItemTypeID,
        oldValue:
          formItem.formItemTypeID === '10'
            ? this.createOldClauseObject(formItem)
            : formItem.formItemAnswer,
        type: formItem.formItemName.includes('Dynamic')
          ? 'Dynamic'
          : formItem.formItemName.includes('Existing')
          ? 'Existing'
          : formItem.formItemName.includes('Clause')
          ? 'Clause'
          : 'Dynamic',
        labelName: formItem.formItemLabel,
      };

      const copiedObject = JSON.parse(JSON.stringify(item));
      this.allFormItemsKeys.push(copiedObject);
      if (
        formItem.formItemAnswer
          ?.toString()
          .includes('/v06/mapping/GoogleMapsWidgetV3.aspx') ||
        formItem.sourceURL
          ?.toString()
          .includes('/v06/mapping/GoogleMapsWidgetV3.aspx')
      ) {
        this.getMapMarkers();
      }
    });
    this.form.setControl(this.formGroupName, this.childForm);

    // Store the initial data for later comparison
    this.initialData = this.childForm.value;

    // we have to attach to the child form to prevent falsely detecting changes as new form sections are added to the container and rendered
    this.childForm.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        tap((_) => {
          this.markAsChanged();
        })
      )
      .subscribe();
  }

  markAsChanged() {
    this.hasChanges = true;
    this.dynamicFormContainer.markAsChanged();
  }

  markAsChanged() {
    this.hasChanges = true;
    this.dynamicFormContainer.markAsChanged();
  }
  /**
   * Calls to bring back the available fields in the section (add fields button)
   */
  loadAvailableSectionFields() {
    if (!this.isRenderForm) {
      this.subs.add(
        this.dynamicFormsFacade.selectAvailableFormFields$
          .pipe(filter((formData) => formData !== null))
          .subscribe(() => {
            this.dynamicFormsFacade.loadAvailableFieldsToSection(
              this.section.formSectionID
            );
          })
      );

      this.selectAvailableFormFieldsBySectionId$ =
        this.dynamicFormsFacade.selectAvailableFieldsBySectionId(
          this.section.formSectionID
        );
    }
  }

  /**
   * Adds the available field(s) selected to the section
   */
  addFields() {
    const newFields = this.availableFieldsGrid.instance.getSelectedRowsData();
    newFields.forEach((field: IFields) => {
      /**
       * Shallow copy the field state object - as it's immutable
       */
      const tempField = { ...field };
      tempField.formItemSectionDetail = this.createDefaultFieldDetails();
      tempField.formItemType = field.formItemType;
      tempField.formItemSectionDetail.formItemID = field.formItemID;
      tempField.formItemSectionDetail.formItemLabel = field.formItemLabel;
      tempField.formItemSectionDetail.formSectionID =
        this.section.formSectionID;
      tempField.formItemSectionDetail.columnNum = 1;
      this.dynamicFormsFacade.addAvailableFieldToSection(
        this.section.formSectionID,
        tempField
      );
    });

    this.availableFieldsGrid.instance.clearSelection();
  }

  searchAvailableFieldsDataGrid(data) {
    this.availableFieldsGrid.instance.searchByText(data);
  }

  onFormDataChange(formData: any) {
    // Dispatch an action to update the form data in the store
    // this.store.dispatch(DynamicFormsActions.dynamicFormUpdateRenderForm({ formData }));
  }

  createNewField() {
    // let newField = new FormField(0, "My New Field", '', 'input', 'Building', null, null, null, null, null, null, null, null, null, null, null, null, null, [], false, null, null);
    // this.currentFormItem = newField;
    // this.sectionFields.push(this.currentFormItem);
    // this.launchFormItemPopup({ name : 0 });
  }

  launchFormItemPopup(data) {
    this.subs.add(
      this.sectionFields$.pipe(take(1)).subscribe((items) => {
        /**
         * Shallow copy the field state object - as it's immutable
         */
        this.selectedFormItem = {
          ...items.find((item) => item.formItemID === data.name.formItemID),
        };
        this.selectedFormItem.formItemSectionDetail = {
          ...this.selectedFormItem.formItemSectionDetail,
        };
        this.selectedFormItem.formItemType = {
          ...this.selectedFormItem.formItemType,
        };
      })
    );

    this.dialog.open(DynamicFormEditFieldDialogComponent, {
      disableClose: false,
      height: '90%',
      width: '95%',
      data: {
        form: this.form,
        section: this.section,
        field: this.selectedFormItem,
      },
    });
  }

  launchFormSectionPopup() {
    this.formSectionPopupVisible = true;
  }

  // ******************************************************** UI FUNCTIONS BELOW ********************************************************
  isWidgetObjectLinker(dataField: any): boolean {
    if (
      typeof this.selectRenderFormData === 'undefined' ||
      this.selectRenderFormData === null
    ) {
      return false;
    }
    if (this.hasParentObjectLinker) {
      return false;
    }

    const matchingDataForFormItem = this.selectRenderFormData.find(
      (item) => item.formItemID === dataField.toString()
    );
    if (
      matchingDataForFormItem &&
      matchingDataForFormItem.sourceURL
        .toLowerCase()
        .includes('objectlinker.aspx')
    ) {
      setTimeout(() => {
        this.hasParentObjectLinkerChange.emit(true);
        this.showParentLinker = true;
      });
    }

    return false;
  }

  goToPage(OTID: number) {
    this.showLoader = true;
    this.subs.add(
      this.selectRenderParentLink$.subscribe((data) => {
        if (data) {
          let queryParams: any;
          if (OTID == ObjectType.PREMISE) {
            queryParams = {
              fid: data?.premiseFormId,
              oid: data?.premiseObjectId,
              otid: OTID,
              ottid: data?.premiseObjectTypeTypeId,
            };
          } else if (this.objectTypeTypeId == ObjectTypeType.Equipment_Lease) {
            queryParams = {
              fid: data?.premiseFormId,
              oid: data?.objectId,
              otid: ObjectType.BUILDING,
              ottid: data?.objectTypeTypeId,
            };
          } else if (this.objectTypeTypeId == ObjectTypeType.Lease) {
            queryParams = {
              fid: data?.formId,
              oid: data?.objectId,
              otid: ObjectType.BUILDING,
              ottid: data?.objectTypeTypeId,
            };
          } else if (
            this.objectTypeTypeId == ObjectTypeType.Building ||
            this.objectTypeTypeId == ObjectTypeType.Premise
          ) {
            queryParams = {
              fid: data?.formId,
              oid: data?.objectId,
              otid: ObjectType.BUILDING,
              ottid: data?.objectTypeTypeId,
            };
          } else {
            return;
          }

          this.router.navigate(['/crem/forms/render-form'], { queryParams });
        }
      })
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.editMode && this.form) {
      //this.toggleFormControls();
    }
    if (changes.canLoadMap && changes.canLoadMap.currentValue) {
      setTimeout(() => {
        this.loadMapFlag$ = of(this.canLoadMap);
      }, 2000);
    }
  }

  onCanShowDownload(e) {
    if (e) {
      // canShowDownload calculates if the Download Button should be shown or not
      this.canShowDownload = !!this.sectionTitle?.nativeElement?.innerText && e;
    }
  }

  /**
   * Access the method on dynamic-form-widgets to download file
   * if downloading available
   *
   * @memberof DynamicFormSectionComponent
   */
  onWidgetDownloadFile(e) {
    this.dynamicFormWidget.exportExcel();
  }

  toggleFormControls() {
    if (this.editMode) {
      //this.isDropdownValuesLoading = true;
      this.enableDisableFormControls(this.form, true);
    } else {
      this.enableDisableFormControls(this.form, false);
    }
  }

  // Recursively enable/disable form controls
  private enableDisableFormControls(control: AbstractControl, enable: boolean) {
    if (control instanceof FormGroup) {
      Object.values(control.controls).forEach((childControl) => {
        this.enableDisableFormControls(childControl, enable);
      });
    } else {
      if (enable) {
        control.enable();
      } else {
        control.disable();
      }
    }
  }

  onDragStart: DxoItemDraggingProperties['onDragStart'] = (e) => {
    e.itemData = e.fromData[e.fromIndex];
  };

  onAdd: DxoItemDraggingProperties['onAdd'] = (e) => {
    e.toData.splice(e.toIndex, 0, e.itemData);
  };

  onRemove: DxoItemDraggingProperties['onRemove'] = (e) => {
    e.fromData.splice(e.fromIndex, 1);
  };

  onReorder: DxoItemDraggingProperties['onReorder'] = (e) => {
    this.onRemove(e as DxSortableTypes.RemoveEvent);
    this.onAdd(e as DxSortableTypes.AddEvent);
  };

  ngOnDestroy() {
    this.subs.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createDefaultFieldDetails(): IFieldDetails {
    return {
      formSectionID: 0,
      formItemDefaultLabel: '',
      formItemID: 0,
      formItemLabel: '',
      columnNum: 0,
      formItemSortOrder: 0,
      formItemMandatory: '',
      formItemMandatoryStep: 0,
      formItemViewOnly: '',
      formItemLabelPrefix: '',
      formItemLabelSuffix: '',
      formItemDisplayLabel: '',
      formItemJavaScript: '',
    };
  }

  onSectionEnterKey(e) {
    if (!this.sectionLabelEntered) {
      this.openSectionLabelMenu();
    } else {
      this.closeSectionLabelMenu();
    }
  }

  handleKeyboardEventsSection(e) {
    if (this.trigger.menuOpen) {
      if (e.key === 'ArrowDown') {
        this.currentSecMenuFocusIndex = Math.min(
          this.currentSecMenuFocusIndex + 1,
          this.menuItemsElements.length - 1
        );
        this.menuItemsElements
          .toArray()
          [this.currentSecMenuFocusIndex].nativeElement.focus();
      } else if (e.key === 'ArrowUp') {
        this.currentSecMenuFocusIndex = Math.max(
          this.currentSecMenuFocusIndex - 1,
          0
        );
        this.menuItemsElements
          .toArray()
          [this.currentSecMenuFocusIndex].nativeElement.focus();
      } else if (
        e.key === 'Tab' &&
        e.shiftKey &&
        this.currentSecMenuFocusIndex === 0
      ) {
        this.trigger.closeMenu();
        this.sectionTitle.nativeElement.focus();
      }
    }
  }

  onSectionMenuClosed() {
    this.sectionLabelEntered = false;
  }

  openSectionLabelMenu() {
    this.sectionLabelEntered = true;
    this.sectionLabelMenuOpened = true;
    this.sectionLabelMenuEntered = false;
    this.trigger.openMenu();
    this.currentSecMenuFocusIndex = 0;
    setTimeout(() => {
      this.menuItemsElements.first.nativeElement.focus();
    }, 0);
  }

  closeSectionLabelMenu() {
    this.sectionLabelEntered = false;
    setTimeout(() => {
      !this.sectionLabelMenuEntered &&
        !this.sectionLabelEntered &&
        this.trigger.closeMenu();
    }, 500);
  }

  sectionLabelMenuLeave() {
    this.sectionLabelMenuEntered = false;
    this.closeSectionLabelMenu();
  }

  getSectionEditUrl(sectionID: number) {
    return `${environment.cremBaseUrl.replace(
      '[CLIENT]',
      this.clientKey
    )}/V06/Forms/admin/FormSections/FormSectionAddEdit.aspx?btnSUbmit=edit&keyID=${sectionID}`;
  }

  getFormItemDetailsUrl(sectionID: number) {
    return `${environment.cremBaseUrl.replace(
      '[CLIENT]',
      this.clientKey
    )}/Forms/admin/FormItemSectionDetails.asp?FormID=${
      this.formId
    }&SectionID=${sectionID}`;
  }

  transformDataForUi(renderFormData: any): Observable<any[]> {
    return from(renderFormData).pipe(
      concatMap(async (dataItem: any) => {
        const result = { ...dataItem };
        /// images
        if (['7', '17'].some((typeId) => result.formItemTypeID === typeId)) {
          // convert form item answer (file-path) into an emedded image uri
          if (isTruthy(result.formItemAnswer)) {
            result.formItemAnswer = await this.createEmbeddedImage(
              result.formItemAnswer
            ).toPromise();
          }
        }
        /// parse radio button values
        if (['5'].some((typeId) => result.formItemTypeID === typeId)) {
          result.formItemAnswer = this.parseRadioButtonInitialValue(
            result,
            renderFormData
          );
        }
        ///convert form item answer to a boolean
        if (['4'].some((typeId) => result.formItemTypeID === typeId)) {
          result.formItemAnswer = result.formItemAnswer === 'true';
        }
        /// parse multi-select values into array of values
        if (['13', '18'].some((typeId) => result.formItemTypeID === typeId)) {
          result.formItemAnswer = result.formItemAnswer?.split('|') ?? [];
        }
        /// format the decimals for Int(3), Numeric(5), Money(6), Percent(206) datatypes
        if (
          ['3', '5', '6', '206'].some(
            (dataTypeId) => result.dataTypeID === dataTypeId
          )
        ) {
          if (
            isTruthy(result.numDecimals) &&
            isTruthy(result.formItemAnswer) &&
            isNumeric(result.formItemAnswer)
          ) {
            result.formItemAnswer = Number(result.formItemAnswer).toFixed(
              result.numDecimals
            );
          }
        }

        return result;
      }),
      toArray()
    );
  }

  /**
   * return base64 embed for the requested image uri
   *
   * @private
   * @param {*} uri
   * @returns {Observable<string>}
   */
  private createEmbeddedImage(uri: any): Observable<string> {
    return this.dynamicFormsService.getImageData(uri).pipe(
      map((response) => response?.data || '') // Return an empty string if response is null/undefined
    );
  }

  /**
   * parses boolean form answers and options
   *
   * @private
   * @param {*} formItem
   * @param {*} datasource
   * @returns {value} parsed formItemAnswer
   */
  private parseRadioButtonInitialValue(formItem: any, datasource: any) {
    const options = parseFormItemParametersPipeTransform(
      formItem.formItemID,
      datasource
    );

    let initialState = formItem.formItemAnswer;
    let result = initialState;

    const optionValues = options.map(({ value }) => value).map(Number);
    const hasMixedValues = optionValues.some(Number.isNaN);

    if (!hasMixedValues && options.length === 2) {
      // all values are number like and we only have 2 options
      const lowVal = Math.min(...optionValues);
      const highVal = Math.max(...optionValues);
      if (lowVal === 0 && highVal === 1) {
        // we have a boolean optionset
        if (Object.keys(booleanStringMap).includes(initialState)) {
          // the initial value is boolean
          result = booleanStringMap[initialState];
        }
      }
    }

    return result;
  }

  getMapMarkers() {
    this.advMarkers = [];
    const request: MapDataRequest = {
      objectTypeId: +this.objectTypeId,
      objectIds: this.objectId.toString(),
    };

    this.listpageService.getMarkerList(request).subscribe((res) => {
      if (
        res &&
        res.success &&
        res.data &&
        res.data.mapMarkers &&
        res.data.mapMarkers.length
      ) {
        this.markers = res.data.mapMarkers;
        this.loadMap();
      }
    });
  }

  loadMap() {
    this.markers.forEach((marker) => {
      const labelList = marker.goToUrl.split('Go to');
      this.objectTypeText = labelList[1].replace('</a>', '').replace(' ', '');

      const advMarker = {
        position: {
          lat: Number(marker.latitude),
          lng: Number(marker.longitude),
        },
        title: marker.name,
        info: this.getMarkerContent(marker, true),
      };

      this.advMarkers.push(advMarker);
    });
  }

  getMarkerContent(marker: Marker, isOnMap: boolean): string {
    let content = isOnMap && marker.name ? `<b>${marker.name}</b>` : '';
    content += !isOnMap && marker.address1 ? marker.address1 : '';
    content += isOnMap && marker.address1 ? `<br>${marker.address1}` : '';
    content += marker.address2 ? `<br>${marker.address2}` : '';
    content += marker.country ? `<br>${marker.country}` : '';
    content += marker.redirectorUrl
      ? `<br><a [routerLink]="[${marker.redirectorUrl}]">${this.objectTypeText}</a>`
      : '';

    return content;
  }

  private sanitizedHtmlMap = new Map<string, any>();
  private processedItems = new Set<string>();
  transform(value: string | null, key: string) {
    if (!value) return null;

    const strValue = value.toString().toLowerCase();
    if (
      !strValue.includes('img src') &&
      !strValue.includes('a target') &&
      !strValue.includes('a href')
    ) {
      return value;
    }

    if (this.processedItems.has(key)) {
      return this.sanitizedHtmlMap.get(key);
    }

    // Sanitize and store
    const sanitizedValue = this.sanitized.bypassSecurityTrustHtml(value);
    this.sanitizedHtmlMap.set(key, sanitizedValue);
    this.processedItems.add(key);

    return sanitizedValue;
  }

  // leaving this here till we know more about section groups
  getFormSectionGroupId(sectionGroup) {
    // this format is driven by the API
    return `dynamic-form_section_group_${sectionGroup.sectionGroupId}`;
  }

  getMatchingItem(dataField) {
    if (
      typeof this.selectRenderFormData === 'undefined' ||
      this.selectRenderFormData === null
    ) {
      return null;
    }
    const matchingItem = this.selectRenderFormData.find(
      (item) => item.formItemID === dataField.toString()
    );

    return matchingItem ? matchingItem : null;
  }

  onKeyDownonLabel(e: any, formItemID: number) {
    if (e.key == 'Enter') {
      this.openLabelLink(formItemID);
    }
  }

  openLabelLink(formItemID: number) {
    if (!this.isSuperUser) return;

    const url = `/Forms/admin/formitemAE.asp?fFormItemID=${formItemID}`;
    window.open(url, '_blank');
  }

  onContentReady() {
    const card = document.getElementById('Lease_ParentLink');
    const widget = document.getElementById('Widget_Lease_ParentLink');

    if (widget) {
      if (widget.getElementsByClassName('dx-datagrid-nodata'))
        widget.parentElement.remove();

      if (!card.getElementsByClassName('dx-item dx-list-item').length)
        card.remove();
    }
  }

  onDecimalValueChanged(e, numDecimals: number, formItemId: any) {
    if (!isTruthy(e)) return;

    if (!isTruthy(numDecimals)) {
      numDecimals = 0;
    }

    const parts = e.split('.');
    if (parts.length == 1) return;

    if (parts.length == 2 && parts[1].length > numDecimals) {
      this.subs.add(
        this.dialogService
          .alert(
            'Invalid Form Items',
            `Please enter a number with up to ${numDecimals} decimal places. Please try again.`,
            'OK'
          )
          .subscribe((res) => {
            if (res) {
              this.getFormItem(formItemId.toString())?.setValue('');
            }
          })
      );
    }
  }

  getFormItem(itemId: string) {
    if (this.form.contains(itemId)) {
      return this.form.get(itemId);
    }
    for (const itemName in this.form.controls) {
      const item = this.form.get(itemName);
      if (item instanceof FormGroup) {
        if (item.contains(itemId)) {
          return item.get(itemId);
        }
      }
    }
    return null;
  }

  getInitialHepTextInfo(controlData) {
    this.controlInfoHistData.helpTextSubject =
      controlData.name?.formItemSectionDetail?.formItemLabel;
    this.controlInfoHistData.helpTextText = controlData?.name?.helpText;
  }

  toggleExpand() {
    this.isExpanded = !this.isExpanded;
  }

  getFieldHistoryData(controlData) {
    this.controlInfoHistData.helpTextHistory = [];
    this.subs.add(
      this.dynamicFormsService
        .getChangeHistory(
          controlData.name.formItemSectionDetail.formItemID,
          this.objectId,
          this.objectTypeId
        )
        .pipe(
          take(1),
          tap((res) => {
            if (res && res.success) {
              this.controlInfoHistData.helpTextHistory = res.data.length
                ? res.data
                : [];
            }
          })
        )
        .subscribe()
    );
  }
}
