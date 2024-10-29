import { Component } from '@angular/core';
import {
  faArrowRightFromBracket,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons';
import { filter, map } from 'rxjs/operators';
import { CentralAuthFacade } from '../../+state/facades';

@Component({
  selector: 'mango-ca-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  faArrowRightFromBracket = faArrowRightFromBracket;
  faUserCircle = faUserCircle;
  userEmail$ = this.centralAuthFacade.user$.pipe(
    filter((user) => !!user),
    map((user) => user.email)
  );

  constructor(private centralAuthFacade: CentralAuthFacade) {}

  logout(): void {
    localStorage.setItem('logout-event', Math.random().toString());
    this.centralAuthFacade.logout();
  }
}
