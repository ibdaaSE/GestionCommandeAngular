import { Component, OnInit } from '@angular/core';
import { ClientService } from 'app/services/client.service';
import { IClient } from 'app/shared/models';
import { MatSnackBar } from '@angular/material';

@Component({
    selector: 'client-list',
    templateUrl: './clientList.component.html',
    styleUrls: ['./clientList.component.css']
})
export class ClientListComponent implements OnInit {

    filter: String;
    pageIndex: number;
    pageLength: number;

    clientCount: number;
    clients: IClient[];
    selectedClient: IClient;

    constructor(private clientService: ClientService, private snackBar : MatSnackBar ) { }

    ngOnInit() {
        this.filter = "";
        this.pageIndex = 0;
        this.pageLength = 20;
        this.clientCount = 0;
        this.getClients();
    }

    getClients() {
        let observable = this.clientService.getClients(this.filter, this.pageIndex);
        observable.subscribe(clients => {
            this.clients = clients;
        });
    }

    setFilter(filter : String){
        this.filter = filter;
        this.getClients();
    }

    deletedClients(message : string){
        this.getClients();
        this.snackBar.open(message, null, {duration: 2000});
    }
}