import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "app/services/authentication.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  previleges: any[] = [];

  hasAccessClients = false;
  hasAccessFournisseurs = false;
  hasAccessCommandes = false;

  constructor(
    private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    // Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    // Add 'implements OnInit' to the class.
    this.authenticationService.observedPrevileges.subscribe((val) => {
      this.previleges = val;
      this.fillPrevileges();
    });
    this.authenticationService.getPrevileges();
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/home"]);
  }

  isHomePage(): boolean {
    return this.router.url === "/" || this.router.url === "/home";
  }

  hasPrevilege(previlege: String): boolean {
    if (this.previleges.length === 0) {
      return false;
    }
    let previleges = [];
    previleges = this.previleges.filter((val) => {
      return val.authority === previlege;
    });
    return previleges.length === 1;
  }

  fillPrevileges() {
    this.hasAccessClients = this.hasPrevilege("clients");
    this.hasAccessFournisseurs = this.hasPrevilege("fournisseurs");
    this.hasAccessCommandes = this.hasPrevilege("commandes");
  }

  goToChangePassword() {
    this.router.navigate(["/changePassword"]);
  }
}
