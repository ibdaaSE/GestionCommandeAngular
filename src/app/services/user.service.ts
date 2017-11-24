import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AuthenticationService } from 'app/services/authentication.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { IUser } from 'app/shared/models';

@Injectable()
export class UserService {
    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getFilteredList(): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
        return this.http.get('/api/users', { headers: headers })
            .map((response: Response) => response.json());
    }

    find(id: number): Observable<IUser> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
        return this.http.get('/api/users/' + id, { headers: headers })
            .map((response: Response) => <IUser>response.json());
    }

    delete(id: number): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
        return this.http.delete('/api/users/' + id, { headers: headers })
            .map((response: Response) => response.json());
    }

    create(user: IUser): Observable<IUser> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
        return this.http.post('/api/createUser', user, { headers: headers })
            .map((response: Response) => <IUser>response.json());
    }

    edit(user: IUser): Observable<IUser> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
        return this.http.patch('/api/users/' + user.id, user, { headers: headers })
            .map((response: Response) => <IUser>response.json());
    }

    changePassword(newPassword) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.authenticationService.getToken()
        });
        return this.http.patch('/api/changePassword', newPassword, { headers: headers })
            .map((response: Response) => {
                return response.json()
            });
    }

}