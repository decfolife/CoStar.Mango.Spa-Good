import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
 title = "mango-crem-features-start-page-selection";

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) {
    this.renderer.addClass(document.body, 'mango-crem-features-start-page-selection');
  }
  ngOnInit() {
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements

  }
}
