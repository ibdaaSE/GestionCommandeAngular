import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "app/services/user.service";
import { MatSnackBar, MatDialog } from "@angular/material";
import { Location } from "@angular/common";
import { IUser } from "app/shared/models";
import { ConfirmationDialogComponent } from "app/shared/confirmationDialog.component";

@Component({
    selector: "create-user",
    templateUrl: "./createUser.component.html",
    styleUrls: ["./createUser.component.css"]
})
export class CreateUserComponent implements OnInit {
    userForm: FormGroup;
    username = new FormControl("", Validators.required);
    password = new FormControl("", Validators.required);
    firstname = new FormControl();
    lastname = new FormControl();
    email = new FormControl();
    validating = false;
    hidePassword = true;

    constructor(private userService: UserService, private location: Location,
        public dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.userForm = new FormGroup({
            username: this.username, password: this.password,
            firstname: this.firstname,
            lastname: this.lastname, email: this.email
        });
    }

    createUser(formValues) {
        if (this.validating) {
            return;
        }
        this.validating = true;
        if (this.userForm.valid) {
            let newUser: IUser;
            newUser = {
                username: formValues.username,
                password: formValues.password,
                firstname: formValues.firstname,
                lastname: formValues.lastname,
                email: formValues.email,
                enabled: true,
                lastPasswordResetDate: new Date(),
                role: { id: 1 }
            };

            this.userService.create(newUser).subscribe((val) => {
                this.location.back();
                this.snackBar.open("L'utilisateur : " + formValues.username + " créé", null, { duration: 2000 });
            },
                (err) => {
                },
                () => {

                });
        }
        this.validating = false;
    }

    cancel() {
        if (this.userForm.dirty) {
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
