import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { IFournisseur } from "app/shared/models";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { AuthenticationService } from "app/services/authentication.service";


@Injectable()
export class FournisseurService {

    constructor(private http: Http, private authenticationService: AuthenticationService) {
    }

    getFilteredList(filter: String, pageIndex: number): Observable<IFournisseur[]> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.get("/api/filteredFournisseurs?filter=" + filter + "&pageIndex=" + pageIndex, { headers: headers })
            .map((response: Response) => response.json());
    }

    count(filter: String): Observable<number> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.get("/api/filteredFournisseurs/count?filter=" + filter, { headers: headers })
            .map((response: Response) => response.json());
    }

    delete(id: number): Observable<any> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.delete("/api/fournisseurs/" + id, { headers: headers });
    }

    find(id: number): Observable<IFournisseur> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.get("/api/fournisseurs/" + id, { headers: headers }).map((response: Response) => response.json());
    }

    create(fournissseur: IFournisseur): Observable<IFournisseur> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.post("/api/fournisseurs", fournissseur, { headers: headers }).
        map((response: Response) => <IFournisseur>response.json());
    }

    edit(fournisseur: IFournisseur): Observable<IFournisseur> {
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this.authenticationService.getToken()
        });
        return this.http.put("/api/fournisseurs/" + fournisseur.id, fournisseur, { headers: headers }).
        map((response: Response) => <IFournisseur>response.json());
    }

}
