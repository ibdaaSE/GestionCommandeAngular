import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatSnackBar, MatDialog } from "@angular/material";
import { FournisseurService } from "app/services/fournisseur.service";
import { IFournisseur } from "app/shared/models";
import { Location } from "@angular/common";
import { ConfirmationDialogComponent } from "app/shared/confirmationDialog.component";

@Component({
    selector: "create-fournisseur",
    templateUrl: "./createFournisseur.component.html",
    styleUrls: ["./createFournisseur.component.css"]
})
export class CreateFournisseurComponent implements OnInit {

    fournisseurForm: FormGroup;
    raisonSociale = new FormControl("", Validators.required); responsable = new FormControl();
    adresse = new FormControl(); email = new FormControl("", Validators.email);
    cp = new FormControl(); ville = new FormControl();
    pays = new FormControl();
    validating = false;

    constructor(private fournisseurService: FournisseurService, private location: Location,
        public dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.fournisseurForm = new FormGroup({
            raisonSociale: this.raisonSociale, responsable: this.responsable,
            adresse: this.adresse, email: this.email,
            cp: this.cp, ville: this.ville,
            pays: this.pays
        });

    }

    createFournisseur(formValues) {
        if (this.validating) {
            return;
        }
        this.validating = true;
        let newFournisseur: IFournisseur;
        newFournisseur = {
            raisonSociale: formValues.raisonSociale,
            responsable: formValues.responsable,
            adresse: formValues.adresse,
            email: formValues.email,
            cp: formValues.cp,
            ville: formValues.ville,
            pays: formValues.pays
        };

        this.fournisseurService.create(newFournisseur).subscribe((val) => {
            this.location.back();
            this.snackBar.open("success", null, { duration: 2000 });
        },
            (err) => {
            },
            () => {
            });
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
