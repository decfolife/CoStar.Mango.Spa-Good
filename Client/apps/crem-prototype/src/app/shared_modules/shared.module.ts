import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
	RouterModule,
	ActivatedRoute,
	Router,
	Routes
} from '@angular/router';

// Angular Material Module
import { AngularMaterialModule } from './angular-material.module';

// Dev Extreme Module
import { DevExpressModule } from './dev-express.module';

// Font Awesome Module
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
// import { fab } from '@fortawesome/free-brands-svg-icons';
import { FaConfig } from '@fortawesome/angular-fontawesome';

// Transforms
import { MinusSignToParens } from '../transforms/minus-sign-to-parens.pipe';

import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
	declarations: [
		MinusSignToParens,
	],
	imports: [
		BrowserModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		RouterModule,
		AngularMaterialModule,		
		DevExpressModule,
		FontAwesomeModule,
		DragDropModule
	],
	exports : [
		BrowserModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		RouterModule,
		AngularMaterialModule,		
		DevExpressModule,
		FontAwesomeModule,
		MinusSignToParens,	
		DragDropModule,
	]
})
export class SharedModule { 

	constructor(library: FaIconLibrary, faConfig: FaConfig) {
		
		library.addIconPacks(fas, far);		
		// faConfig.defaultPrefix = 'far';
	}


}
