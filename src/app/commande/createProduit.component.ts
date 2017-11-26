import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, SimpleChanges } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/startWith";
import "rxjs/add/operator/map";
import { IFournisseur, IProduit } from "app/shared/models";
import { FournisseurService } from "app/services/fournisseur.service";
import { OnChanges } from "@angular/core/src/metadata/lifecycle_hooks";

@Component({
    selector: "create-produit",
    templateUrl: "./createProduit.component.html",
    styleUrls: ["./createProduit.component.css"]
})
export class CreateProduitComponent implements OnInit, OnChanges {


    produitForm: FormGroup;
    searchFournisseurForm = new FormControl("", Validators.required);
    produits = new FormControl("", Validators.required);
    delai = new FormControl("", Validators.required);
    montantHT = new FormControl("", Validators.required);
    montantTTC = new FormControl("", Validators.required);

    public selectedFournisseur: IFournisseur;
    filtredFournisseurs: Observable<IFournisseur[]>;

    @Input() edittedProduit: IProduit;
    @Output() addProduitEvent = new EventEmitter;

    constructor(private FournisseurService: FournisseurService) {
    }

    ngOnInit() {
        this.filtredFournisseurs = this.searchFournisseurForm.valueChanges
            .map((fournisseur) => {
                if (fournisseur && typeof fournisseur === "object") {
                    this.selectedFournisseur = fournisseur;
                    const s = null;
                    return s;
                } else {
                    return fournisseur;
                }

            })
            .map((filter) => {
                if (filter) {
                    return this.filterFournisseurs(filter);
                } else {
                    return [];
                }
            }
            );
        this.produitForm = new FormGroup({
            searchFournisseurForm: this.searchFournisseurForm,
            produits: this.produits,
            delai: this.delai,
            montantHT: this.montantHT,
            montantTTC: this.montantTTC
        });

    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.edittedProduit.firstChange) return;
        this.autoFillProduit();
    }

    autoFillProduit() {
        this.selectedFournisseur = this.edittedProduit.fournisseur;
        this.produits.setValue(this.edittedProduit.produits);
        this.delai.setValue(this.edittedProduit.delai);
        this.montantHT.setValue(this.edittedProduit.montantHT);
        this.montantTTC.setValue(this.edittedProduit.montantTTC);
    }

    filterFournisseurs(filter: String): IFournisseur[] {
        const fournisseurs: IFournisseur[] = [];
        this.FournisseurService.getFilteredList(filter, 0).subscribe((data) => {
            for (const fournisseur of data) {
                fournisseurs.push(fournisseur);
            }
            return fournisseurs;
        });
        return fournisseurs;
    }

    clearSelectedFournisseur() {
        this.selectedFournisseur = null;
        this.searchFournisseurForm.setValue("");
    }

    createProduit(formValues) {
        let newProduit: IProduit;
        newProduit = {
            delai: formValues.delai,
            montantHT: +formValues.montantHT,
            montantTTC: +formValues.montantTTC,
            produits: formValues.produits,
            fournisseur: this.selectedFournisseur,
        };
        this.addProduitEvent.emit(newProduit);
        this.selectedFournisseur = null;
        this.produitForm.reset();
    }

    clear() {
        this.selectedFournisseur = null;
    }
}
