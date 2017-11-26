import { Component, OnInit } from "@angular/core";
import { ClientService } from "app/services/client.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { IClient } from "app/shared/models";
import { MatSnackBar } from "@angular/material";
import { Location } from "@angular/common";

@Component({
    selector: "create-client",
    templateUrl: "./createClient.component.html",
    styleUrls: ["./createClient.component.css"]
})
export class CreateClientComponent implements OnInit {

    clientForm: FormGroup;
    raisonSociale = new FormControl("", Validators.required); responsable = new FormControl();
    adresse = new FormControl(); email = new FormControl("", Validators.email);
    cp = new FormControl(); ville = new FormControl();
    pays = new FormControl();
    validating = false;

    constructor(private clientService: ClientService, private location: Location,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.clientForm = new FormGroup({
            raisonSociale: this.raisonSociale, responsable: this.responsable,
            adresse: this.adresse, email: this.email,
            cp: this.cp, ville: this.ville,
            pays: this.pays
        });

    }

    createClient(formValues) {
        if (this.validating) {
            return;
        }
        this.validating = true;
        if (this.raisonSociale.valid) {
            let newClient: IClient;
            newClient = {
                raisonSociale: formValues.raisonSociale,
                responsable: formValues.responsable,
                adresse: formValues.adresse,
                email: formValues.email,
                cp: formValues.cp,
                ville: formValues.ville,
                pays: formValues.pays
            };

            this.clientService.create(newClient).subscribe((val) => {
                this.location.back();
                this.snackBar.open(newClient.raisonSociale + " ajouté", null, { duration: 2000 });
            },
                (err) => {
                },
                () => {

                });
        }
        this.validating = false;
    }

    cancel() {
        if (this.clientForm.dirty) {
            console.log("dirty");
        } else {
            this.location.back();
        }
    }

}
