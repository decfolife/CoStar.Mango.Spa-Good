import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './3rdParty/material.module';
import { DevExpressModule } from './3rdParty/dev-express.module';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [CommonModule, NgbModule, MaterialModule, DevExpressModule, FontAwesomeModule],
  exports: [MaterialModule, DevExpressModule, FontAwesomeModule]
})
export class LibExternalLibrariesModule {}