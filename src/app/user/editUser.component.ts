import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { UserService } from "app/services/user.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { MatSnackBar, MatDialog } from "@angular/material";
import { IUser } from "app/shared/models";
import { ConfirmationDialogComponent } from "app/shared/confirmationDialog.component";

@Component({
    selector: "edit-user",
    templateUrl: "./editUser.component.html",
    styleUrls: ["./editUser.component.css"]
})
export class EditUserComponent implements OnInit {
    userForm: FormGroup;
    username = new FormControl();
    firstname = new FormControl();
    lastname = new FormControl();
    email = new FormControl();
    validating = false;

    constructor(private userService: UserService, private location: Location,
        public dialog: MatDialog, private route: ActivatedRoute,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.userForm = new FormGroup({
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname, email: this.email
        });

        this.userService.find(this.route.snapshot.params["id"]).subscribe(
            user => {
                console.log(user);

                this.initUserForm(user);
            }
        );

    }

    initUserForm(user: IUser) {
        this.username.setValue(user.username);
        this.username.disable();
        this.firstname.setValue(user.firstname);
        this.lastname.setValue(user.lastname);
        this.email.setValue(user.email);
    }

    editUser(formValues) {
        if (this.validating) {
            return;
        }
        this.validating = true;
        let newUser: IUser;
        newUser = {
            id: this.route.snapshot.params["id"],
            username: formValues.username,
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            email: formValues.email,
        };

        this.userService.edit(newUser).subscribe((val) => {
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
