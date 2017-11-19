import { Component, OnInit } from '@angular/core';
import { ICommande } from 'app/shared/models';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { CommandeService } from 'app/services/commande.service';

@Component({
    selector: 'commande-list',
    templateUrl: './commandeList.component.html',
    styleUrls: ['./commandeList.component.css']
})
export class CommandeListComponent implements OnInit {

    filter: String;
    pageIndex: number;
    pageLength: number;

    count: number;
    filtredList: ICommande[];
    selected: ICommande;

    constructor(private commandeService: CommandeService, private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.filter = "";
        this.pageIndex = 0;
        this.pageLength = 20;
        this.count = 0;
        this.getFiltredList();
        this.updatecount();
    }

    getFiltredList() {
        let observable = this.commandeService.getFiltredList(this.filter, this.pageIndex);
        observable.subscribe(clients => {
            this.filtredList = clients;
        });
    }

    setFilter(filter: String) {
        this.filter = filter;
        this.pageIndex = 0;
        this.getFiltredList();
        this.updatecount();
    }

    getNextPage() {
        if (!this.hasNextPage()) return;
        this.pageIndex = (this.pageIndex + this.pageLength);
        this.getFiltredList();
    }

    getPreviousPage() {
        if (!this.hasPreviousPage()) return;
        this.pageIndex = (this.pageIndex - this.pageLength);
        this.getFiltredList();
    }

    hasNextPage() {
        return (this.count >= (this.pageIndex + this.pageLength))
    }

    hasPreviousPage() {
        return (this.pageIndex > 0)
    }

    updatecount() {
        let observable = this.commandeService.count(this.filter);
        observable.subscribe(count => {
            this.count = +count;
        });
    }

    deleted(message: string) {
        this.getFiltredList();
        this.snackBar.open(message, null, { duration: 2000 });
    }

    goToCreate() {
        this.router.navigate(['/commandes/create']);
    }
}