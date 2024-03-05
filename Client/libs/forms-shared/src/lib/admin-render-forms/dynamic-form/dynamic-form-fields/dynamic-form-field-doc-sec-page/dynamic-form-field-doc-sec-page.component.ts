import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';
import { ButtonModule, DropdownModule, LibUiElementsModule, LoaderModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
import { SearchModule } from '@mango/ui-shared/cosmos';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { IFields } from '@forms/model/dynamic-forms.interface';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';

@Component({
  selector: 'mango-dynamic-form-field-doc-sec-page',
  standalone: true,
  imports: [ CommonModule,
    ReactiveFormsModule,
    LibUiElementsModule,
    SearchModule,
    ButtonModule,
    DevExpressModule
  ],
  templateUrl: './dynamic-form-field-doc-sec-page.component.html',
  styleUrls: ['./dynamic-form-field-doc-sec-page.component.scss']
})
export class DynamicFormFieldDocSecPageComponent implements OnInit, OnDestroy {
	
  private subs: Subscription = new Subscription();
  @Input() section!: any;
  @Input() form!: FormGroup;
  @Input() field!: IFields;
  @Input() document : string;
	@Input() page : string;
  faCog = faCog

  constructor(
    private dynamicFormsFacade: DynamicFormsFacade
  ) {}

  ngOnInit() {
  const blah = 1;
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
