import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @Input() userId;
  title = 'mango-crem-features-list-pages';

  constructor(private router: Router, private elementRef: ElementRef) {
    this.userId = this.elementRef.nativeElement.getAttribute('userId');
  }
  ngOnInit() {
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements
  }

  onOutletLoaded(component) {
    component.userId = this.userId;
  }
}
