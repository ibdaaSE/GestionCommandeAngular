import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IClient } from 'app/shared/models';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'edit-client',
    templateUrl: './editClient.component.html',
    styleUrls: ['./editClient.component.css']
})
export class EditClientComponent implements OnInit {

    clientForm: FormGroup;
    raisonSociale = new FormControl('', Validators.required); responsable = new FormControl();
    adresse = new FormControl(); email = new FormControl('', Validators.email);
    cp = new FormControl(); ville = new FormControl();
    pays = new FormControl();
    validating = false;

    constructor(private clientService: ClientService, private location: Location
        , private route: ActivatedRoute, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.clientForm = new FormGroup({
            raisonSociale: this.raisonSociale, responsable: this.responsable,
            adresse: this.adresse, email: this.email, cp: this.cp, ville: this.ville,
            pays: this.pays
        });

        this.clientService.find(this.route.snapshot.params['id']).subscribe(
            client => {
                this.initClientForm(client);
            }
        );
    }

    initClientForm(client: IClient) {
        this.raisonSociale.setValue(client.raisonSociale);
        this.responsable.setValue(client.responsable);
        this.adresse.setValue(client.adresse);
        this.email.setValue(client.email);
        this.cp.setValue(client.cp);
        this.ville.setValue(client.ville);
        this.pays.setValue(client.pays);
    }

    editClient(formValues) {
        if (this.validating) {
            return;
        }
        this.validating = true;
        let newClient: IClient;
        newClient = {
            id: this.route.snapshot.params['id'],
            raisonSociale: formValues.raisonSociale,
            responsable: formValues.responsable,
            adresse: formValues.adresse,
            email: formValues.email,
            cp: formValues.cp,
            ville: formValues.ville,
            pays: formValues.pays
        }

        this.clientService.edit(newClient).subscribe((val) => {
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
        this.location.back();
    }
}