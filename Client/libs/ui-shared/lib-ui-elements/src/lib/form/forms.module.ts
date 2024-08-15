import { NgModule } from "@angular/core";
import { FormControlComponent } from "./form-control/form-control.component";
import { FormItemComponent } from "./form-item/form-item.component";
import { FormLabelComponent } from "./form-label/form-label.component";
import { CremFormDirective } from "./directives/form.directive";

@NgModule({
  imports: [
    FormControlComponent,
    FormItemComponent,
    FormLabelComponent,
    CremFormDirective
  ],
  exports: [
    FormControlComponent,
    FormItemComponent,
    FormLabelComponent,
    CremFormDirective
  ]
})
export class CremFormsModule {}