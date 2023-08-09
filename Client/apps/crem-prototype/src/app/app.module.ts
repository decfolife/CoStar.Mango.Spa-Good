import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { fakeBackendProvider } from './helpers/fake-backend';
import { BasicAuthInterceptor } from './helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';

import { SharedModule } from './shared_modules/shared.module';

import { CostarModule } from './costar/costar.module';

import { LoginComponent } from './login/login.component';
import { CostarComponent } from './costar/costar.component';
import { CremAComponent } from './crem-a/crem-a.component';
import { PrototypeSelectComponent } from './prototype-select/prototype-select.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ClientSelectComponent } from './client-select/client-select.component';
import { GlobalSearchComponent } from './components/global-search/global-search.component';
import { LoginMastheadComponent } from './components/login-masthead/login-masthead.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ModalViewComponent } from './modal-view/modal-view.component';
import { StartPageSelectComponent } from './start-page-select/start-page-select.component';


@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		CostarComponent,
		CremAComponent,
		PrototypeSelectComponent,
		ForgotPasswordComponent,
		ClientSelectComponent,
		GlobalSearchComponent,
		LoginMastheadComponent,
		ResetPasswordComponent,
		ModalViewComponent,
		StartPageSelectComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		SharedModule,
		CostarModule,
	],
	providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        fakeBackendProvider
    ],
	bootstrap: [AppComponent]
})
export class AppModule {

}
