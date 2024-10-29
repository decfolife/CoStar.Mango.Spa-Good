import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  SettingsService,
  StorageService,
  UserService,
} from '@mango/core-shared';
import {
  Environment,
  loginResponseMock,
  mockClientBlank,
  mockContactRecord,
  mockUserClients,
  userMock,
} from '@mango/data-models/lib-data-models';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { UserIdleService } from 'libs/core-shared/src/lib/services';
import { Observable, of } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { environment } from '../../../environments/environment.dev';
import * as AppActions from '../actions/actions';
import * as OAuthActions from '../actions/oauth.actions';
import { CentralAuthFacade } from '../facades';
import * as AppSelectors from '../selectors';
import { AppEffects } from './app.effects';

describe('App Effects', () => {
  let userService: UserService;
  let appEffects: AppEffects;
  let centralAuthFacade: CentralAuthFacade;
  let settingsService: SettingsService;
  let storageService: StorageService;
  let router: Router;
  let actions$ = new Observable<Action>();
  let state: MockStore;
  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        CentralAuthFacade,
        AppEffects,
        StorageService,
        SettingsService,
        UserIdleService,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: Environment, useValue: environment },
      ],
    });
    userService = TestBed.inject(UserService);
    centralAuthFacade = TestBed.inject(CentralAuthFacade);
    appEffects = TestBed.inject(AppEffects);
    settingsService = TestBed.inject(SettingsService);
    storageService = TestBed.inject(StorageService);
    router = TestBed.inject(Router);
    state = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(appEffects).toBeTruthy();
  });

  describe('when APP_INIT action is dispatched', () => {
    beforeEach(() => {
      actions$ = of(AppActions.init());
    });

    it('should dispatch array of actions', (done) => {
      appEffects.appInit$.pipe(toArray()).subscribe((actions) => {
        expect(actions).toHaveLength(5);
        expect(actions[0]).toEqual({
          type: AppActions.LOAD_CURRENT_USER,
        });
        expect(actions[1]).toEqual({
          type: AppActions.HANDLE_CUSTOM_QUERY_PARAMS,
        });
        expect(actions[2]).toEqual({
          type: OAuthActions.SETUP_OAUTH_REDIRECTION_TO_CLIENT,
        });
        expect(actions[3]).toEqual({
          type: AppActions.SETUP_IDLE,
        });
        expect(actions[4]).toEqual({
          type: AppActions.SETUP_LOGOUT_WHEN_TIMED_OUT,
        });
        done();
      });
    });
  });

  describe('when REDIRECT_TO_CUSTOMER_SELECTION action is dispatched', () => {
    beforeEach(() => {
      actions$ = of(AppActions.redirectToCustomerSelection());
    });

    it('should dispatch array of actions', (done) => {
      jest.spyOn(router, 'navigate').mockResolvedValue(true);
      appEffects.redirectToCustomerSelection$.subscribe((_) => {
        expect(router.navigate).toBeCalledWith(['/customer-selection'], {
          queryParamsHandling: 'merge',
        });
        done();
      });
    });
  });

  describe('when POPULATE_LOGGED_IN_USER_DATA action is dispatched', () => {
    beforeEach(() => {
      actions$ = of(AppActions.loadCurrentUser());
    });

    it('should dispatch setUser when the user is defined in the storage', (done) => {
      jest.spyOn(storageService, 'getDataObject').mockReturnValue(userMock);
      appEffects.loadCurrentUser$.subscribe((action) => {
        expect(action).toStrictEqual({
          type: AppActions.SET_USER,
          user: userMock,
        });
        done();
      });
    });

    it('should dispatch noOpAction when the user is undefined in the storage', (done) => {
      jest.spyOn(storageService, 'getDataObject').mockReturnValue(undefined);
      appEffects.loadCurrentUser$.subscribe((action) => {
        expect(action).toStrictEqual({
          type: AppActions.NO_OP_ACTION,
        });
        done();
      });
    });
  });

  describe('when SET_SELECTED_CLIENT_KEY action is dispatched', () => {
    beforeEach(() => {
      actions$ = of(
        AppActions.setSelectedClientKey({
          clientKey: mockClientBlank.clientKey,
        })
      );
    });

    it('should dispatch setSelectedClient and getContactRecords when client found', (done) => {
      state.overrideSelector(AppSelectors.user, loginResponseMock.user);
      state.overrideSelector(AppSelectors.userClients, mockUserClients);
      appEffects.populateSelectedClientAndContactRecords$
        .pipe(toArray())
        .subscribe((actions) => {
          expect(actions).toHaveLength(2);
          expect(actions[0]).toStrictEqual({
            type: AppActions.SET_CLIENT,
            client: mockClientBlank,
          });
          expect(actions[1]).toStrictEqual({
            type: AppActions.GET_CONTACT_RECORDS,
            clientKey: mockClientBlank.clientKey,
          });
          done();
        });
    });
  });

  describe('when SET_SELECTED_CLIENT_KEY action is dispatched', () => {
    beforeEach(() => {
      actions$ = of(
        AppActions.setSelectedClientKey({
          clientKey: mockClientBlank.clientKey,
        })
      );
    });

    it('should dispatch setSelectedClient and getContactRecords when client found', (done) => {
      state.overrideSelector(AppSelectors.user, loginResponseMock.user);
      state.overrideSelector(AppSelectors.userClients, mockUserClients);
      appEffects.populateSelectedClientAndContactRecords$
        .pipe(toArray())
        .subscribe((actions) => {
          expect(actions).toHaveLength(2);
          expect(actions[0]).toStrictEqual({
            type: AppActions.SET_CLIENT,
            client: mockClientBlank,
          });
          expect(actions[1]).toStrictEqual({
            type: AppActions.GET_CONTACT_RECORDS,
            clientKey: mockClientBlank.clientKey,
          });
          done();
        });
    });
  });

  describe('when START_AUTHORIZATION_WHEN_FULLY_SELECTED action is dispatched', () => {
    beforeEach(() => {
      actions$ = of(AppActions.startAuthorizationWhenFullySelected());
    });

    it('should dispatch initAuthorization', (done) => {
      state.overrideSelector(AppSelectors.selectedClient, mockClientBlank);
      state.overrideSelector(AppSelectors.contactRecord, mockContactRecord);
      appEffects.startAuthorizationWhenFullySelected$.subscribe((action) => {
        expect(action).toStrictEqual({
          type: OAuthActions.INIT_AUTHORIZATION,
        });
        done();
      });
    });
  });
});
