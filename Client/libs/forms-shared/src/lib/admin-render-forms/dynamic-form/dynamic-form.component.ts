import { Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';
import { FormArray, ReactiveFormsModule } from '@angular/forms';
import {DxDataGridComponent, DxDataGridModule, DxLoadPanelModule, } from 'devextreme-angular';
import { ButtonModule, DropdownModule, LibUiElementsModule, ModalModule, } from '@mango/ui-shared/lib-ui-elements';
import { MatIconModule } from '@angular/material/icon';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, take } from 'rxjs/operators';
import { DynamicFormSectionComponent } from './dynamic-form-sections/dynamic-form-section.component';
import { BehaviorSubject, Observable, Subscription, combineLatest } from 'rxjs';
import { Section } from '@forms/model/section.model';
import { LoaderModule } from '@mango/ui-shared/lib-ui-elements';
import { BreadCrumb, RenderFormHeaderData } from '@mango/data-models/lib-data-models';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { FormItemsDropdownValuesDto, RenderFormDropdowns } from '@forms/model/dynamic-forms.interface';

@Component({
  selector: 'mango-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
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
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  @ViewChild('availableSectionsGrid')
  availableSectionsGrid: DxDataGridComponent;

  form!: FormGroup;
  isLoading: boolean;
  isRenderForm: boolean; 
  editMode = false;
  logOutput = '';

  formId?: number;
  objectId: number;
  objectTypeId: number;
  objectTypeTypeId: number;

  selectedDynamicForm$ = this.dynamicFormsFacade.selectedDynamicForm$;
  selectFormActions$ = this.dynamicFormsFacade.selectedFormActions$;
  selectAvailableFormSections$ = this.dynamicFormsFacade.selectAvailableFormSections$;
  selectFormSections$ = this.dynamicFormsFacade.selectFormSections$;
  selectFormName$ = this.dynamicFormsFacade.selectFormName$;

  breadcrumbs$ = this.mangoAppFacade.breadcrumbs$;

  constructor(
    private location: Location,
    private fb: FormBuilder,
    private dynamicFormsFacade: DynamicFormsFacade,
    private mangoAppFacade: MangoAppFacade,
    private router: Router, private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoading = true;

    this.subs.add(
      this.route.queryParamMap.subscribe((queryParamMap) => {
        const segments = this.route.snapshot.url;
        this.isRenderForm = segments.some(
          (segment) => segment.path === 'render-form'
        );

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

        this.load();
        this.setupFormGroups();
      })
    );
  }

  private load(): void {
    this.dynamicFormsFacade.loadDynamicForm(this.formId);

    this.subs.add(
      this.dynamicFormsFacade.selectedDynamicForm$
        .pipe(filter((formData) => formData !== null))
        .subscribe((formData) => {
          this.dynamicFormsFacade.loadAvailableFields( this.formId, formData.objectTypeID);
          this.dynamicFormsFacade.loadFormItemControlTypes();
          this.dynamicFormsFacade.loadFormItemDataTypes();
          this.dynamicFormsFacade.loadFormItemDatabaseTables();

          // check to see if we need to render the entire form with data
          if (this.isRenderForm) {
            this.dynamicFormsFacade.loadRenderForm(formData.formId, this.objectId, formData.objectTypeID);
            this.dynamicFormsFacade.setObjectId(this.objectId);
            this.dynamicFormsFacade.setisRenderForm(this.isRenderForm);
            this.showPropertyHeaderAndUpdateBreadcrumbName();
          }
          this.form.patchValue(formData);
          this.isLoading = false;
        })
    );
  }

  showPropertyHeaderAndUpdateBreadcrumbName() {
    const firstBreadCrumb = this.populateFirstBreadCrumb();

    const formNameSubject = new BehaviorSubject<string | null>(null);
    const selectFormNameSubscription = this.dynamicFormsFacade.selectFormName$
      .pipe(filter((formData) => formData !== null))
      // eslint-disable-next-line rxjs-angular/prefer-composition
      .subscribe((formName) => {
        formNameSubject.next(formName);
        const objectTypeId = this.objectTypeId;
        const renderFormHeaderData = new RenderFormHeaderData(true, {
          formName,
          objectTypeId,
        });
        const evt = new CustomEvent('RenderFormShowPropertyHeader', {
          detail: renderFormHeaderData,
        });
        window.dispatchEvent(evt);
      });

    const combinedSubscription = combineLatest([
      formNameSubject,
      this.mangoAppFacade.breadcrumbs$.pipe(take(1)),
      // eslint-disable-next-line rxjs-angular/prefer-composition
    ]).subscribe(
      ([formNameFromSubscription, breadCrumbs]: [string | null, BreadCrumb[]]) => {
        if (breadCrumbs && breadCrumbs.length > 0 && formNameFromSubscription) {
          const updatedBreadcrumbs: BreadCrumb[] = [];
          let firstAdded = false;

          for (const breadcrumb of breadCrumbs) {
            if (!firstAdded) {
              updatedBreadcrumbs.push(firstBreadCrumb);
              firstAdded = true;
            }
            if (breadcrumb.url === '/crem/forms/render-form') {
              updatedBreadcrumbs.push({ ...breadcrumb, label: formNameFromSubscription, activeLink: firstBreadCrumb.activeLink });
            }
          }
          this.mangoAppFacade.setBreadcrumbs(updatedBreadcrumbs);
        }
      }
    );

    // Manage subscriptions to avoid memory leaks
    this.subs.add(selectFormNameSubscription);
    this.subs.add(combinedSubscription);
  }

  populateFirstBreadCrumb(): BreadCrumb {
    switch (this.objectTypeId) {
      case 1:
        return this.createDefaultBreadCrumb('Projects', this.router.serializeUrl(this.router.createUrlTree(['crem', 'projects', 'projects'])), 'Tasks');
      case 3:
        return this.createDefaultBreadCrumb('Buildings', this.router.serializeUrl(this.router.createUrlTree(['crem', 'portfolio', 'buildings'])), 'Building');
      case 4:
        return this.createDefaultBreadCrumb('Leases', this.router.serializeUrl(this.router.createUrlTree(['crem', 'portfolio', 'leases'])), 'Abstract');
      case 5:
        return this.createDefaultBreadCrumb('Contacts', this.router.serializeUrl(this.router.createUrlTree(['crem', 'contacts', 'contacts-list'])), 'Contacts');
      default:
        return this.createDefaultBreadCrumb('', '', '');
    }
  }

  private createDefaultBreadCrumb(label: string, url: string, activeLink: string): BreadCrumb {
    return {
      label: label,
      url: url,
      activeLink: activeLink
    };
  }

  private setupFormGroups(): void {
    this.form = this.fb.group({
      formName: [''],
      objectType: [''],
    });
  }

  saveForm() {
   this.goBack();
  // this.logFormValidity(this.form);
  }

  editClicked() {
    this.editMode = !this.editMode;
    if (this.editMode) {
      // get data for select dropdowns
      this.populateFormItemDropdownSQLs();
    }
  }

  designModeClicked() {
    this.router.navigate(['/crem/forms/admin-forms/dynamic-form'], {
      relativeTo: this.route,
      queryParams: { FID: this.formId },
      queryParamsHandling: 'merge'
    })
  }

  populateFormItemDropdownSQLs() {
    if (this.isRenderForm) {

      this.subs.add(
        this.dynamicFormsFacade.selectRenderFormData$.pipe(
          take(1),
          filter(formData => formData !== null) // Filter out null values
        )
        .subscribe((formData) => {
            const fieldsWithSQLDropdowns = formData.filter(item => item.FormItemDropdownSource != null);
            if(fieldsWithSQLDropdowns && fieldsWithSQLDropdowns.length > 0){
              const formItemsDropdownValues: FormItemsDropdownValuesDto[] = [];
              fieldsWithSQLDropdowns.forEach(field => {
                const newItem: FormItemsDropdownValuesDto = {
                  ObjectId: this.objectId,
                  ObjectTypeId: this.objectTypeId,
                  FormItemId: field.FormItemID,
                  FormItemDropdownSource: field.FormItemDropdownSource
                };
                formItemsDropdownValues.push(newItem);
              });
              this.dynamicFormsFacade.loadRenderFormFormItemDropdowns(formItemsDropdownValues);
            }
        })
      );
    }
  }
  // logFormValidity(control: AbstractControl, path = '') {
  //   this.logOutput += `Form ${path ? path + '.' : ''}Validity\n`;
  //   this.logOutput += `Valid: ${control.valid}\n`;
  //   this.logOutput += `Pristine: ${control.pristine}\n`;
  //   this.logOutput += `Errors: ${JSON.stringify(control.errors)}\n`;
  //   this.logOutput += `Value: ${JSON.stringify(control.value)}\n`;
  //   this.logOutput += `\n`;

  //   if (control instanceof FormGroup) {
  //     Object.keys(control.controls).forEach(controlName => {
  //       const childControl = control.get(controlName) as AbstractControl;
  //       this.logFormValidity(childControl, path ? path + '.' + controlName : controlName);
  //     });
  //   }
  // }

  addSections() {
    const newSections =
      this.availableSectionsGrid.instance.getSelectedRowsData();

    newSections.forEach((section) => {
      this.dynamicFormsFacade.addSectionToForm(section.formSectionID, section);
    });

    this.availableSectionsGrid.instance.clearSelection();
  }

  scrollToTop() {
    const elmnt = document.getElementById('divTop');
    elmnt.scrollIntoView({ behavior: 'smooth' });
  }

  createNewSection(columns) {
    // let isTableData = false,
    //   allowEditing = false,
    //   allowAdding = false;
    // if (columns == 0) {
    //   isTableData = true;
    //   allowEditing = true;
    //   allowAdding = true;
    // }
    //  const s = new Section(0, 'New Section', columns, this.form.get('objectType').value , 2, isTableData, allowEditing, allowAdding, [], [], []);
    // this.sections.push(s);
  }

  onRemoved(section: Section) {
    // this.sections.splice(this.sections.indexOf(section), 1);
    // this.availableSections.push(section);
    // remove section from service
    //this.service.deleteSectionFromForm(section.id, this.form.id);
    // Refresh the available fields
    //this.availableFields = this.service.getAvailableFormFields(this.form.id);
    // notify({
    // 	message : "Section: '" + section.sectionName + "' removed.",
    // 	type : "info",
    // 	displayTime : 2000,
    // 	position : { at: 'bottom right', my: 'bottom right', offset: '-16 -16'},
    // 	maxWidth : "400px",
    // 	closeOnClick : true,
    // });
  }

  searchAvailableSectionsDataGrid(data) {
    this.availableSectionsGrid.instance.searchByText(data);
  }
  close() {
    this.goBack();
  }
  cancel() {
    this.editMode = !this.editMode;
  }
  goBack() {
    this.location.back();
  }

  onSubmit() {
    //this.payLoad = JSON.stringify(this.form.getRawValue());
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}