import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MaterialModule } from '../material.module';
import { SearchModule } from './search';
import { TextFieldModule } from './text-field';

@NgModule({
  declarations: [],
  imports: [CommonModule, MaterialModule],
  exports: [
    SearchModule,
    TextFieldModule
  ],
})
export class CosmosModule {}
