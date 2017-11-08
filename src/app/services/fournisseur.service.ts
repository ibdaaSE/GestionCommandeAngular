import { Injectable } from '@angular/core';
import { Http, Response,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { IFournisseur } from 'app/shared/models';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class FournisseurService {

    constructor(private http: Http) {
    }

    getFournisseurs(filter: String, pageIndex: number): Observable<IFournisseur[]> {
        console.log('/api/filteredFournisseurs?filter=' + filter + '&pageIndex=' + pageIndex);

        return this.http.get('/api/filteredFournisseurs?filter=' + filter + '&pageIndex=' + pageIndex)
            .map((response: Response) => response.json());
    }

    deleteFournisseur(id: number): Observable<any> {
        return this.http.delete('/api/fournisseurs/' + id);
    }

    getFournisseur(id: number): Observable<IFournisseur> {
        return this.http.get('/api/fournisseurs/' + id).map((response: Response) => response.json());
    }

    createFournisseur(fournissseur: IFournisseur): Observable<IFournisseur> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('/api/fournisseurs', fournissseur, options).map((response: Response) => <IFournisseur>response.json());;
    }

    editFournisseur(fournisseur: IFournisseur): Observable<IFournisseur> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put('/api/fournisseurs/' + fournisseur.id, fournisseur, options).map((response: Response) => <IFournisseur>response.json());
    }

}