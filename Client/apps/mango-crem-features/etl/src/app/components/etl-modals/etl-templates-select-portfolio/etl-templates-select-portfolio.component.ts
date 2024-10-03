import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ETLService } from '@etl/services/etl.service';
import {
  LoaderModule,
  ButtonModule,
  DropdownModule,
  LibUiElementsModule,
  ModalModule,
} from '@mango/ui-shared/lib-ui-elements';
import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'mango-etl-templates-select-portfolio',
  standalone: true,
  imports: [
    CommonModule,
    ModalModule,
    LoaderModule,
    DevExpressModule,
    ButtonModule,
    DropdownModule,
    LibUiElementsModule,
  ],
  templateUrl: './etl-templates-select-portfolio.component.html',
  styleUrls: ['./etl-templates-select-portfolio.component.scss'],
})
export class EtlTemplatesSelectPortfolioComponent {
  componentName = 'etl-templates-select=portfolio-modal';
  portfolios;
  submit = 'Submit';
  selectedItem;

  constructor(
    public dialogRef: MatDialogRef<EtlTemplatesSelectPortfolioComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public etlService: ETLService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.load();
    });
  }

  onPortfolioSelected(event: any): void {
    const selectedPortfolio = event.value;
    this.selectedItem = this.portfolios.find(
      (portfolio) => portfolio.companyID === selectedPortfolio
    );
  }

  load(): void {
    this.portfolios = this.data.portfolios;
  }

  onClose() {
    this.dialogRef.close(null);
  }

  onSubmit() {
    this.dialogRef.close(this.selectedItem);
  }
}
