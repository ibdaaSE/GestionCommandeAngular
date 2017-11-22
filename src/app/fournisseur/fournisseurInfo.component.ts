import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFournisseur } from 'app/shared/models';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { FournisseurService } from 'app/services/fournisseur.service';

@Component({
    selector: 'fournisseur-info',
    templateUrl: './fournisseurInfo.component.html',
    styleUrls: ['./fournisseurInfo.component.css']
})
export class FournisseurInfoComponent implements OnInit {
    @Input() fournisseur: IFournisseur;
    @Output() deleteEvent = new EventEmitter;

    constructor(private fournisseurService: FournisseurService,private router:Router) { }

    ngOnInit() { }

    deleteFournisseur() {
        this.fournisseurService.delete(this.fournisseur.id).catch(this.handleError).
            subscribe((val) => {
            },
            (err) => {
                this.deleteEvent.emit("failed");
            },
            () => {
                this.deleteEvent.emit("success");
            });
    }

    editFournisseur(){
        this.router.navigate(["/fournisseurs/edit",this.fournisseur.id]);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }

}