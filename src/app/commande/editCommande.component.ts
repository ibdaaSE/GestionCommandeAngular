import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IClient, IProduit, ICommande } from "app/shared/models";
import { Observable } from "rxjs/Observable";
import { CommandeService } from "app/services/commande.service";
import { ClientService } from "app/services/client.service";
import { Http } from "@angular/http";
import { ActivatedRoute } from "@angular/router";
import { MatSnackBar, MatDialog } from "@angular/material";
import { Location } from "@angular/common";
import { ConfirmationDialogComponent } from "app/shared/confirmationDialog.component";

@Component({
    selector: "edit-commande",
    templateUrl: "./editCommande.component.html",
    styleUrls: ["./editCommande.component.css"]
})
export class EditCommandeComponent implements OnInit {
    commandeForm: FormGroup;
    searchClientForm = new FormControl("", Validators.required);
    numero = new FormControl("", Validators.required);
    dateCommande = new FormControl("", Validators.required);
    montantHT = new FormControl("", Validators.required);
    montantTTC = new FormControl("", Validators.required);
    delaiLivraison = new FormControl("", Validators.required);
    refCommandeClient = new FormControl("", Validators.required);
    modePayement = new FormControl("", Validators.required);
    selectedClient: IClient;
    filtredClients: Observable<IClient[]>;

    produits: IProduit[] = [];
    edittedProduit: IProduit;
    totalAchatsHT = 0;
    totalAchatsTTC = 0;
    touchedList = false;

    validating = false;

    constructor(private service: CommandeService, private clientService: ClientService, private http: Http, private location: Location
        , private route: ActivatedRoute, private snackBar: MatSnackBar, public dialog: MatDialog) {
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
            numero: this.numero,
            dateCommande: this.dateCommande,
            montantHT: this.montantHT,
            montantTTC: this.montantTTC,
            delaiLivraison: this.delaiLivraison,
            refCommandeClient: this.refCommandeClient,
            modePayement: this.modePayement
        });

        this.service.find(this.route.snapshot.params["id"]).subscribe(
            (response) => {
                this.fillCommande(response);
            }
        );
    }

    fillCommande(response: any) {
        this.selectedClient = response.commande.client;
        this.numero.setValue(response.commande.numero);
        this.dateCommande.setValue(response.commande.dateCommande);
        this.montantHT.setValue(response.commande.montantHT);
        this.montantTTC.setValue(response.commande.montantTTC);
        this.delaiLivraison.setValue(response.commande.delaiLivraison);
        this.refCommandeClient.setValue(response.commande.refCommandeClient);
        this.modePayement.setValue(response.commande.modePayement);
        this.produits = response.produits;
        this.totalAchatsHT = response.commande.totalAchatHT;
        this.totalAchatsTTC = response.commande.totalAchatTTC;
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
        this.touchedList = true;
    }

    deletedProduit(produitToDelete: IProduit) {
        this.produits = this.produits.filter((produit: IProduit) =>
        !produit.fournisseur || !produitToDelete.fournisseur ? produit.produits !== produitToDelete.produits :
            (produit.fournisseur.id !== produitToDelete.fournisseur.id) || (produit.produits !== produitToDelete.produits));
        this.totalAchatsHT = this.totalAchatsHT - produitToDelete.montantHT;
        this.totalAchatsTTC = this.totalAchatsTTC - produitToDelete.montantTTC;
        this.edittedProduit = produitToDelete;
        this.touchedList = true;
    }

    editCommande(formValues) {
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
            id: this.route.snapshot.params["id"],
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
        this.service.edit(newCommande, this.produits, this.touchedList).subscribe(
            (val) => {
                this.snackBar.open("Commande N°" + formValues.numero + " Modifiée", null, { duration: 2000 });
                this.location.back();
            },
            (err) => {
                this.snackBar.open("Commande Non Modifiée", null, { duration: 2000 });
            },
            () => {

            });
        this.validating = false;
    }

    cancel() {
        if (this.commandeForm.dirty || this.touchedList) {
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
