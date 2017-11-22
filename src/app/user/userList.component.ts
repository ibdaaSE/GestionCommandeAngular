
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

    filtredList: IUser[];
    selected: IUser;

    constructor(private userService: UserService, private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.getFiltredList();
     }

     getFiltredList() {
        let observable = this.userService.getUsers();
        observable.subscribe(newList => {
            this.filtredList = newList._embedded.users;
        });
    }


    deleted(message : string){
        this.getFiltredList();
        this.snackBar.open(message, null, {duration: 2000});
    }
   
}