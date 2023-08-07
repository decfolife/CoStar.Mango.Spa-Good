import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';

import { User } from '../app.service';

const users: User[] = [
    new User(1, 'jtrkovsky@costargroup.com', 'Jason', 'Trkovsky', null, 'jtrkovsky@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(2, 'pgriffith@costargroup.com', 'Patrick', 'Griffith', null, 'pgriffith@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(3, 'mcurtis@costargroup.com', 'Michael', 'Curtis', null, 'mcurtis@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(4, 'dgalenkamp@costargroup.com', 'Dan', 'Galenkamp', null, 'dgalenkamp@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(5, 'jshall@costar.com', 'Jessica', 'Hall', null, 'jshall@costar.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(6, 'kcarpenter@costargroup.com', 'Kent', 'Carpenter', null, 'kcarpenter@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(9, 'ssecor@costargroup.com', 'Scott', 'Secor', null, 'ssecor@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(10, 'jbeggs@costargroup.com', 'Jeff', 'Beggs', null, 'jbeggs@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(12, 'asalaam@costargroup.com', 'Rahim', 'Salaam', null, 'asalaam@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(14, 'mcoggen@costargroup.com', 'Melanie', 'Coggen', null, 'mcoggen@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(15, 'aateel@costargroup.com', 'Faig', 'Ateel', null, 'aateel@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(16, 'athomas@costargroup.com', 'Andy', 'Thomas', null, 'athomas@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(17, 'dstinson@costargroup.com', 'Derick', 'Stinson', null, 'dstinson@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(18, 'hyin@costargroup.com', 'Hang', 'Yin', null, 'hyin@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(19, 'jshaw@costargroup.com', 'Jonathan', 'Shaw', null, 'jshaw@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(20, 'nnatarajan@costargroup.com', 'Niranjani', 'Natarajan', null, 'nnatarajan@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(21, 'mross@costargroup.com', 'Matt', 'Ross', null, 'mross@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(22, 'lbush@costargroup.com', 'Ross', 'Bush', null, 'lbush@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(23, 'chsiao@costargroup.com', 'Chenchen', 'Hsiao', null, 'chsiao@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(24, 'lliu@costargroup.com', 'Li', 'Liu', null, 'lliu@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(25, 'hkallepalli@costargroup.com', 'Hima', 'Kallepalli', null, 'hkallepalli@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(27, 'mmcdonald@costargroup.com', 'Mark', 'McDonald', null, 'mmcdonald@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(28, 'anarayan@costargroup.com', 'Adhiti', 'Narayan', null, 'anarayan@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(29, 'rglasser@costargroup.com', 'Rebecca', 'Glasser', null, 'rglasser@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(31, 'rowens@costargroup.com', 'Ralph', 'Owens', null, 'rowens@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(33, 'amartinez@costargroup.com', 'Anne', 'Martinez', null, 'amartinez@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(35, 'dgreen@costargroup.com', 'David', 'Green', null, 'dgreen@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(36, 'rshivarudraiah@costargroup.com', 'Ranjitha', 'Shivarudraiah', null, 'rshivarudraiah@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(37, 'aningampally@costargroup.com', 'Aruna', 'Ningampally', null, 'aningampally@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(38, 'fcatarcione@costargroup.com', 'Filipe', 'Catarcione', null, 'fcatarcione@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(39, 'pkukkala@costargroup.com', 'Padmaja', 'Kukkala', null, 'pkukkala@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(40, 'jkurra@costargroup.com', 'Jyothirmai', 'Kurra', null, 'jkurra@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(41, 'tnjohnson@costargroup.com', 'Tyler', 'Johnson', null, 'tnjohnson@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(42, 'skukkala@costargroup.com', 'Sundarayya', 'Kukkala', null, 'skukkala@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(43, 'asrivastava@costargroup.com', 'Ankit', 'Srivastava', null, 'asrivastava@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(44, 'rrajib@costargroup.com', 'Rezwanul', 'Rajib', null, 'rrajib@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(45, 'dcurry@costargroup.com', 'Desiree', 'Curry', null, 'dcurry@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(46, 'jarnold@costargroup.com', 'James', 'Arnold', null, 'jarnold@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(47, 'asafsaf@costargroup.com', 'Abderraouf', 'Safsaf', null, 'asafsaf@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(48, 'dmclaughlin@costargroup.com', 'David', 'McLaughlin', null, 'dmclaughlin@costargroup.com', 'CoStar', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),

    new User(48, 'skashou@costargroup.com', 'Salim', 'Kashou', null, 'skashou@costargroup.com', 'CoStar  Real Estate Manager - (Group)', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
    new User(49, 'jshall@costar.com', 'Jessica', 'Hall', null, 'jshall@costar.com', 'CoStar', null, null, null, null, null,null,'jshallCoStar22!',null,null),
    new User(50, 'dmedina@costar.com', 'David', 'Medina', null, 'dmedina@costar.com', 'CoStar', null, null, null, null, null,null,'dmedinaCoStar22!',null,null),
    new User(51, 'amimbs@costargroup.com', 'Andy', 'Mimbs', null, 'amimbs@costargroup.com', 'CoStar Real Estate Manager - (Group)', null, null, null, null, null,null,'DanAndRustyOnSteroids!',null,null),
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        // wrap in delayed observable to simulate server api call
        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize()) // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }    
        }

        // route functions

        function authenticate() {
            console.log("i made it to the authenticate method in the fake back end");
            const { username, password } = body;
            // console.log(username, password);
            const user = users.find(x => x.username === username && x.password === password);
            if (!user) return error('Username or password is incorrect');
            return ok({
                id: user.id,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName
            })
        }

        function getUsers() {
            if (!isLoggedIn()) return unauthorized();
            return ok(this.users);
        }

        // helper functions

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }))
        }

        function error(message) {
            return throwError({ error: { message } });
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'Unauthorised' } });
        }

        function isLoggedIn() {
            return headers.get('Authorization') === `Basic ${window.btoa('test:test')}`;
        }
    }
}

export let fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};