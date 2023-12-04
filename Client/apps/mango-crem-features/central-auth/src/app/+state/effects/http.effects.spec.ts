import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SettingsService, StorageService, UserService } from '@mango/core-shared';
import { Environment } from '@mango/data-models/lib-data-models';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment.dev';
import * as AppActions from '../actions/actions';
import { CentralAuthFacade } from '../facades';
import { HttpEffects } from './http.effects';

describe('Http Effects', () => {
  let userService: UserService;
  let httpEffects: HttpEffects;
  let centralAuthFacade: CentralAuthFacade;
  let settingsService: SettingsService;
  let actions$ = new Observable<Action>();
  const initialState = {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CentralAuthFacade,
        HttpEffects,
        SettingsService,
        UserService,
        StorageService,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: Environment, useValue: environment }
      ]
    });
    userService = TestBed.inject(UserService);
    centralAuthFacade = TestBed.inject(CentralAuthFacade);
    httpEffects = TestBed.inject(HttpEffects);
    settingsService = TestBed.inject(SettingsService);
  });

  it('should be created', () => {
    expect(httpEffects).toBeTruthy();
  });

  describe('when GET_CLIENT_SSO_SETTINGS action is dispatched', () => {
    const mockClientSSOSettingsResponse = { forceSSO: true, isSSOEnabled: true, ssoUri: 'https://client-sso-url.com' }
    beforeEach(() => {
      actions$ = of(AppActions.getClientSSOSettings({ clientKey: 'blank' }))
      jest.spyOn(settingsService, 'getClientSsoSettings').mockReturnValue(of(mockClientSSOSettingsResponse))
    });

    it('it should call getClientSsoSettings', done => {
      httpEffects.getClientSSSOSettings$.subscribe(_ => {
        expect(settingsService.getClientSsoSettings).toBeCalledTimes(1)
        done()
      })
    })

    it('it should dispatch getClientSSOSettingsSuccess', done => {
      httpEffects.getClientSSSOSettings$.subscribe(action => {
        expect(action).toEqual({
          type: AppActions.GET_CLIENT_SSO_SETTINGS_SUCCESS,
          ssoSettings: mockClientSSOSettingsResponse
        })
        done()
      })
    })
  })
})
