import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/services/client.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { IClient } from 'app/shared/models';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'create-client',
    templateUrl: './createClient.component.html',
    styleUrls: ['./createClient.component.css']
})
export class CreateClientComponent implements OnInit {

    clientForm: FormGroup;
    raisonSociale = new FormControl(); responsable = new FormControl();
    adresse = new FormControl(); email = new FormControl();
    cp = new FormControl(); ville = new FormControl();
    pays = new FormControl();

    constructor(private clientService: ClientService, private router: Router,
    private snackBar:MatSnackBar) { }

    ngOnInit() {
        this.clientForm = new FormGroup({
            raisonSociale: this.raisonSociale, responsable: this.responsable,
            adresse: this.adresse, email: this.email,
            cp: this.cp, ville: this.ville,
            pays: this.pays
        });

    }

    createClient(formValues){
        let newClient: IClient;
        newClient = {
            raisonSociale: formValues.raisonSociale,
            responsable: formValues.responsable,
            adresse: formValues.adresse,
            email: formValues.email,
            cp: formValues.cp,
            ville: formValues.ville,
            pays: formValues.pays
        }

        this.clientService.createClient(newClient).subscribe((val) => {
            this.router.navigate(['/clients']);
            this.snackBar.open("success");
        },
            (err) => {
            },
            () => {

            });
    }

    cancel(){
        this.router.navigate(['/clients']);
    }

}