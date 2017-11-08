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
    clients: IClient[];
    selectedClient: IClient;

    constructor(private clientService: ClientService, private snackBar: MatSnackBar,
        private router: Router) { }

    ngOnInit() {
        this.filter = "";
        this.pageIndex = 0;
        this.pageLength = 20;
        this.count = 0;
        this.getClients();
        this.updatecount();
    }

    getClients() {
        let observable = this.clientService.getClients(this.filter, this.pageIndex);
        observable.subscribe(clients => {
            this.clients = clients;
        });
    }

    setFilter(filter: String) {
        this.filter = filter;
        this.getClients();
        this.updatecount();
    }

    getNextPage() {
        if (!this.hasNextPage()) return;
        this.pageIndex = (this.pageIndex + this.pageLength);
        this.getClients();
    }

    getPreviousPage() {
        if (!this.hasPreviousPage()) return;
        this.pageIndex = (this.pageIndex - this.pageLength);
        this.getClients();
    }

    hasNextPage() {
        return (this.count >= (this.pageIndex + this.pageLength))
    }

    hasPreviousPage() {
        return (this.pageIndex > 0)
    }

    updatecount() {
        let observable = this.clientService.count(this.filter);
        observable.subscribe(count => {
            this.count = +count;
        });
    }

    deletedClients(message: string) {
        this.getClients();
        this.snackBar.open(message, null, { duration: 2000 });
    }

    goToCreate() {
        this.router.navigate(['/clients/create']);
    }
}