import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { IUser } from "app/shared/models";
import { Router } from "@angular/router";
import { UserService } from "app/services/user.service";
import { Observable } from "rxjs/Observable";
import { log } from "util";

@Component({
    selector: "user-info",
    templateUrl: "./userInfo.component.html",
    styleUrls: ["./userInfo.component.css"]
})
export class UserInfoComponent implements OnInit {
    @Input() user: IUser;
    @Output() refreshEvent = new EventEmitter;

    constructor(private userService: UserService, private router: Router) { }

    ngOnInit() { }

    deleteUser() {
        this.userService.delete(this.user.id).catch(this.handleError).
            subscribe((val) => {
            },
            (err) => {
                this.refreshEvent.emit("Impossible de supprimer cet utilisateur");
            },
            () => {
                this.refreshEvent.emit("Utilisateur supprimé");
            });
    }

    editUser() {
        this.router.navigate(["/users/edit", this.user.id]);
    }

    enableDisableUser() {
        let newUser: IUser;
        newUser = {
            id: this.user.id,
            username: this.user.username,
            enabled: !this.user.enabled
        };
        this.userService.edit(newUser).subscribe(
            (val) => {
                let etat: String;
                etat = val.enabled ? "activé" : "désactivé";
                this.refreshEvent.emit("L'utilisateur " + val.username + " " + etat);
            },
            (err) => {
                this.refreshEvent.emit("Impossible de désactiver cet utilisateur");
            },
            () => {

            }
        );

    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
