
import { Component, OnInit } from "@angular/core";
import { IUser } from "app/shared/models";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { UserService } from "app/services/user.service";
import { stringify } from "querystring";

@Component({
    selector: "user-list",
    templateUrl: "./userList.component.html",
    styleUrls: ["./userList.component.css"]
})
export class UserListComponent implements OnInit {

    filteredList: IUser[];
    selected: IUser;

    constructor(private userService: UserService, private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.getFilteredList();
    }

    getFilteredList() {
        const observable = this.userService.getFilteredList();
        observable.subscribe(newList => {
            this.filteredList = newList._embedded.users;
        });
    }


    refresh(message: string) {
        this.getFilteredList();
        this.snackBar.open(message, null, { duration: 2000 });
    }

    goToCreate() {
        this.router.navigate(["/users/create"]);
    }

}
