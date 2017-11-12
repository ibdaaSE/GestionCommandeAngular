import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';
import { IClient, IProduit, ICommande } from 'app/shared/models';
import { ClientService } from 'app/services/client.service';
import { Http, RequestOptions, Response,Headers } from '@angular/http';

@Component({
    selector: 'create-commande',
    templateUrl: './createCommande.component.html',
    styleUrls: ['./createCommande.component.css']
})
export class CreateCommandeComponent implements OnInit {
    commandeForm: FormGroup;
    searchClientForm = new FormControl('', Validators.required);
    numero = new FormControl('', Validators.required);
    dateCommande = new FormControl('', Validators.required);
    montantHT = new FormControl('', Validators.required);
    montantTTC = new FormControl('', Validators.required);
    delaiLivraison = new FormControl('', Validators.required);
    refCommandeClient = new FormControl('', Validators.required);
    modePayement = new FormControl('', Validators.required);
    public selectedClient: IClient;
    filtredClients: Observable<IClient[]>;

    produits: IProduit[] = [];
    totalAchatsHT: number = 0;
    totalAchatsTTC: number = 0;

    constructor(private clientService: ClientService, private http: Http) {
    }

    ngOnInit() {
        this.filtredClients = this.searchClientForm.valueChanges
            .map((client: IClient) => {
                if (client && typeof client === 'object') {
                    this.selectedClient = client;
                    let s = null;
                    return s;
                } else {
                    return client;
                }

            })
            .map((filter: string) => {
                if (filter) {
                    return this.filterClients(filter);
                } else {
                    return [];
                }
            }
            );

        this.commandeForm = new FormGroup({
            searchClientForm: this.searchClientForm,
            numero: this.numero,
            dateCommande: this.dateCommande,
            montantHT: this.montantHT,
            montantTTC: this.montantTTC,
            delaiLivraison: this.delaiLivraison,
            refCommandeClient: this.refCommandeClient,
            modePayement: this.modePayement
        });
    }

    filterClients(filter: String): IClient[] {
        let clients: IClient[] = [];
        this.clientService.getClients(filter, 0).subscribe((data) => {
            for (let client of data) {
                clients.push(client);
            }
            return clients;
        });
        return clients;
    }

    clearSelectedClient() {
        this.selectedClient = null;
        this.searchClientForm.setValue('');
    }

    addProduit(produit: IProduit) {
        this.produits.push(produit)
        this.totalAchatsHT = this.totalAchatsHT + produit.montantHT;
        this.totalAchatsTTC = this.totalAchatsTTC + produit.montantTTC;
    }

    deletedProduit(produitToDelete: IProduit) {
        this.produits = this.produits.filter((produit: IProduit) =>
            produit.fournisseur.id != produitToDelete.fournisseur.id)
        console.log(this.produits);
    }

    createCommande(formValues) {
        let newCommande: ICommande;
        newCommande = {
            numero: formValues.numero,
            dateCommande: formValues.dateCommande,
            montantHT: formValues.montantHT,
            montantTTC: formValues.montantTTC,
            delaiLivraison: formValues.delaiLivraison,
            refCommandeClient: formValues.refCommandeClient,
            modePayement: formValues.modePayement,
            client: this.selectedClient
        }
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post('/api/createCommande', {'commande' : newCommande, 'produits' : this.produits} , options).
        map((response: Response) => response.json()).subscribe();
        console.log()

        this.selectedClient = null;
        this.commandeForm.reset();
    }
}