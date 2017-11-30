import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "app/services/user.service";
import { Location } from "@angular/common";
import { MatSnackBar, MatDialog } from "@angular/material";
import { ConfirmationDialogComponent } from "app/shared/confirmationDialog.component";

@Component({
    selector: "change-password",
    templateUrl: "./changePassword.component.html",
    styleUrls: ["./changePassword.component.css"]
})
export class ChangePasswordComponent implements OnInit {

    userPasswordForm: FormGroup;
    oldPassword = new FormControl("", Validators.required);
    newPassword = new FormControl("", Validators.required);
    newPassword2 = new FormControl("", Validators.required);

    validating = false;
    hideOldPassword = true;
    hideNewPassword = true;
    hideConfirmationPassword = true;

    constructor(private userService: UserService, private location: Location,
        public dialog: MatDialog, private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.userPasswordForm = new FormGroup({
            oldPassword: this.oldPassword,
            newPassword: this.newPassword,
            newPassword2: this.newPassword2
        });
    }

    changePassword(formValues) {
        if (this.validating) {
            return;
        }
        this.validating = true;
        if (!this.userPasswordForm.valid) {
            this.validating = false;
            return;
        }
        if (formValues.newPassword !== formValues.newPassword2) {
            this.snackBar.open("Vérifiez la confirmation du nouveau mot de passe", null, { duration: 2000 });
            this.validating = false;
            return;
        }
        console.log("invalid");
        const newPassword = {
            oldPassword: formValues.oldPassword,
            newPassword: formValues.newPassword
        };
        this.userService.changePassword(newPassword).subscribe(
            (response) => {
                if (response != null) {
                    this.location.back();
                    this.snackBar.open("Mot de Passe Changé", null, { duration: 2000 });
                }
                else {
                    this.snackBar.open("Le mot de passe actuel est invalide", null, { duration: 2000 });
                }
            }
        );
        this.validating = false;
    }

    cancel() {
        if (this.userPasswordForm.dirty) {
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
