import { Component, OnInit } from "@angular/core";
import { ICommande } from "app/shared/models";
import { MatSnackBar } from "@angular/material";
import { Router } from "@angular/router";
import { CommandeService } from "app/services/commande.service";

@Component({
    selector: "commande-list",
    templateUrl: "./commandeList.component.html",
    styleUrls: ["./commandeList.component.css"]
})
export class CommandeListComponent implements OnInit {

    filter: String;
    pageIndex: number;
    pageLength: number;
    count: number;

    nextPageEnabled = true;
    previousPageEnabled = true;

    filteredList: ICommande[];
    selected: ICommande;

    constructor(private service: CommandeService, private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.filter = "";
        this.pageIndex = 0;
        this.pageLength = 20;
        this.count = 0;
        this.updatecount();
        this.getFilteredList();
    }

    getFilteredList() {
        const observable = this.service.getFilteredList(this.filter, this.pageIndex);
        observable.subscribe(newList => {
            this.filteredList = newList;
            this.fillPositionPage();
        });
    }

    setFilter(filter: String) {
        this.filter = filter;
        this.pageIndex = 0;
        this.updatecount();
        this.getFilteredList();
    }

    getNextPage() {
        if (!this.hasNextPage()) return;
        this.pageIndex = (this.pageIndex + this.pageLength);
        this.getFilteredList();
    }

    getLastPage() {
        if (!this.hasNextPage()) return;
        this.pageIndex = this.count - this.pageLength;
        this.getFilteredList();
    }

    getPreviousPage() {
        if (!this.hasPreviousPage()) return;
        this.pageIndex = (this.pageIndex - this.pageLength) < 0 ? 0 : this.pageIndex - this.pageLength;
        this.getFilteredList();
    }

    getFirstPage() {
        if (!this.hasPreviousPage()) return;
        this.pageIndex = 0;
        this.getFilteredList();
    }

    hasNextPage() {
        return (this.count > (this.pageIndex + this.pageLength));
    }

    hasPreviousPage() {
        return (this.pageIndex > 0);
    }

    fillPositionPage() {
        this.nextPageEnabled = this.hasNextPage();
        this.previousPageEnabled = this.hasPreviousPage();
    }

    updatecount() {
        const observable = this.service.count(this.filter);
        observable.subscribe(count => {
            this.count = +count;
        });
    }

    deleted(message: string) {
        this.getFilteredList();
        this.snackBar.open(message, null, { duration: 2000 });
    }

    goToCreate() {
        this.router.navigate(["/commandes/create"]);
    }
}
