import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './3rdParty/material.module';
import { DevExpressModule } from './3rdParty/dev-express.module';

// TODO: The 'crem-icon' should be utilized instead of directly using the FontAwesome library.
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { config } from '@fortawesome/fontawesome-svg-core';
config.autoAddCss = false;

@NgModule({
  imports: [CommonModule, NgbModule, MaterialModule, DevExpressModule, FontAwesomeModule],
  exports: [MaterialModule, DevExpressModule, FontAwesomeModule]
})
export class LibExternalLibrariesModule {}