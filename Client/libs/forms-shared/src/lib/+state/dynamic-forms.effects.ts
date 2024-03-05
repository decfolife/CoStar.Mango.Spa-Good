import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { combineLatest, of } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as DynamicFormsActions from './dynamic-forms.actions';
import { DynamicFormsService } from '../services/dynamic-forms.service';
import { Store, select } from '@ngrx/store';
import * as fromDynamicForms from './dynamic-forms.selectors';

@Injectable()
export class DynamicFormsEffects {
  loadForms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.initForms),
      switchMap(() =>
        this.dynamicFormsService.getItems().pipe(
          map((result) =>
            DynamicFormsActions.formListloadSuccess({ forms: result.data })
          ),
          catchError((error) =>
            of(DynamicFormsActions.formListloadFailure({ error }))
          )
        )
      )
    )
  );

  loadForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoad),
      mergeMap((action: { formId: number }) => {
        return this.dynamicFormsService.getForm(action.formId).pipe(
          map((result) =>
            DynamicFormsActions.dynamicFormLoadSuccess({
              dynamicForm: result.data,
            })
          ),
          tap(() => {
            this.store.dispatch(DynamicFormsActions.dynamicFormLoadActions());
          }),
          catchError((error) =>
            of(
              DynamicFormsActions.dynamicFormLoadFailure({
                error,
                formId: action.formId,
              })
            )
          )
        );
      })
    )
  );

  loadFormActions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.LOAD_ACTIONS),
      mergeMap(() =>
        this.dynamicFormsService.getFormActions().pipe(
          map((result) =>
            DynamicFormsActions.dynamicFormLoadActionLoadSuccess({
              formActions: result.data,
            })
          ),
          catchError((error) =>
            of(DynamicFormsActions.dynamicFormLoadActionLoadFailure({ error }))
          )
        )
      )
    )
  );

  loadFormSections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoad),
      switchMap((action) => {
        return this.dynamicFormsService.getFormSections(action.formId).pipe(
          map((result) =>
            DynamicFormsActions.dynamicFormLoadSectionsSuccess({ formSections: result.data, })
          ),
          catchError((error) =>  of(DynamicFormsActions.dynamicFormLoadSectionsFailure({ error }))
          )
        );
      })
    )
  );

  loadFormAvailableSections$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoad),
      //withLatestFrom(this.store.select(fromDynamicForms.selectDynamicFormId)),
      tap(() => DynamicFormsActions.dynamicFormLoadAvailableSections()),
      switchMap((action) => {
        return this.dynamicFormsService
          .getAvailableFormSections(action.formId)
          .pipe(
            map((result) =>
              DynamicFormsActions.dynamicFormLoadAvailableSectionsSuccess({
                formAvailableSections: result.data,
              })
            ),
            catchError((error) =>
              of(
                DynamicFormsActions.dynamicFormLoadAvailableSectionsFailure({
                  error,
                })
              )
            )
          );
      })
    )
  );

  loadFormAvailableFields$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoadAvailableFields),
      mergeMap((action) =>
        this.dynamicFormsService
          .getAvailableFormFields(action.formId, action.objectTypeId)
          .pipe(
            map((result) =>
              DynamicFormsActions.dynamicFormLoadAvailableFieldsSuccess({
                formAvailableFields: result.data,
              })
            ),
            catchError((error) =>
              of(
                DynamicFormsActions.dynamicFormLoadAvailableFieldsFailure({
                  error,
                })
              )
            )
          )
      )
    )
  );

  loadFormFields$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoadFields),
      mergeMap((action) =>
        this.dynamicFormsService
          .getFormFields(action.formId, action.sectionId, action.objectTypeId)
          .pipe(
            filter(formData => formData !== undefined),
            map((result) =>
              DynamicFormsActions.dynamicFormLoadFieldsSuccess({sectionId: action.sectionId, formFields: result.data})
            ),
            catchError((error) =>
              of(
                DynamicFormsActions.dynamicFormLoadFieldsFailure({sectionId: action.sectionId, error})
              )
            )
          )
      )
    )
  );

  loadFormAvailableFieldsToSection$ = createEffect(() =>
    combineLatest([
      this.actions$.pipe(ofType(DynamicFormsActions.dynamicFormLoadAvailableFieldsToSection)),
      this.store.pipe(select(fromDynamicForms.selectAvailableFormFields)),
    ]).pipe(
      filter(([action, fields]) => !!fields), 
      mergeMap(([action, fields]) =>
        of(DynamicFormsActions.dynamicFormLoadAvailableFieldsToSectionSuccess({ sectionId: action.sectionId, formAvailableFieldsInSection: fields }))
      ),
      catchError(error => of(DynamicFormsActions.dynamicFormLoadAvailableFieldsToSectionFailure(error)))
    )
  );

  loadFormItemDataTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoadFormItemDataTypes),
      switchMap(() =>
        this.dynamicFormsService.getFormItemDataTypes().pipe(
          map((result) =>
            DynamicFormsActions.dynamicFormLoadFormItemDataTypesSuccess({ formItemDataTypes: result.data })
          ),
          catchError((error) =>
            of(DynamicFormsActions.dynamicFormLoadFormItemDataTypesFailure({ error }))
          )
        )
      )
    )
  );

  loadFormItemControlTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoadFormItemControlTypes),
      switchMap(() =>
        this.dynamicFormsService.getFormItemControlTypes().pipe(
          map((result) =>
            DynamicFormsActions.dynamicFormLoadFormItemControlTypesSuccess({ formItemControlTypes: result.data })
          ),
          catchError((error) =>
            of(DynamicFormsActions.formListloadFailure({ error }))
          )
        )
      )
    )
  );

  loadFormItemWidgetByWidgetId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoadWidgetByWidgetId),
      withLatestFrom(this.store.pipe(select(fromDynamicForms.selectObjectId))),
      mergeMap(([action, objectId]) =>
        this.dynamicFormsService.getFormItemWidgetByWidgetId(action.widgetId, objectId).pipe(
          map((result) =>
            DynamicFormsActions.dynamicFormLoadWidgetByWidgetIdSuccess({widget: result.data })
          ),
          catchError((error) =>
            of(
              DynamicFormsActions.dynamicFormLoadWidgetByWidgetIdFailure({
                error
              })
            )
          )
        )
      )
    )
  );

  loadFormItemDatabaseTables$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoadDatabaseTables),
      switchMap(() =>
        this.dynamicFormsService.getFormItemDatabaseTables().pipe(
          map((result) =>
            DynamicFormsActions.dynamicFormLoadDatabaseTablesSuccess({ formItemDatabaseTables: result.data })
          ),
          catchError((error) =>
            of(DynamicFormsActions.dynamicFormLoadDatabaseTablesFailure({ error }))
          )
        )
      )
    )
  );

  loadDatabaseColumnsByTableName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoadDatabaseColumnsByTableName),
      mergeMap((action) =>
        this.dynamicFormsService
          .getDatabaseColumnsByTableName(action.tableName)
          .pipe(
            filter(formData => formData !== undefined),
            map((result) =>
              DynamicFormsActions.dynamicFormLoadDatabaseColumnsByTableNameSuccess({tableName: action.tableName, formItemDatabaseColumns: result.data})
            ),
            catchError((error) =>
              of(
                DynamicFormsActions.dynamicFormLoadDatabaseColumnsByTableNameFailure({ error }))
              )
            )
          )
      )
    );

  loadFormItemDropdowns$ = createEffect(() =>
  this.actions$.pipe(
    ofType(DynamicFormsActions.dynamicFormLoadFormItemDropdowns),
    mergeMap(() =>
      this.dynamicFormsService
        .getFormItemDropdowns()
        .pipe(
          filter(formData => formData !== undefined),
          map((result) =>
            DynamicFormsActions.dynamicFormLoadFormItemDropdownsSuccess({formItemDropdowns: result.data})
          ),
          catchError((error) =>
            of(
              DynamicFormsActions.dynamicFormLoadFormItemDropdownsFailure({ error }))
            )
          )
        )
    )
  );

  loadRenderForm$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoadRenderForm),
      mergeMap((action: { formId, objectId, objectTypeId }) =>
        this.dynamicFormsService
          .getRenderFormData(action.formId, action.objectId, action.objectTypeId)
          .pipe(
            filter(formData => formData !== undefined),
            map(result =>
              DynamicFormsActions.dynamicFormLoadRenderFormSuccess({ renderFormData: result.data })
            ),
            catchError(error =>
              of(DynamicFormsActions.dynamicFormLoadRenderFormFailure({ error }))
            )
          )
      )
    )
  );

  loadFormName$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.dynamicFormLoadRenderForm),
      mergeMap((action: { formId, objectId, objectTypeId }) =>
        of(action).pipe(
          tap(() => DynamicFormsActions.dynamicFormLoadFormName()),
          mergeMap(() =>
            this.dynamicFormsService
              .getFormName(action.formId, action.objectId, action.objectTypeId)
              .pipe(
                map(result =>
                  DynamicFormsActions.dynamicFormLoadFormNameSuccess({ formName: result.data })
                ),
                catchError(error =>
                  of(DynamicFormsActions.dynamicFormLoadFormNameFailure({ error }))
                )
              )
          )
        )
      )
    )
  );


  loadRenderFormFormItemDropdowns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DynamicFormsActions.renderFormLoadFormItemDropdowns),
      mergeMap((action: { data }) =>
        of(action).pipe(
          mergeMap(() =>
            this.dynamicFormsService.getRenderFormFormItemDropdowns(action.data).pipe(
                map(result =>
                  DynamicFormsActions.renderFormLoadFormItemDropdownsSuccess({ renderFormDropdowns: result.data })
                ),
                catchError(error =>
                  of(DynamicFormsActions.renderFormLoadFormItemDropdownsFailure({ error }))
                )
              )
          )
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private dynamicFormsService: DynamicFormsService,
    private store: Store
  ) {}
}
