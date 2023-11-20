import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'mango-accounting-summary-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AccountingSummary';

  constructor(private elementRef: ElementRef) {}

  onOutletLoaded(component) {
    const navPageId = Number(this.elementRef.nativeElement.getAttribute('navPageId'));
    const leaseAbstractId = Number(this.elementRef.nativeElement.getAttribute('leaseAbstractId'));
    component.navPageId = navPageId;
    component.leaseAbstractId = leaseAbstractId;
  }
}
