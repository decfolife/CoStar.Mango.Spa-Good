import { Component, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@mango/core-shared/lib-core-shared';
import { faUserCircle, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { MangoAppFacade } from '@mangoSpa/src/app/+state/app/app.facade';
import { CentralAuthFacade } from '../../+state/facades';

@Component({
  selector: 'mango-ca-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faArrowRightFromBracket = faArrowRightFromBracket
  faUserCircle = faUserCircle
  userEmail: string

  constructor(
    private userService: UserService, 
    private router: Router, 
    private centralAuthFacade: CentralAuthFacade,
    @Optional() private facade: MangoAppFacade
  ) { }

  ngOnInit(): void {
    this.userEmail = this.userService.currentUserValue.email
  }

  logout(): void {
    this.centralAuthFacade.logout()
  }
}
