import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ETLService } from '@etl/services/etl.service';
import {
  ButtonModule,
  InputComponent,
  LibUiElementsModule,
  LoaderModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';

@Component({
  selector: 'mango-etl-templates-copy-template',
  standalone: true,
  imports: [
    CommonModule,
    ModalModule,
    InputComponent,
    LoaderModule,
    DevExpressModule,
    ButtonModule,
    LibUiElementsModule,
  ],
  templateUrl: './etl-templates-copy-template.component.html',
  styleUrls: ['./etl-templates-copy-template.component.scss'],
})
export class EtlTemplatesCopyTemplateComponent {
  componentName = 'etl-templates-copy-template-modal';
  submit = 'Submit';
  selectedItem;

  constructor(
    public dialogRef: MatDialogRef<EtlTemplatesCopyTemplateComponent>,
    public etlService: ETLService
  ) {}

  onClose() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.dialogRef.close(this.selectedItem);
  }
}
