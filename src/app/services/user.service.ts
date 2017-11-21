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

    getUsers(): Observable<any> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
        return this.http.get('/api/users', { headers: headers })
            .map((response: Response) => response.json());
    }

    deleteUser(id :number) : Observable<any>{
        return null;
    }

    createUser(){
        
    }


}