import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private router: Router, private authenticationService: AuthenticationService) { 
    }

    ngOnInit() {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      console.log()
    }

    logout(){
      this.authenticationService.logout();
      this.router.navigate(['']);
    }

    isHomePage():boolean{
      return this.router.url == "/" || this.router.url == "/home";
    }
}
