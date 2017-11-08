import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IClient } from 'app/shared/models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class ClientService {

    constructor(private http: Http) {
    }

    getClients(filter: String, pageIndex: number): Observable<IClient[]> {
        console.log('/api/filteredClients?filter=' + filter + '&pageIndex=' + pageIndex);

        return this.http.get('/api/filteredClients?filter=' + filter + '&pageIndex=' + pageIndex)
            .map((response: Response) => response.json());
    }

    deleteClient(id: number): Observable<any> {
        return this.http.delete('/api/clients/' + id);
    }

    getClient(id: number): Observable<IClient> {
        return this.http.get('/api/clients/' + id).map((response: Response) => response.json());
    }

    createClient(client: IClient): Observable<IClient> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/clients', client, options).map((response: Response) => <IClient>response.json());;
    }

    editClient(client: IClient): Observable<IClient> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put('/api/clients/' + client.id, client, options).map((response: Response) => <IClient>response.json());
    }

}