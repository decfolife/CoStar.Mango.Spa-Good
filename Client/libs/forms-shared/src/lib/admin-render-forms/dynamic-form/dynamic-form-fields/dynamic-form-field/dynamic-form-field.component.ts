// import { CommonModule } from '@angular/common';
// import { Component, Input, OnDestroy, OnInit } from '@angular/core';
// import { DynamicFormWidgetsComponent } from '../../dynamic-form-widgets/dynamic-form-widgets.component';
// import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
// import { ButtonModule, DropdownModule, LibUiElementsModule, ModalModule } from '@mango/ui-shared/lib-ui-elements';
// import { LoaderModule, SearchModule } from '@mango/ui-shared/cosmos';
// import { MatIconModule } from '@angular/material/icon';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatButtonModule } from '@angular/material/button';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
// import { MatDialog, MatDialogModule } from '@angular/material/dialog';
// import { MatCardModule } from '@angular/material/card';
// import { faCog, faIcons } from '@fortawesome/free-solid-svg-icons';
// import { DevExpressModule } from 'libs/ui-shared/lib-external-libraries/src/lib/3rdParty/dev-express.module';
// import { DynamicFormFieldDocSecPageComponent } from '@forms/admin-render-forms/dynamic-form/dynamic-form-fields/dynamic-form-field-doc-sec-page/dynamic-form-field-doc-sec-page.component';
// import { DynamicFormEditFieldDialogComponent } from '@forms/admin-render-forms/dynamic-form-edits/dynamic-form-edit-field-dialog/dynamic-form-edit-field-dialog.component';
// import { Subscription } from 'rxjs';
// import { IFields } from '@forms/model/dynamic-forms.interface';
// import { TextBoxModule } from '@mango/ui-shared/lib-ui-elements';
// import { DynamicFormsFacade } from '@forms/+state/dynamic-forms.facade';

// @Component({
//     selector: 'mango-dynamic-form-field',
//     standalone: true,
//     templateUrl: './dynamic-form-field.component.html',
//     styleUrls: ['./dynamic-form-field.component.scss'],
//     imports: [CommonModule,
//         ReactiveFormsModule,
//         LibUiElementsModule,
//         SearchModule,
//         ButtonModule,
//         MatIconModule,
//         ModalModule,
//         MatMenuModule,
//         MatButtonModule,
//         FontAwesomeModule,
//         NgxSkeletonLoaderModule,
//         LoaderModule,
//         MatDialogModule,
//         MatCardModule,
//         DropdownModule,
//         DevExpressModule,
//         DynamicFormWidgetsComponent,
//         DynamicFormFieldDocSecPageComponent,
//         DynamicFormEditFieldDialogComponent, 
//         TextBoxModule]
// })
// export class DynamicFormFieldComponent implements OnInit, OnDestroy {
//   private subs: Subscription = new Subscription();
//   @Input() section!: any;
//   @Input() form!: FormGroup;
//   @Input() field!: IFields;
//   @Input() isRenderForm!: boolean;
//   @Input() dataField!: any;
//   @Input() selectRenderFormData: any;

//   faCog = faCog;

// 	sampleRadioItems : string[] = ['Option A', 'Option B', 'Option C'];
// 	formItemPopupTitle : string;
// 	formItemPopupVisible : boolean;
// 	formSectionPopupVisible : boolean;

//   constructor(
//     private dynamicFormsFacade: DynamicFormsFacade,
//     public dialog: MatDialog
//   ) {}


//   ngOnInit(): void {
//     // Ensure that selectRenderFormData is defined and is an array
//     if (Array.isArray(this.selectRenderFormData)) {
//       // Retrieve the field based on the formItemID
//       const formItemID = this.field.formItemID;
//       const renderedField = this.selectRenderFormData.find(item => item.FormItemID === formItemID);
      
//       if (renderedField) {
//         // Bind the retrieved field to the childForm
//         this.form.addControl(formItemID.toString(), new FormControl(renderedField));
  
//         // Log the value of SourceColumn to ensure it's correct
//         console.log('SourceColumn value:', renderedField.SourceColumn);
  
//         // Get the value from the property named by the SourceColumn property
//         const valueFromSourceColumn = renderedField && renderedField[renderedField.SourceColumn];
//         console.log('valueFromSourceColumn:', valueFromSourceColumn);
        
//         console.log('form field data ', this.form.get(formItemID.toString()))
//         // Set the value of the crem-text-box component
//         this.form.get(formItemID.toString()).valueChanges.subscribe(value => {
//           console.log('Value changes:', value);
//           console.log('Value from SourceColumn:', valueFromSourceColumn);
//           //this.field.value = valueFromSourceColumn; // Assuming field.value is the property you want to bind to crem-text-box
//         });
//       } 
//     } 
//   }

//   launchFormItemPopup() {
//     this.dialog.open(DynamicFormEditFieldDialogComponent, {
//       disableClose: false,
//       height: '90%',
//       width: '95%',
//       data: {
//         field: this.field
//       }
//     });
//   }
  
  
//   ngOnDestroy() {
//     this.subs.unsubscribe();
//   }
// }
