import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';
import { DxFormComponent, DxTextBoxComponent } from 'devextreme-angular';

export class User {
		email: String;
		password : String;
		
		constructor(email,password) {
		this.email = email;
		this.password = password;
	}
}

@Component({
	selector: 'forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

	error : string = '';
	user : User;
	isSubmitted : Boolean = false;

	@ViewChild(DxFormComponent, { static: false }) form : DxFormComponent;
	@ViewChild("EmailInput") emailInput : DxTextBoxComponent;

	constructor(private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.user = new User(null, null);
	}

	ngAfterViewInit() {
        this.emailInput.instance.focus();
    }

	onFormSubmit = function(e) {
		this.isSubmitted = true;
		//do stuff - show a message and clear the entered email
	}

	cancel() {
		//navigate back to the Login page
		 this.router.navigate(['login']);
	}

	iForgot() {
        this.router.navigate(['reset']);
    }

}
