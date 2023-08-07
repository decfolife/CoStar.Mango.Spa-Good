import { Component, OnInit } from '@angular/core';
import { NotificationService, UserService } from '@mango/core-shared';
import { Authenticate, Errors } from '@mango/data-models/lib-data-models';
@Component({
  selector: 'mango-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSubmitting;
  errors: Errors = { errors: {} };

  constructor(
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.userService.purgeAuth();
  }

  login(authenticate: Authenticate) {
    console.log(authenticate);

    this.userService.login(authenticate).subscribe(
      (data) => {},
      (err) => {
        if (err.status === 0) {
          this.errors = {
            errors: { Login_Error: "Can't find the api endpoint: " + err.url },
          };
        } else {
          this.errors = { errors: { Login_Error: err.message } };
        }
        this.isSubmitting = false;
        this.notificationService.showErrorNotification(
          'Error',
          'Unable to login, ' + this.errors.errors.Login_Error
        );
      }
    );
  }
}
