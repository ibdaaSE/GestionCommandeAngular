import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { FournisseurService } from 'app/services/fournisseur.service';
import { IFournisseur } from 'app/shared/models';

@Component({
    selector: 'edit-fournisseur',
    templateUrl: './editFournisseur.component.html',
    styleUrls: ['./editFournisseur.component.css']
})
export class EditFournisseurComponent implements OnInit {

    fournisseurForm: FormGroup;
    raisonSociale = new FormControl('', Validators.required); responsable = new FormControl();
    adresse = new FormControl(); email = new FormControl('', Validators.email);
    cp = new FormControl(); ville = new FormControl();
    pays = new FormControl();

    constructor(private fournisseurService: FournisseurService, private router: Router
        , private route: ActivatedRoute, private snackBar:MatSnackBar) { }

    ngOnInit() {
        this.fournisseurForm = new FormGroup({
            raisonSociale: this.raisonSociale, responsable: this.responsable,
            adresse: this.adresse, email: this.email, cp: this.cp, ville: this.ville,
            pays: this.pays
        });

        this.fournisseurService.getFournisseur(this.route.snapshot.params['id']).subscribe(
            fournisseur => {
                this.initFournisseurForm(fournisseur);
            }
        );
    }

    initFournisseurForm(fournisseur: IFournisseur) {
        this.raisonSociale.setValue(fournisseur.raisonSociale);
        this.responsable.setValue(fournisseur.responsable);
        this.adresse.setValue(fournisseur.adresse);
        this.email.setValue(fournisseur.email);
        this.cp.setValue(fournisseur.cp);
        this.ville.setValue(fournisseur.ville);
        this.pays.setValue(fournisseur.pays);
    }

    editFournisseur(formValues) {
        let newFournisseur: IFournisseur;
        newFournisseur = {
            id: this.route.snapshot.params['id'],
            raisonSociale: formValues.raisonSociale,
            responsable: formValues.responsable,
            adresse: formValues.adresse,
            email: formValues.email,
            cp: formValues.cp,
            ville: formValues.ville,
            pays: formValues.pays
        }

        this.fournisseurService.editFournisseur(newFournisseur).subscribe((val) => {
            this.router.navigate(['/fournisseurs']);
            this.snackBar.open("success", null, {duration: 2000});
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