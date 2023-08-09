import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import notify from 'devextreme/ui/notify';
import { DxFormComponent, DxTextBoxComponent } from 'devextreme-angular';
import { first } from 'rxjs/operators';

export class User {
    email: String;
    password : String;
    
    constructor(email,password) {
		this.email = email;
		this.password = password;
	}
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
		
    returnUrl : string;
    error : string = '';
    user : User;
    passwordMode : string = 'password';
	passwordButton : any;

    @ViewChild(DxFormComponent, { static: false }) form : DxFormComponent;
    @ViewChild("EmailInput") emailInput : DxTextBoxComponent;

	constructor( private route: ActivatedRoute, private router: Router, private authenticationService: AuthenticationService ) { 
		if (this.authenticationService.userValue) { 
            this.router.navigate(['/']);
        }
	}

	ngOnInit() {
        this.user = new User(null, null);
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        // console.log(this.returnUrl);

        this.passwordButton = {
			stylingMode: "text",
			icon: "more",
            onClick: () => {
                this.passwordMode = this.passwordMode === "text" ? "password" : "text";
            }
		};
	}

    ngAfterViewInit() {
        this.emailInput.instance.focus();
    }

    iForgot() {
        this.router.navigate(['forgot']);
    }

	onFormSubmit = function(e) {

        this.authenticationService.login(this.user.email, this.user.password)
            .pipe(first())
            .subscribe(
                data => {
                    // console.log("return URL:", this.returnUrl);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.displayAuthenticationError();
                });
    }

    displayAuthenticationError() {
        notify({
            message : "Invalid email address or password.", 
            type : "error", 
            displayTime : 5000,
            position : { at: 'center bottom', my: 'center bottom', offset: '0 -16'},
            maxWidth : "400px",
            closeOnClick : true,
        });

    }

}
