import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IClient, ICommande, IProduit } from "app/shared/models";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { AuthenticationService } from "app/services/authentication.service";


@Injectable()
export class CommandeService {

    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getFilteredList(filter: String, pageIndex: number): Observable<ICommande[]> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.get("/api/filteredCommandes?filter=" + filter + "&pageIndex=" + pageIndex, { headers: headers })
            .map((response: Response) => response.json());
    }

    count(filter: String): Observable<number> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.get("/api/filteredCommandes/count?filter=" + filter, { headers: headers })
            .map((response: Response) => response.json());
    }

    find(id: number): Observable<ICommande> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });

        return this.http.get("/api/getCommande?commandeId=" + id, { headers: headers })
            .map((response: Response) => response.json());

    }

    create(commande: ICommande, produits: IProduit[]) {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        this.http.post("/api/createCommande", { "commande": commande, "produits": produits }, { headers: headers }).
            map((response: Response) => response.json()).subscribe();
    }

    delete(id: number): Observable<any> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.delete("/api/deleteCommande?commandeId=" + id, { headers: headers }).
            map((response: Response) => response.json());
    }

    edit(commande: ICommande, produits: IProduit[], touchedList: boolean): Observable<ICommande> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.
            put("/api/editCommande", { "commande": commande, "produits": produits, "touchedList": touchedList }, { headers: headers }).
            map((response: Response) => response.json());
    }

}
