import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IClient } from 'app/shared/models';
import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {

    constructor(private http: Http) {
    }

    getClients(filter: String, pageIndex: number): Observable<IClient[]> {
        console.log('/api/filteredClients?filter=' + filter + '&pageIndex=' + pageIndex);

        return this.http.get('/api/filteredClients?filter=' + filter + '&pageIndex=' + pageIndex)
            .map((response: Response) => response.json());
    }
}