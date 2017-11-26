import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "app/services/user.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material";
import { IUser } from "app/shared/models";

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

    constructor(private userService: UserService, private router: Router,
        private snackBar: MatSnackBar) { }

    ngOnInit() {
        this.userForm = new FormGroup({
            username: this.username, password : this.password,
            firstname: this.firstname,
            lastname: this.lastname, email: this.email
        });

     }

     createUser(formValues) {
        let newUser: IUser;
        newUser = {
            username : formValues.username,
            password : formValues.password,
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            email: formValues.email,
            enabled : true,
            lastPasswordResetDate : new Date(),
            role : { id : 1}
        };

        this.userService.create(newUser).subscribe((val) => {
            this.router.navigate(["/users"]);
            this.snackBar.open("success", null, {duration: 2000});
        },
            (err) => {
            },
            () => {

            });
    }

    cancel() {
        this.router.navigate(["/users"]);
    }

}
