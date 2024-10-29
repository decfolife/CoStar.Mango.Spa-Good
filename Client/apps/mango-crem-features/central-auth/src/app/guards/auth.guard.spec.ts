import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from '@mango/core-shared';
import {
  Environment,
  OAUTH_CLIENT_KEY_QUERY_PARAM,
  OAUTH_CONTACT_ID_QUERY_PARAM,
  OAUTH_REDIRECT_QUERY_PARAM,
} from '@mango/data-models/lib-data-models';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { AppEffects } from '../+state/effects/app.effects';
import { CentralAuthFacade } from '../+state/facades';
import { initialState } from '../+state/reducers';
import * as AppSelectors from '../+state/selectors';
import { environment } from '../../environments/environment.dev';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { UserAuth } from '../models/userAuth';

describe('AuthGuard', () => {
  let authService: AuthService;
  let authGuard: AuthGuard;
  let centralAuthFacade: CentralAuthFacade;
  let router: Router;
  let actions$ = new Observable<Action>();
  let state: MockStore;
  let mockRouteSnapshot: ActivatedRouteSnapshot;
  let routerState: RouterStateSnapshot;
  let lockedUrls = ['/customer-selection', '/service-account-configuration'];
  let unlcokedUrls = ['/', 'reset-password', 'password-reset-request', 'citi'];
  let mockUser: UserAuth = {
    userId: 2,
    email: '',
    contactId: 2,
    clientKey: 'blank',
    isAutoProvisioned: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CentralAuthFacade,
        AppEffects,
        AuthService,
        StorageService,
        AuthGuard,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: Environment, useValue: environment },
      ],
    });
    authService = TestBed.inject(AuthService);
    centralAuthFacade = TestBed.inject(CentralAuthFacade);
    authGuard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
    state = TestBed.inject(MockStore);
    mockRouteSnapshot = {
      queryParamMap: {
        get: (name: string) => null,
      },
      paramMap: {
        get: (name: string) => null,
      },
    } as ActivatedRouteSnapshot;
    routerState = {} as RouterStateSnapshot;
  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  describe('when the user is logged in', () => {
    beforeEach(() => {
      state.overrideSelector(AppSelectors.user, mockUser);
    });

    [...lockedUrls, ...unlcokedUrls].forEach((url) => {
      it(`grants access for ${url}`, (done) => {
        authGuard
          .canActivate(mockRouteSnapshot, routerState)
          .subscribe((isAccessGranted) => {
            expect(isAccessGranted).toBeTruthy();
            done();
          });
      });

      describe('when getCurrentUser', () => {
        [...lockedUrls, ...unlcokedUrls].forEach((url) => {
          it(`grants access for ${url}`, (done) => {
            authGuard
              .canActivate(mockRouteSnapshot, routerState)
              .subscribe((isAccessGranted) => {
                expect(isAccessGranted).toBeTruthy();
                done();
              });
          });
        });

        lockedUrls.forEach((lockedUrl) => {
          it(`should set the user`, (done) => {
            state.overrideSelector(AppSelectors.user, null);
            jest
              .spyOn(authService, 'getCurrentUser')
              .mockReturnValue(of(mockUser));
            jest
              .spyOn(centralAuthFacade, 'setUser')
              .mockImplementation(() => null);
            authGuard
              .canActivate(mockRouteSnapshot, routerState)
              .subscribe((isAccessGranted) => {
                expect(centralAuthFacade.setUser).toBeCalledTimes(1);
                expect(centralAuthFacade.setUser).toBeCalledWith(mockUser);
                done();
              });
          });
        });
      });
    });
  });

  describe('when the user is logged out', () => {
    beforeEach(() => {
      state.overrideSelector(AppSelectors.user, null);
      jest
        .spyOn(authService, 'getCurrentUser')
        .mockReturnValue(throwError(of({ status: 401 })));
    });

    describe('when getCurrentUser returns 401', () => {
      lockedUrls.forEach((lockedUrl) => {
        it(`should rejects access for ${lockedUrl}`, (done) => {
          authGuard
            .canActivate(mockRouteSnapshot, routerState)
            .subscribe((isAccessGranted) => {
              expect(isAccessGranted).toBeFalsy();
              done();
            });
        });

        lockedUrls.forEach((lockedUrl) => {
          it(`should redirect to / when hitting ${lockedUrl}`, (done) => {
            jest.spyOn(router, 'navigate').mockImplementation((_) => null);
            authGuard
              .canActivate(mockRouteSnapshot, routerState)
              .subscribe((isAccessGranted) => {
                expect(router.navigate).toBeCalledTimes(1);
                expect(router.navigate).toBeCalledWith(['/'], {
                  queryParamsHandling: 'merge',
                });
                done();
              });
          });
        });

        unlcokedUrls.forEach((unlcokedUrl) => {
          it(`should grant access for ${unlcokedUrl}`, (done) => {
            authGuard
              .canActivate(mockRouteSnapshot, routerState)
              .subscribe((isAccessGranted) => {
                expect(isAccessGranted).toBeFalsy();
                done();
              });
          });
        });
      });
    });
  });

  describe('when query params and params are set', () => {
    beforeEach(() => {
      state.overrideSelector(AppSelectors.user, mockUser);
      jest
        .spyOn(centralAuthFacade, 'setSelectedClientKey')
        .mockImplementation(() => null);
      jest
        .spyOn(centralAuthFacade, 'setRedirectionUri')
        .mockImplementation(() => null);
      jest
        .spyOn(centralAuthFacade, 'setSelectedContactId')
        .mockImplementation(() => null);
      jest
        .spyOn(centralAuthFacade, 'setOpenClientInNewTab')
        .mockImplementation(() => null);
    });

    it('should call client setSelectedClientKey when queryParam clientKey is set', (done) => {
      mockRouteSnapshot.queryParamMap.get = (name: string) => {
        const paramMap = { clientKey: 'blank' };
        return paramMap[name];
      };
      authGuard.canActivate(mockRouteSnapshot, routerState).subscribe((_) => {
        expect(centralAuthFacade.setSelectedClientKey).toBeCalledTimes(1);
        expect(centralAuthFacade.setSelectedClientKey).toBeCalledWith('blank');
        done();
      });
    });

    it(`should call client setSelectedClientKey when queryParam ${OAUTH_CLIENT_KEY_QUERY_PARAM} is set`, (done) => {
      mockRouteSnapshot.queryParamMap.get = (name: string) => {
        const paramMap = { [OAUTH_CLIENT_KEY_QUERY_PARAM]: 'blank' };
        return paramMap[name];
      };
      authGuard.canActivate(mockRouteSnapshot, routerState).subscribe((_) => {
        expect(centralAuthFacade.setSelectedClientKey).toBeCalledTimes(1);
        expect(centralAuthFacade.setSelectedClientKey).toBeCalledWith('blank');
        done();
      });
    });

    it(`should call client setSelectedClientKey when param clientKey is set`, (done) => {
      mockRouteSnapshot.paramMap.get = (name: string) => {
        const paramMap = { clientKey: 'blank' };
        return paramMap[name];
      };
      authGuard.canActivate(mockRouteSnapshot, routerState).subscribe((_) => {
        expect(centralAuthFacade.setSelectedClientKey).toBeCalledTimes(1);
        expect(centralAuthFacade.setSelectedClientKey).toBeCalledWith('blank');
        done();
      });
    });

    it(`should call client setRedirectionUri when query param ${OAUTH_REDIRECT_QUERY_PARAM} is set`, (done) => {
      mockRouteSnapshot.queryParamMap.get = (name: string) => {
        const paramMap = { [OAUTH_REDIRECT_QUERY_PARAM]: 'https://url.com' };
        return paramMap[name];
      };
      authGuard.canActivate(mockRouteSnapshot, routerState).subscribe((_) => {
        expect(centralAuthFacade.setRedirectionUri).toBeCalledTimes(1);
        expect(centralAuthFacade.setRedirectionUri).toBeCalledWith(
          'https://url.com'
        );
        done();
      });
    });

    it(`should call client setSelectedContactId when query param ${OAUTH_CONTACT_ID_QUERY_PARAM} is set`, (done) => {
      mockRouteSnapshot.queryParamMap.get = (name: string) => {
        const paramMap = { [OAUTH_CONTACT_ID_QUERY_PARAM]: '123' };
        return paramMap[name];
      };
      authGuard.canActivate(mockRouteSnapshot, routerState).subscribe((_) => {
        expect(centralAuthFacade.setSelectedContactId).toBeCalledTimes(1);
        expect(centralAuthFacade.setSelectedContactId).toBeCalledWith(
          parseInt('123')
        );
        done();
      });
    });

    it(`should should call setOpenClientInNewTab with false when clientKey is set`, (done) => {
      mockRouteSnapshot.queryParamMap.get = (name: string) => {
        const paramMap = { clientKey: 'blank' };
        return paramMap[name];
      };
      authGuard.canActivate(mockRouteSnapshot, routerState).subscribe((_) => {
        expect(centralAuthFacade.setOpenClientInNewTab).toBeCalledTimes(1);
        expect(centralAuthFacade.setOpenClientInNewTab).toBeCalledWith(false);
        done();
      });
    });

    it(`should should call setOpenClientInNewTab with false when redirectUri is set`, (done) => {
      mockRouteSnapshot.queryParamMap.get = (name: string) => {
        const paramMap = { [OAUTH_REDIRECT_QUERY_PARAM]: 'https://url.com' };
        return paramMap[name];
      };
      authGuard.canActivate(mockRouteSnapshot, routerState).subscribe((_) => {
        expect(centralAuthFacade.setOpenClientInNewTab).toBeCalledTimes(1);
        expect(centralAuthFacade.setOpenClientInNewTab).toBeCalledWith(false);
        done();
      });
    });
  });
});
