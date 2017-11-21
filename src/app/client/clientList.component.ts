import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/services/client.service';
import { IClient } from 'app/shared/models';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'client-list',
    templateUrl: './clientList.component.html',
    styleUrls: ['./clientList.component.css']
})
export class ClientListComponent implements OnInit {

    filter: String;
    pageIndex: number;
    pageLength: number;
    count: number;

    nextPageEnabled = true;
    previousPageEnabled = true;

    filtredList: IClient[];
    selected: IClient;

    constructor(private service: ClientService, private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.filter = "";
        this.pageIndex = 0;
        this.pageLength = 20;
        this.count = 0;
        this.updatecount();
        this.getFiltredList();
    }

    getFiltredList() {
        let observable = this.service.getClients(this.filter, this.pageIndex);
        observable.subscribe(newList => {
            this.filtredList = newList;
            this.fillPositionPage();
        });
    }

    setFilter(filter: String) {
        this.filter = filter;
        this.pageIndex = 0;
        this.updatecount();
        this.getFiltredList();
    }

    getNextPage() {
        if (!this.hasNextPage()) return;
        this.pageIndex = (this.pageIndex + this.pageLength);
        this.getFiltredList();
    }

    getLastPage() {
        if (!this.hasNextPage()) return;
        this.pageIndex = this.count - this.pageLength;
        this.getFiltredList();
    }

    getPreviousPage() {
        if (!this.hasPreviousPage()) return;
        this.pageIndex = (this.pageIndex - this.pageLength) < 0? 0 : this.pageIndex - this.pageLength;
        this.getFiltredList();
    }

    getFirstPage() {
        if (!this.hasPreviousPage()) return;
        this.pageIndex = 0;
        this.getFiltredList();
    }

    hasNextPage() {
        return (this.count > (this.pageIndex + this.pageLength))
    }

    hasPreviousPage() {
        return (this.pageIndex > 0)
    }

    fillPositionPage(){
        this.nextPageEnabled = this.hasNextPage();
        this.previousPageEnabled = this.hasPreviousPage();
    }

    updatecount() {
        let observable = this.service.count(this.filter);
        observable.subscribe(count => {
            this.count = +count;
        });
    }

    deletedClients(message: string) {
        this.getFiltredList();
        this.snackBar.open(message, null, { duration: 2000 });
    }

    goToCreate() {
        this.router.navigate(['/clients/create']);
    }
}