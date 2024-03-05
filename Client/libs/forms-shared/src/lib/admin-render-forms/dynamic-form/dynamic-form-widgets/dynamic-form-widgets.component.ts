import {  Component, Input, OnDestroy, OnInit, } from '@angular/core';
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
import { Observable, Subscription, of } from 'rxjs';
import { IFields, Widget } from '@forms/model/dynamic-forms.interface';
import { filter } from 'rxjs/operators';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'mango-dynamic-form-widgets',
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
  templateUrl: './dynamic-form-widgets.component.html',
  styleUrls: ['./dynamic-form-widgets.component.scss'],
})
export class DynamicFormWidgetsComponent implements OnInit, OnDestroy {
  private subs: Subscription = new Subscription();
  @Input() section!: any;
  @Input() form!: FormGroup;
  @Input() field!: IFields;
  faCog = faCog;
  isLoading : boolean;

  selectWidget$: Observable<Widget>;
  isRenderForm: boolean;

  constructor(private dynamicFormsFacade: DynamicFormsFacade) {}

  ngOnInit() {
    this.isLoading = true;
    this.loadWidget();
    this.subs.add(
      this.dynamicFormsFacade.selectIsRenderForm$.subscribe(isRenderForm => {
        if (isRenderForm) {
          this.isRenderForm = isRenderForm;
        }
      })
    );
  }

  private loadWidget(): void {
    this.dynamicFormsFacade.loadWidgetByWidgetId(this.field.widgetID);

    this.subs.add(
      this.dynamicFormsFacade.selectWidgetByWidgetId(this.field.widgetID).pipe(
      filter(formData => formData !== null),
    ).subscribe(
      (widgetData) => {
        this.selectWidget$ = of(widgetData);
        this.isLoading = false;
      }
    ));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
