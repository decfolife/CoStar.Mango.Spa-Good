import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

	isSubmitted : Boolean = false;
	popoverVisible : Boolean = false;
	passwordModeOne : string = 'password';
	passwordButtonOne : any;
	passwordModeTwo : string = 'password';
	passwordButtonTwo : any;
	password : string = null;
	confirmPassword : string = null;

	constructor(private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.passwordButtonOne = {
			stylingMode: "text",
			icon: "more",
            onClick: () => {
                this.passwordModeOne = this.passwordModeOne === "text" ? "password" : "text";
            }
		};

		this.passwordButtonTwo = {
			stylingMode: "text",
			icon: "more",
            onClick: () => {
                this.passwordModeTwo = this.passwordModeTwo === "text" ? "password" : "text";
            }
		};
	}

	onFormSubmit = function(e) {
		this.isSubmitted = true;
		//do stuff - show a message and clear the entered email
	}

	cancel() {
		//navigate back to the Login page
		 this.router.navigate(['login']);
	}

	togglePopover() {
		this.popoverVisible = !this.popoverVisible;
	}

}
