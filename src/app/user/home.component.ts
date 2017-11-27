import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";
import { MatSnackBar } from "@angular/material";

@Component({
    selector: "home-component",
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {

    loginForm: FormGroup;

    userName = new FormControl();
    password = new FormControl();

    loading = false;
    error = "";

    validating = false;

    constructor(
        private router: Router, private authenticationService: AuthenticationService, private snackBar: MatSnackBar) {
    }

    ngOnInit() {
        this.loginForm = new FormGroup({
            userName: this.userName,
            password: this.password
        });
        // reset login status
        this.authenticationService.logout();
    }

    login(formValues) {
        if (this.validating) {
            return;
        }
        this.validating = true;
        if (!formValues.userName || !formValues.password) {
            this.snackBar.open("Nom d'utilisateur ou mot de passe vide", null, { duration: 2000 });
            return;
        }
        this.loading = true;
        this.authenticationService.login(formValues.userName, formValues.password)
            .subscribe(
            result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(["/clients"]);
                    this.snackBar.open(formValues.userName + " connecté avec success", null, { duration: 2000 });
                } else {
                    // login failed
                    this.error = "Nom d'utilisateur ou mot de passe incorrect";
                    this.loading = false;
                    this.snackBar.open("Nom d'utilisateur ou mot de passe incorrect", null, { duration: 2000 });
                }
            },
            error => {
                this.loading = false;
                this.error = error;
                this.snackBar.open("Nom d'utilisateur ou mot de passe incorrect", null, { duration: 2000 });
            });
            this.validating = false;
    }
}
