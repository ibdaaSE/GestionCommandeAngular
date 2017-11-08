import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FournisseurService } from 'app/services/fournisseur.service';
import { IFournisseur } from 'app/shared/models';

@Component({
    selector: 'create-fournisseur',
    templateUrl: './createFournisseur.component.html',
    styleUrls: ['./createFournisseur.component.css']
})
export class CreateFournisseurComponent implements OnInit {

    fournisseurForm: FormGroup;
    raisonSociale = new FormControl(); responsable = new FormControl();
    adresse = new FormControl(); email = new FormControl();
    cp = new FormControl(); ville = new FormControl();
    pays = new FormControl();

    constructor(private fournisseurService: FournisseurService, private router: Router,
    private snackBar:MatSnackBar) { }

    ngOnInit() {
        this.fournisseurForm = new FormGroup({
            raisonSociale: this.raisonSociale, responsable: this.responsable,
            adresse: this.adresse, email: this.email,
            cp: this.cp, ville: this.ville,
            pays: this.pays
        });

    }

    createFournisseur(formValues){
        let newFournisseur: IFournisseur;
        newFournisseur = {
            raisonSociale: formValues.raisonSociale,
            responsable: formValues.responsable,
            adresse: formValues.adresse,
            email: formValues.email,
            cp: formValues.cp,
            ville: formValues.ville,
            pays: formValues.pays
        }

        this.fournisseurService.createFournisseur(newFournisseur).subscribe((val) => {
            this.router.navigate(['/fournisseurs']);
            this.snackBar.open("success");
        },
            (err) => {
            },
            () => {

            });
    }

    cancel(){
        this.router.navigate(['/fournisseurs']);
    }

}