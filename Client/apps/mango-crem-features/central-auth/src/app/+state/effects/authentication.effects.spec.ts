import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { StorageService } from '@mango/core-shared';
import { Environment, loginResponseMock } from '@mango/data-models/lib-data-models';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable, of, throwError } from 'rxjs';
import { toArray } from 'rxjs/operators';
import { environment } from '../../../environments/environment.dev';
import * as AppActions from '../actions/actions';
import { CentralAuthFacade } from '../facades';
import { AuthenticationEffects } from './authentication.effects';
import { AuthService } from '../../services/auth.service';

describe('Authentication Effects', () => {
  let authService: AuthService;
  let authenticationEffects: AuthenticationEffects;
  let centralAuthFacade: CentralAuthFacade;
  let router: Router;
  let actions$ = new Observable<Action>();
  const initialState = {}

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        AuthenticationEffects,
        CentralAuthFacade,
        StorageService,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: Environment, useValue: environment }
      ]
    });
    authService = TestBed.inject(AuthService);
    centralAuthFacade = TestBed.inject(CentralAuthFacade);
    authenticationEffects = TestBed.inject(AuthenticationEffects);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(authenticationEffects).toBeTruthy();
  });

  describe('when LOGIN action is dispatched', () => {

    beforeEach(() => {
      actions$ = of(AppActions.login({ credentials: null }))
    });

    it('should call userService.login method', (done) => {
      jest.spyOn(authService, 'login').mockReturnValue(of({}) as any);
      authenticationEffects.login$.subscribe(_ => {
        expect(authService.login).toHaveBeenCalledTimes(1)
        done()
      })
    })

    it('should dispatch loginSuccess when login success', (done) => {
      jest.spyOn(authService, 'login').mockReturnValue(of({}) as any);
      authenticationEffects.login$.subscribe(action => {
        expect(action).toEqual({
          type: AppActions.LOGIN_SUCCESS,
          response: {}
        })
        done()
      })
    });

    it('should dispatch loginError when login error', (done) => {
      jest.spyOn(authService, 'login').mockReturnValue(throwError(of({ status: 401 })))
      authenticationEffects.login$.subscribe(action => {
        expect(action).toEqual({
          type: AppActions.LOGIN_ERROR
        })
        done()
      })
    });

  });

  describe('when LOGIN_SUCCESS action is dispatched', () => {
    const mockUserLoginResponse = loginResponseMock
    beforeEach(() => {
      actions$ = of(AppActions.loginSuccess({ response: mockUserLoginResponse }))
    });

    it('should dispatch setUser and setAccessToken', (done) => {
      authenticationEffects.loginSuccess$.pipe(
        toArray()
      ).subscribe(actions => {
        expect(actions).toHaveLength(2)
        expect(actions[0]).toEqual({
          type: AppActions.SET_USER,
          user: mockUserLoginResponse.user
        })
        expect(actions[1]).toEqual({
          type: AppActions.SET_ACCESS_TOKEN,
          accessToken: mockUserLoginResponse.authToken
        })
        done()
      })
    });

  })


  describe('when LOGOUT action is dispatched', () => {

    beforeEach(() => {
      actions$ = of(AppActions.logout())
    });

    it('should dispatch clearState', (done) => {
      authenticationEffects.logout$.subscribe(action => {
        expect(action).toEqual({
          type: AppActions.CLEAR_STATE
        })
        done()
      })
    });

    it('should call userService.logout()', (done) => {
      jest.spyOn(authService, 'logout').mockReturnValue()
      authenticationEffects.logout$.subscribe(_ => {
        expect(authService.logout).toBeCalledTimes(1)
        done()
      })
    })

    it('should redirect to /', (done) => {
      jest.spyOn(router, 'navigate').mockResolvedValue(true)
      authenticationEffects.logout$.subscribe(_ => {
        expect(router.navigate).toBeCalledWith(['/'], { queryParamsHandling: 'merge' })
        done()
      })
    })
  })

})
