import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { IUser } from 'app/shared/models';

@Component({
    selector: 'edit-user',
    templateUrl: './editUser.component.html',
    styleUrls: ['./editUser.component.css']
})
export class EditUserComponent implements OnInit {
    userForm: FormGroup;
    username = new FormControl();
    firstname = new FormControl();
    lastname = new FormControl(); 
    email = new FormControl();

    constructor(private userService: UserService, private router: Router
        , private route: ActivatedRoute,
        private snackBar:MatSnackBar) { }

    ngOnInit() {
        this.userForm = new FormGroup({
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname, email: this.email
        });

        this.userService.find(this.route.snapshot.params['id']).subscribe(
            user => {
                console.log(user);
                
                this.initUserForm(user);
            }
        );

     }

     initUserForm(user :IUser){
         this.username.setValue(user.username);
         this.username.disable();
        this.firstname.setValue(user.firstname);
        this.lastname.setValue(user.lastname);
        this.email.setValue(user.email);
     }

     editUser(formValues){
        let newUser: IUser;
        newUser = {
            id: this.route.snapshot.params['id'],
            username : formValues.username,
            firstname: formValues.firstname,
            lastname: formValues.lastname,
            email: formValues.email,
        }

        this.userService.edit(newUser).subscribe((val) => {
            this.router.navigate(['/users']);
            this.snackBar.open("success", null, {duration: 2000});
        },
            (err) => {
            },
            () => {

            });
    }

    cancel(){
        this.router.navigate(['/users']);
    }
}