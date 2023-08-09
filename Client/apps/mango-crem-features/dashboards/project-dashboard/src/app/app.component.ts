import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  @Input() userid: number;
  title = 'mango-crem-features-dashboards-project-dashboard';
  cards;
  projectMilestoneCard;
  constructor(private router: Router) {}
  ngOnInit() {
    this.router.initialNavigation(); // Manually triggering initial navigation for @angular/elements

  }

  onOutletLoaded(component) {
    component.userId = this.userid;
  }
}
