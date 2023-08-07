import { Component, OnInit } from '@angular/core';

export class PasswordSettings {    
	id: number;
	expirationDays : number;
	passwordLength : number;	
	ssoEnabled : boolean;
	ssoStageUri : string;
	ssoProdUri : string;
	ssoStageLogoutUri : string;
	ssoProdLogoutUri : string;
	redirectToSso : boolean;

	constructor(id,expirationDays,passwordLength,ssoEnabled,ssoStageUri,ssoProdUri,ssoStageLogoutUri,ssoProdLogoutUri,redirectToSso) {		
		this.id = id;	
		this.expirationDays = expirationDays;
		this.passwordLength = passwordLength;
		this.ssoEnabled = ssoEnabled;
		this.ssoStageUri = ssoStageUri;
		this.ssoProdUri = ssoProdUri;
		this.ssoStageLogoutUri = ssoStageLogoutUri;
		this.ssoProdLogoutUri = ssoProdLogoutUri;
		this.redirectToSso = redirectToSso;

	}
}

@Component({
	selector: 'password-settings',
	templateUrl: './password-settings.component.html',
	styleUrls: ['./password-settings.component.scss']
})
export class PasswordSettingsComponent implements OnInit {

	settings : PasswordSettings;

	constructor() { 
		this.settings = new PasswordSettings(1, 90, 16, true, null, null, null, null, false);
	}

	ngOnInit() {
	}

	handleToggleChange(e) {
		// console.log(e);
		this.settings[e.source.name] = e.checked;
	}

}
