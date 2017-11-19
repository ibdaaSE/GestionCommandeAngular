import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { IFournisseur } from 'app/shared/models';
import { FournisseurService } from 'app/services/fournisseur.service';

@Component({
    selector: 'fournisseur-list',
    templateUrl: './fournisseurList.component.html',
    styleUrls: ['./fournisseurList.component.css']
})
export class FournisseurListComponent implements OnInit {

    filter: String;
    pageIndex: number;
    pageLength: number;

    count: number;
    fournisseurs: IFournisseur[];
    selectedFournisseur: IFournisseur;

    constructor(private fournisseurService: FournisseurService, private snackBar : MatSnackBar ,
    private router:Router) { }

    ngOnInit() {
        this.filter = "";
        this.pageIndex = 0;
        this.pageLength = 20;
        this.count = 0;
        this.getFournisseurs();
        this.updatecount();
    }

    getFournisseurs() {
        let observable = this.fournisseurService.getFournisseurs(this.filter, this.pageIndex);
        observable.subscribe(fournisseurs => {
            this.fournisseurs = fournisseurs;
        });
    }

    setFilter(filter : String){
        this.filter = filter;
        this.pageIndex = 0;
        this.getFournisseurs();
        this.updatecount();
    }

    getNextPage() {
        if (!this.hasNextPage()) return;
        this.pageIndex = (this.pageIndex + this.pageLength);
        this.getFournisseurs();
    }

    getPreviousPage() {
        if (!this.hasPreviousPage()) return;
        this.pageIndex = (this.pageIndex - this.pageLength);
        this.getFournisseurs();
    }

    hasNextPage() {
        return (this.count >= (this.pageIndex + this.pageLength))
    }

    hasPreviousPage() {
        return (this.pageIndex > 0)
    }

    updatecount() {
        let observable = this.fournisseurService.count(this.filter);
        observable.subscribe(count => {
            this.count = +count;
        });
    }

    deletedFournisseurs(message : string){
        this.getFournisseurs();
        this.snackBar.open(message, null, {duration: 2000});
    }

    goToCreate(){
        this.router.navigate(['/fournisseurs/create']);
    }
}