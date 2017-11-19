import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    loginForm: FormGroup;

    userName = new FormControl('', Validators.required); 
    password = new FormControl();
    
    loading = false;
    error = '';

    constructor(
        private router: Router, private authenticationService: AuthenticationService) { 

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
        this.loading = true;
        this.authenticationService.login(formValues.userName, formValues.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['/clients']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                    this.loading = false;
                }
            }, error => {
              this.loading = false;
              this.error = error;
            });
    }
}