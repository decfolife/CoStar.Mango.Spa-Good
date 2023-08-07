import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Accounting Profiles';
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements

  }
}