import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthenticationService {

    private previleges = new Subject<any>();
    observedPrevileges = this.previleges.asObservable();


    private headers = new Headers({ 'Content-Type': 'application/json' });

    constructor(private http: Http) {
    }

    login(username: string, password: string): Observable<boolean> {
        let options = new RequestOptions({ headers: this.headers });
        return this.http.post('/api/auth', { username: username, password: password }, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                if (token) {
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                    this.getPrevileges();
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            }).catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    getToken(): String {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        var token = currentUser && currentUser.token;
        return token ? token : "";
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    isLoggedIn(): boolean {
        var token: String = this.getToken();
        return token && token.length > 0;
    }

    getPrevileges() {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.getToken()
        });
        this.http.get('/api/previleges', { headers: headers })
            .map((response: Response) => response.json()).subscribe(
            (val) => { this.previleges.next(val); return val; }
            );
    }
}