import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IClient } from 'app/shared/models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from 'app/services/authentication.service';


@Injectable()
export class CommandeService {

    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getFiltredList(filter: String, pageIndex: number): Observable<IClient[]> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
        return this.http.get('/api/filteredCommandes?filter=' + filter + '&pageIndex=' + pageIndex, { headers: headers })
            .map((response: Response) => response.json());
    }

    count(filter: String): Observable<number> {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.authenticationService.getToken()
        });
        return this.http.get('/api/filteredCommandes/count?filter=' + filter, { headers: headers })
            .map((response: Response) => response.json());
    }
}