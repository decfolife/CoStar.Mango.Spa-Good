import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
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
  IconModule,
  InputComponent,
  InputLabelComponent,
  LibUiElementsModule,
  LoaderModule,
  ModalModule,
  ScreenLoaderModule,
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
import { isTruthy } from '@mango/core-shared';

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
    DynamicFormEditFieldDialogComponent,
    InputLabelComponent,
    DatePickerModule,
    IconModule,
    CremRadioGroupComponent,
    CheckBoxComponent,
    CremRadioComponent,
    UseDynamicFormFieldConfigDirective,
    ParseFormItemParametersPipe,
    GoogleMapsModule,
  ],
})
export class DynamicFormSectionComponent
  implements OnInit, OnDestroy, OnChanges
{
  @ViewChild('availableFieldsGrid') availableFieldsGrid: DxDataGridComponent;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  private subs: Subscription = new Subscription();
  private destroy$ = new Subject<void>();

  @Input() section!: ISection;
  @Input() form!: FormGroup;
  @Input() editMode: boolean;
  @Input() isRenderForm: boolean;
  @Input() hasParentObjectLinker: boolean = false;
  @Input() isSuperUser: boolean = false;
  @Input() canLoadMap: boolean = false;
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
  sectionLabelMenuEntered: boolean = false;
  sectionLabelMenuOpened: boolean = false;
  sectionLabelEntered: boolean = false;
  externalCremLink: string;
  clientKey: string = '';

  selectRenderParentLink$ = this.dynamicFormsFacade.selectRenderParentLink$;
  dateFormatPreference$ = this.mangoFacade.dateFormatPreference$;
  isTruthy = isTruthy;
  //*********** Google Maps ***************/

  mapOptions: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    maxZoom: 20,
    minZoom: 0,
  };
  zoom = 4;
  loadMapFlag$: Observable<boolean>;
  marker: Marker;
  advMarker: any;
  objectTypeText = '';
  //*** end Google maps */

  constructor(
    private dynamicFormsFacade: DynamicFormsFacade,
    private mangoFacade: MangoAppFacade,
    public dialog: MatDialog,
    private fcs: FieldsControlService,
    private route: ActivatedRoute,
    private router: Router,
    private listpageService: ListPageService,
    private dynamicFormContainer: DynamicFormComponent,
    private dynamicFormsService: DynamicFormsService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
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
      this.mangoFacade.clientKey$.subscribe((clientKey) => {
        this.clientKey = clientKey;
      })
    );

    this.loadSectionFormFields();
    this.loadAvailableSectionFields();

    if (this.formId == 28 && this.section.formSectionID == 484) {
      this.getMapMarkers();
    }
  }

  loadSectionFormFields(): void {
    this.subs.add(
      this.dynamicFormsFacade.selectedDynamicForm$
        .pipe(
          filter((dynamicForm) => dynamicForm !== null),
          switchMap((dynamicForm) => {
            this.dynamicFormsFacade.loadFields(
              dynamicForm.formId,
              this.section.formSectionID,
              dynamicForm.objectTypeId
            );

            return combineLatest([
              this.dynamicFormsFacade
                .selectFormFieldsBySectionId(this.section.formSectionID)
                .pipe(filter((fields) => !!fields)),
              this.dynamicFormsFacade.selectRenderFormData$.pipe(
                filter((renderFormData) => !!renderFormData),
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

      for (let i = 1; i <= this.section.formSectionColumns; i++) {
        const fieldsInColumn = data.filter(
          (field) => field.formItemSectionDetail.columnNum === i
        );
        this.tempList.push({ columnNum: i, listOfFields: fieldsInColumn });
      }

      this.sectionFields$ = of(data);
    }
    this.isLoading = false;
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
              if (
                item.formItemTypeID == 1 &&
                item.formItemParameters &&
                item.formItemParameters.trim().length > 0
              ) {
                const values = item.formItemParameters.split('|');
                acc[item.formItemID] = values.map((val) => ({
                  value: val,
                  display: val,
                }));
              }
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

  updateChildFormAddRenderFormData(): void {
    this.childForm = this.fcs.toFormGroup(
      this.selectRenderFormData,
      this.editMode
    );
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
  getDataTypeID(dataField: string): number {
    const matchingItem = this.getMatchingItem(dataField);
    return matchingItem ? matchingItem.dataTypeID : null;
  }

  getEmailAddress(dataField: string): string {
    return this.getFormItemAnswer(dataField);
  }

  getFormItemAnswer(dataField: string): string {
    const matchingItem = this.getMatchingItem(dataField);
    return matchingItem ? matchingItem.formItemAnswer : null;
  }

  getImageUrl(dataField: string): string {
    return this.getFormItemAnswer(dataField);
  }

  getFormItemName(dataField: string): number {
    const matchingItem = this.getMatchingItem(dataField);
    return matchingItem ? matchingItem.formItemName : null;
  }

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

  goToPage() {
    this.showLoader = true;
    this.subs.add(
      this.selectRenderParentLink$.subscribe((data) => {
        if (data) {
          const queryParams = {
            FID: data.formId,
            OID: data.objectId,
            OTID: 3,
            OTTID: data.objectTypeTypeId,
          };
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
    };
  }
  // get isValid() {
  //   return this.form.controls[this.question.key].valid;
  // }

  openSectionLabelMenu() {
    this.sectionLabelEntered = true;
    this.sectionLabelMenuOpened = true;
    this.sectionLabelMenuEntered = false;
    this.trigger.openMenu();
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
        if (['7'].some((typeId) => result.formItemTypeID === typeId)) {
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
        /// parse multi-select values into array of values
        if (['13', '18'].some((typeId) => result.formItemTypeID === typeId)) {
          result.formItemAnswer = result.formItemAnswer?.split('|') ?? [];
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
    return this.dynamicFormsService
      .getImageData(uri)
      .pipe(map(({ data }) => data));
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
        this.marker = res.data.mapMarkers[0];
        this.loadMap();
      }
    });
  }

  loadMap() {
    const labelList = this.marker.goToUrl.split('Go to');
    this.objectTypeText = labelList[1].replace('</a>', '').replace(' ', '');

    this.advMarker = {
      position: {
        lat: Number(this.marker.latitude),
        lng: Number(this.marker.longitude),
      },
      title: this.marker.name,
      info: this.getMarkerContent(this.marker, true),
    };
  }

  getMarkerContent(marker: Marker, isOnMap: boolean): string {
    let content = isOnMap && marker.name ? `<b>${marker.name}</b>` : '';
    content += !isOnMap && marker.address1 ? marker.address1 : '';
    content += isOnMap && marker.address1 ? `<br>${marker.address1}` : '';
    content += marker.address2 ? `<br>${marker.address2}` : '';
    content += marker.country ? `<br>${marker.country}` : '';
    content += marker.redirectorUrl
      ? `<br><a href="${marker.redirectorUrl}">${this.objectTypeText}</a>`
      : '';

    return content;
  }

  // leaving this here till we know more about section groups
  getFormSectionGroupId(sectionGroup) {
    // this format is driven by the API
    return `dynamic-form_section_group_${sectionGroup.sectionGroupId}`;
  }

  getImageHeight(dataField) {
    const matchingItem = this.getMatchingItem(dataField);
    return matchingItem ? matchingItem.formItemFieldHeight : 300;
  }

  getImageWidth(dataField) {
    const matchingItem = this.getMatchingItem(dataField);
    return matchingItem ? matchingItem?.formItemFieldWidth : 400;
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
}
