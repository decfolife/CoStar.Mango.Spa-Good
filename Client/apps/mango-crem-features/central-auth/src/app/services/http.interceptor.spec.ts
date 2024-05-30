import { Router } from '@angular/router';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse, provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Environment } from '@mango/data-models/lib-data-models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CentralAuthFacade } from '../+state/facades';
import { initialState } from '../+state/reducers';
import { environment } from '../../environments/environment.dev';
import { CentralAuthHttpInterceptor } from './http.interceptor';
import { Observable, of } from 'rxjs';


describe('HttpInterceptor', () => {
  let httpInterceptor: CentralAuthHttpInterceptor;
  let centralAuthFacade: CentralAuthFacade;
  let router: Router;
  let state: MockStore
  let mockHttpHandler: HttpHandler
  let interceptSpy: jest.SpyInstance
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        CentralAuthFacade,
        CentralAuthHttpInterceptor,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({ initialState }),
        { provide: Environment, useValue: environment }
      ]
    });
    centralAuthFacade = TestBed.inject(CentralAuthFacade);
    httpInterceptor = TestBed.inject(CentralAuthHttpInterceptor);
    router = TestBed.inject(Router);
    state = TestBed.inject(MockStore)
    mockHttpHandler = {
      handle: (req: HttpRequest<any>): Observable<HttpEvent<any>> => of(new HttpResponse(req))
    }
    interceptSpy = jest.spyOn(httpInterceptor, 'intercept')
  });


  it('should be created', () => {
    expect(httpInterceptor).toBeTruthy();
  });

  describe('#generateRequestHeaders', () => {
    it('should add Content-Type and Accept headers when token is undefined', () => {
      const headers = httpInterceptor.generateRequestHeaders(undefined)
      expect(headers).toStrictEqual({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    })

    it('should add Content-Type, Accept and Authorization headers when token is defined', () => {
      const headers = httpInterceptor.generateRequestHeaders('mock_access_token')
      expect(headers).toStrictEqual({
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer mock_access_token'
      })
    })
  })

  describe('#getRouter', () => {
    it('should return an instance of Router', () => {
      const router = httpInterceptor.router
      expect(router).toBeTruthy()
      expect(router).toBeInstanceOf(Router)
    })
  })

  describe('#getFacade', () => {
    it('should return an instance of CentralAuthFacade', () => {
      const facade = httpInterceptor.facade
      expect(facade).toBeTruthy()
      expect(facade).toBeInstanceOf(CentralAuthFacade)
    })
  })

  describe('#forRoot', () => {
    it('should create an instance of module', () => {
      const rootModule = CentralAuthHttpInterceptor.forRoot()
      expect(rootModule).toBeTruthy()
    })
  })

})