import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { ICommande } from "app/shared/models";
import { CommandeService } from "app/services/commande.service";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";

@Component({
    selector: "commande-info",
    templateUrl: "./commandeInfo.component.html",
    styleUrls: ["./commandeInfo.component.css"]
})
export class CommandeInfoComponent implements OnInit {

    @Input() commande: ICommande;
    @Output() deleteEvent = new EventEmitter();

    constructor(private commandeService: CommandeService, private router: Router) { }

    ngOnInit() { }

    delete() {
        this.commandeService.delete(this.commande.id).catch(this.handleError).
            subscribe((val) => {
            },
            (err) => {
                this.deleteEvent.emit("Impossible de supprimer cette commande");
            },
            () => {
                this.deleteEvent.emit("Commande supprimée");
            });
    }

    edit() {
        this.router.navigate(["/commandes/edit", this.commande.id]);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}
