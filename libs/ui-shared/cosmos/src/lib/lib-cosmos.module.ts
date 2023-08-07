import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { ButtonModule } from './button';
import { ButtonGroupModule } from './button-group';
import { ChipModule } from './chip';
import { DatePickerModule } from './date-picker';
import { IconModule } from './icon';
import { LoaderModule } from './loader';
import { SearchModule } from './search';
import { TextAreaModule } from './text-area';
import { TextFieldModule } from './text-field';
import { ToggleModule } from './toggle';
import { TooltipModule } from './tooltip';
import { ViewButtonModule } from './view-button';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule],
  exports: [
    ButtonModule,
    ButtonGroupModule,
    ChipModule,
    DatePickerModule,
    IconModule,
    LoaderModule,
    SearchModule,
    TextAreaModule,
    TextFieldModule,
    ToggleModule,
    TooltipModule,
    ViewButtonModule
  ],
})
export class CosmosModule {}
