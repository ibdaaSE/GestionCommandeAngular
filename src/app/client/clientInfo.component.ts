import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ClientService } from "app/services/client.service";
import { IClient } from "app/shared/models";
import { Observable } from "rxjs/Observable";
import { Router } from "@angular/router";

@Component({
    selector: "client-info",
    templateUrl: "./clientInfo.component.html",
    styleUrls: ["./clientInfo.component.css"]
})
export class ClientInfoComponent implements OnInit {
    @Input() client: IClient;
    @Output() deleteEvent = new EventEmitter;

    constructor(private clientService: ClientService, private router: Router) { }

    ngOnInit() { }

    deleteClient() {
        this.clientService.delete(this.client.id).catch(this.handleError).
            subscribe((val) => {
            },
            (err) => {
                this.deleteEvent.emit("Impossible de supprimer ce client");
            },
            () => {
                this.deleteEvent.emit("Client supprimé");
            });
    }

    editClient() {
        this.router.navigate(["/clients/edit", this.client.id]);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
