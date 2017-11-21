
import { Component, OnInit } from '@angular/core';
import { IUser } from 'app/shared/models';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { stringify } from 'querystring';

@Component({
    selector: 'user-list',
    templateUrl: './userList.component.html',
    styleUrls: ['./userList.component.css']
})
export class UserListComponent implements OnInit {

    users: IUser[];
    selectedUser: IUser;

    constructor(private userService: UserService, private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.getUsers();
     }

    getUsers() {
        let observable = this.userService.getUsers();
        observable.subscribe(users => {
            this.users = users._embedded.users;
        });
    }


    deletedUsers(message : string){
        this.getUsers();
        this.snackBar.open(message, null, {duration: 2000});
    }
   
}