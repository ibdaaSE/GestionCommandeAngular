import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IUser } from 'app/shared/models';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'user-info',
    templateUrl: './userInfo.component.html',
    styleUrls: ['./userInfo.component.css']
})
export class UserInfoComponent implements OnInit {
    @Input() user : IUser;
    @Output() deleteEvent = new EventEmitter;
    
    constructor(private userService :UserService,private router:Router) { }

    ngOnInit() { }

    deleteUser() {
        this.userService.delete(this.user.id).catch(this.handleError).
            subscribe((val) => {
            },
            (err) => {
                this.deleteEvent.emit("failed");
            },
            () => {
                this.deleteEvent.emit("success");
            });
    }

    editUser(){
        this.router.navigate(["/users/edit",this.user.id]);
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText);
    }
}