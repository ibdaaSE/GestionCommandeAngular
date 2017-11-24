import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'change-password',
    templateUrl: './changePassword.component.html',
    styleUrls: ['./changePassword.component.css']
})
export class ChangePasswordComponent implements OnInit {

    userPasswordForm: FormGroup;
    oldPassword = new FormControl();
    newPassword = new FormControl();
    newPassword2 = new FormControl();

    constructor(private userService: UserService, private router: Router,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.userPasswordForm = new FormGroup({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            newPassword2: this.newPassword2
        });
    }

    changePassword(formValues) {
        let newPassword = {
            oldPassword: formValues.oldPassword,
            newPassword: formValues.newPassword
        }
        this.userService.changePassword(newPassword).subscribe(
            (response) => {
                if (response != null) {
                    this.router.navigate(['']);
                    this.snackBar.open("Mot de Passe Change", null, { duration: 2000 });
                }
                else {
                    this.snackBar.open("Ancien Mot de Passe Invalide", null, { duration: 2000 });
                }
            }
        );

    }

    cancel() {
        this.router.navigate(['']);
    }

}