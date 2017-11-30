import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import { IClient, IProduit, ICommande, IFournisseur } from "app/shared/models";
import { ClientService } from "app/services/client.service";
import { Http, RequestOptions, Response, Headers } from "@angular/http";
import { CommandeService } from "app/services/commande.service";
import { Location } from "@angular/common";
import { MatDialog, MatSnackBar } from "@angular/material";
import { ConfirmationDialogComponent } from "app/shared/confirmationDialog.component";

@Component({
    selector: "create-commande",
    templateUrl: "./createCommande.component.html",
    styleUrls: ["./createCommande.component.css"]
})
export class CreateCommandeComponent implements OnInit {
    commandeForm: FormGroup;
    searchClientForm = new FormControl();
    dateCommande = new FormControl();
    montantHT = new FormControl();
    montantTTC = new FormControl();
    delaiLivraison = new FormControl();
    refCommandeClient = new FormControl();
    modePayement = new FormControl();
    public selectedClient: IClient;
    filtredClients: Observable<IClient[]>;

    produits: IProduit[] = [];
    edittedProduit: IProduit;
    totalAchatsHT = 0;
    totalAchatsTTC = 0;

    validating = false;

    constructor(private service: CommandeService, private clientService: ClientService, private http: Http, private location: Location,
        public dialog: MatDialog, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.filtredClients = this.searchClientForm.valueChanges
            .map((client: IClient) => {
                if (client && typeof client === "object") {
                    this.selectedClient = client;
                    const s = null;
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
            dateCommande: this.dateCommande,
            montantHT: this.montantHT,
            montantTTC: this.montantTTC,
            delaiLivraison: this.delaiLivraison,
            refCommandeClient: this.refCommandeClient,
            modePayement: this.modePayement
        });
    }

    filterClients(filter: String): IClient[] {
        const clients: IClient[] = [];
        this.clientService.getFilteredList(filter, 0).subscribe((data) => {
            for (const client of data) {
                clients.push(client);
            }
            return clients;
        });
        return clients;
    }

    clearSelectedClient() {
        this.selectedClient = null;
        this.searchClientForm.setValue("");
    }

    addProduit(produit: IProduit) {
        const existingProduits = this.produits.filter((p: IProduit) =>
            !p.fournisseur || !produit.fournisseur ? p.produits === produit.produits :
                (p.fournisseur.id === produit.fournisseur.id && p.produits === produit.produits));
        if (existingProduits.length > 0) {
            this.snackBar.open("Ce produit existe déjà", null, { duration: 2000 });
            return;
        }
        this.produits.push(produit);
        this.totalAchatsHT = this.totalAchatsHT + produit.montantHT;
        this.totalAchatsTTC = this.totalAchatsTTC + produit.montantTTC;
    }

    deletedProduit(produitToDelete: IProduit) {
        this.produits = this.produits.filter((produit: IProduit) =>
            !produit.fournisseur || !produitToDelete.fournisseur ? produit.produits !== produitToDelete.produits :
                (produit.fournisseur.id !== produitToDelete.fournisseur.id) || (produit.produits !== produitToDelete.produits));
        this.totalAchatsHT = this.totalAchatsHT - produitToDelete.montantHT;
        this.totalAchatsTTC = this.totalAchatsTTC - produitToDelete.montantTTC;
        this.edittedProduit = produitToDelete;
    }

    createCommande(formValues) {
        if (this.validating) {
            return;
        }
        this.validating = true;
        if (!this.selectedClient) {
            this.snackBar.open("Veuillez sélectionner un client", null, { duration: 2000 });
            this.validating = false;
            return;
        }
        let newCommande: ICommande;
        newCommande = {
            numero: formValues.numero,
            dateCommande: formValues.dateCommande,
            montantHT: formValues.montantHT,
            montantTTC: formValues.montantTTC,
            delaiLivraison: formValues.delaiLivraison,
            refCommandeClient: formValues.refCommandeClient,
            modePayement: formValues.modePayement,
            totalAchatHT: this.totalAchatsHT,
            totalAchatTTC: this.totalAchatsTTC,
            client: this.selectedClient
        };
        this.produits.map((prod: IProduit) => {
            let fournisseur;
            if (prod.fournisseur) {
                fournisseur = { "id": prod.fournisseur.id };
                prod.fournisseur = fournisseur;
            }

        });
        this.validating = false;
        this.service.create(newCommande, this.produits);
        this.location.back();
    }

    cancel() {
        if (this.commandeForm.dirty || this.produits.length > 0) {
            const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
                width: "600px",
                data: { message: "Voulez vous vraiment quitter cette page sans valider ?" }
            });

            dialogRef.afterClosed().subscribe(result => {
                if (result) this.location.back();
            });
        } else {
            this.location.back();
        }
    }
}
