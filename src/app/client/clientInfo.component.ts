import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'client-info',
    templateUrl: './clientInfo.component.html',
    styleUrls: ['./clientInfo.component.css']
})
export class ClientInfoComponent implements OnInit {
    @Input() client : any;
    
    constructor() { }

    ngOnInit() { }

    
}