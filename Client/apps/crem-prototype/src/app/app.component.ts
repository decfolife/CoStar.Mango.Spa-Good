import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './authentication.service';
import { User } from './models/user.model';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'costar';
	user: User;

	constructor( private router: Router, private authenticationService: AuthenticationService ) {
	    this.authenticationService.user.subscribe(x => this.user = x);
	}

	logout() {
	    this.authenticationService.logout();
	}
}
