import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IClient } from "app/shared/models";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { AuthenticationService } from "app/services/authentication.service";


@Injectable()
export class ClientService {

    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getFilteredList(filter: String, pageIndex: number): Observable<IClient[]> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.get("/api/filteredClients?filter=" + filter + "&pageIndex=" + pageIndex, { headers: headers })
            .map((response: Response) => response.json());
    }

    count(filter: String): Observable<number> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.get("/api/filteredClients/count?filter=" + filter, { headers: headers })
            .map((response: Response) => response.json());
    }

    delete(id: number): Observable<any> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.delete("/api/clients/" + id, { headers: headers });
    }

    find(id: number): Observable<IClient> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.get("/api/clients/" + id, { headers: headers }).map((response: Response) => response.json());
    }

    create(client: IClient): Observable<IClient> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.post("/api/clients", client, { headers: headers }).map((response: Response) => <IClient>response.json());
    }

    edit(client: IClient): Observable<IClient> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.put("/api/clients/" + client.id, client, { headers: headers })
        .map((response: Response) => <IClient>response.json());
    }

}
