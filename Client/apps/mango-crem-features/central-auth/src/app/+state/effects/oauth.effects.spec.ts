import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService, UserService } from '@mango/core-shared';
import {
  Environment,
  OAUTH_AUTH_CODE_QUERY_PARAM,
} from '@mango/data-models/lib-data-models';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import { CentralAuthFacade } from '../facades';
import { OAuthEffects, UtilsClass } from './oauth.effects';
import * as AppActions from '../actions/actions';
import * as OAuthActions from '../actions/oauth.actions';
import * as AppSelectors from '../selectors';
import { toArray } from 'rxjs/operators';

describe('OAUth Effects', () => {
  let userService: UserService;
  let oauthEffects: OAuthEffects;
  let centralAuthFacade: CentralAuthFacade;
  let actions$ = new Observable<Action>();
  let state: MockStore;
  const initialState = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        OAuthEffects,
        CentralAuthFacade,
        StorageService,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: Environment, useValue: environment },
      ],
    });
    userService = TestBed.inject(UserService);
    centralAuthFacade = TestBed.inject(CentralAuthFacade);
    oauthEffects = TestBed.inject(OAuthEffects);
    state = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(oauthEffects).toBeTruthy();
  });

  describe('when AUTHORIZE_SUCCESS action is dispatched', () => {
    beforeEach(() => {
      actions$ = of(
        OAuthActions.authorizeSuccess({
          authorizationCode: 'mock_authorization_code',
        })
      );
      state.overrideSelector(AppSelectors.redirectionUri, 'https://url.com');
      state.overrideSelector(
        AppSelectors.authorizationCode,
        'mock_authorization_code'
      );
      state.overrideSelector(AppSelectors.openClientInNewTab, true);
    });

    it('should call window.open when openClientInNewTab is true', (done) => {
      jest.spyOn(window, 'open').mockReturnValue(null);
      oauthEffects.authorizeSuccess$.pipe(toArray()).subscribe((_) => {
        expect(window.open).toHaveBeenCalledTimes(1);
        expect(window.open).toHaveBeenCalledWith(
          'https://url.com?auth_code=mock_authorization_code',
          '_blank'
        );
        done();
      });
    });

    it('should dispatch purgeClientSelection', (done) => {
      oauthEffects.authorizeSuccess$.pipe(toArray()).subscribe((actions) => {
        expect(actions[0]).toStrictEqual({
          type: AppActions.PURGE_CLIENT_SELECTION,
        });
        expect(actions[1]).toStrictEqual({
          type: AppActions.GET_USER_CLIENTS,
        });
        done();
      });
    });
  });
});

describe('UtilsClass', () => {
  describe('#generateClientUrl', () => {
    it('should add authorization code to the client url', (done) => {
      const mockRedirectionUrl = encodeURIComponent(
        'http://localhost:4201/auth/validate?redirect_uri=/crem/projects/project-dashboard/'
      );
      const mockAuthorizationCode = 'authorization_code_mock';
      const clientUrl = UtilsClass.generateClientUrl(
        mockRedirectionUrl,
        mockAuthorizationCode
      );
      expect(clientUrl).toStrictEqual(
        `http://localhost:4201/auth/validate?redirect_uri=/crem/projects/project-dashboard/&${OAUTH_AUTH_CODE_QUERY_PARAM}=${mockAuthorizationCode}`
      );
      done();
    });

    it('should encode ReturnUrl when redirectUrl is a v06 link', (done) => {
      const mockRedirectionUrl = encodeURIComponent(
        'http://blank.dev.corp.virtualpremise.com/v06/Login.aspx?ReturnUrl=/v06/Admin/AdminHome2.aspx'
      );
      const encodedV06ReturnUrl = '%2Fv06%2FAdmin%2FAdminHome2.aspx';
      const mockAuthorizationCode = 'authorization_code_mock';
      const clientUrl = UtilsClass.generateClientUrl(
        mockRedirectionUrl,
        mockAuthorizationCode
      );
      expect(clientUrl).toStrictEqual(
        `http://blank.dev.corp.virtualpremise.com/v06/Login.aspx?ReturnUrl=${encodedV06ReturnUrl}&${OAUTH_AUTH_CODE_QUERY_PARAM}=${mockAuthorizationCode}`
      );
      done();
    });

    describe('#accountForQueryParamAsFirstOrSecondParam', () => {
      it('should add query param with ? symbol when it is the first query param in the url', (done) => {
        const uri = 'https://url.com';
        const key = 'key1';
        const value = 'value1';
        const adjustedUri = UtilsClass.addQueryParamWithProperSymbol(
          uri,
          key,
          value
        );
        expect(adjustedUri).toStrictEqual('https://url.com?key1=value1');
        done();
      });

      it('should add query param with & symbol when it is not the first query param in the url', (done) => {
        const uri = 'https://url.com?param1=v';
        const key = 'key1';
        const value = 'value1';
        const adjustedUri = UtilsClass.addQueryParamWithProperSymbol(
          uri,
          key,
          value
        );
        expect(adjustedUri).toStrictEqual(
          'https://url.com?param1=v&key1=value1'
        );
        done();
      });
    });
  });
});
