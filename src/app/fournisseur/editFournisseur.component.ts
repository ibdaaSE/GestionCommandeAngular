import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar, MatDialog } from "@angular/material";
import { FournisseurService } from "app/services/fournisseur.service";
import { IFournisseur } from "app/shared/models";
import { Location } from "@angular/common";
import { ConfirmationDialogComponent } from "app/shared/confirmationDialog.component";

@Component({
    selector: "edit-fournisseur",
    templateUrl: "./editFournisseur.component.html",
    styleUrls: ["./editFournisseur.component.css"]
})
export class EditFournisseurComponent implements OnInit {

    fournisseurForm: FormGroup;
    raisonSociale = new FormControl("", Validators.required); responsable = new FormControl();
    adresse = new FormControl(); email = new FormControl("", Validators.email);
    cp = new FormControl(); ville = new FormControl();
    pays = new FormControl();
    validating = false;

    constructor(private fournisseurService: FournisseurService, private location: Location,
        public dialog: MatDialog, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.fournisseurForm = new FormGroup({
            raisonSociale: this.raisonSociale, responsable: this.responsable,
            adresse: this.adresse, email: this.email, cp: this.cp, ville: this.ville,
            pays: this.pays
        });

        this.fournisseurService.find(this.route.snapshot.params["id"]).subscribe(
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
        if (this.validating) {
            return;
        }
        this.validating = true;
        if (this.raisonSociale.valid) {
            let newFournisseur: IFournisseur;
            newFournisseur = {
                id: this.route.snapshot.params["id"],
                raisonSociale: formValues.raisonSociale,
                responsable: formValues.responsable,
                adresse: formValues.adresse,
                email: formValues.email,
                cp: formValues.cp,
                ville: formValues.ville,
                pays: formValues.pays
            };

            this.fournisseurService.edit(newFournisseur).subscribe((val) => {
                this.location.back();
                this.snackBar.open("Le fournisseur : " + formValues.raisonSociale + " modifié", null, { duration: 2000 });
            },
                (err) => {
                },
                () => {

                });
        }
        this.validating = false;
    }

    cancel() {
        if (this.fournisseurForm.dirty) {
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
