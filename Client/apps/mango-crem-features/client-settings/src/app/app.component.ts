import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@mango/core-shared/lib-core-shared';

@Component({
  selector: 'mango-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'mango-client-settings';

  @Input('client-key') clientKey: string;
  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) {}

  ngOnInit() {
    // Manually triggering initial navigation for @angular/elements
    this.router.initialNavigation();
    this.settingsService.clientKey$.next(this.clientKey);
  }
}
