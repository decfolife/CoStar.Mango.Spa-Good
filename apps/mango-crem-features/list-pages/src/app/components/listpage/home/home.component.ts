import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  constructor(
    private router: Router){}

  goToListpage(){
    this.router.navigate(['/listpage']);
  }
}
