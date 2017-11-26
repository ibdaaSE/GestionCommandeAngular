import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IProduit } from "app/shared/models";

@Component({
    selector: "produit-info",
    templateUrl: "./produitInfo.component.html",
    styleUrls: ["./produitInfo.component.css"]
})
export class ProduitInfoComponent implements OnInit {

    @Input() produit: IProduit;
    @Output() deleteEvent = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    deleteProduit() {
        this.deleteEvent.emit(this.produit);
    }
}
