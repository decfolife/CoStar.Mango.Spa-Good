import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mango-crem-features-portfolio-maintenance';
  loading = true;
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements
  }
}
