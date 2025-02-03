import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';

import {
  ButtonModule,
  DropdownModule,
  LibUiElementsModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
import { faCog, faL } from '@fortawesome/free-solid-svg-icons';
import { EMPTY, Observable, Subscription, of } from 'rxjs';
import { IFields, Widget } from '@forms/model/dynamic-forms.interface';
import { catchError, filter, finalize, switchMap, take } from 'rxjs/operators';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'mango-dynamic-form-widget',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LibUiElementsModule,
    SearchModule,
    ButtonModule,
    MatIconModule,
    ModalModule,
    MatMenuModule,
    MatButtonModule,
    FontAwesomeModule,
    MatDialogModule,
    MatCardModule,
    DropdownModule,
    DevExpressModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
  ],
  templateUrl: './dynamic-form-widget.component.html',
  styleUrls: ['./dynamic-form-widget.component.scss'],
})
export class DynamicFormWidgetComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  @Input() section!: any;
  @Input() form!: FormGroup;
  @Input() field!: IFields;
  faCog = faCog;
  isLoading: boolean;
  errorLoading: boolean;
  userMessage: string;

  selectWidget$: Observable<Widget>;
  isRenderForm = this.dynamicFormsFacade.selectIsRenderForm$;

  constructor(private dynamicFormsFacade: DynamicFormsFacade) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadWidget();
  }

  private loadWidget(): void {
    this.dynamicFormsFacade.loadWidgetByWidgetId(this.field.widgetID);

    this.subs.add(
      this.dynamicFormsFacade
        .selectFormItemWidgetsApiResponseByWidgetId(this.field.widgetID)
        .pipe(
          filter((res) => res !== null && res !== undefined),
          take(1),
          switchMap((widgetResponse) => {
            if (!widgetResponse.success) {
              this.errorLoading = true;
              if (widgetResponse.statusCode === 400) {
                this.userMessage = widgetResponse.clientErrorMessage;
              }
              return EMPTY;
            } else {
              this.selectWidget$ = of(widgetResponse.data);
              return of(null);
            }
          }),
          catchError((error) => {
            console.error('Error loading widget:', error);
            return of(null);
          }),
          finalize(() => {
            this.isLoading = false;
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
