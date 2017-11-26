import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatTooltipModule, MatIconModule, MatSnackBarModule, MatInputModule, MatListModule, MatCardModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';

import { RouterModule } from "@angular/router";
import { appRoutes } from "routes";
import { AppComponent } from './app.component';
import { ClientListComponent } from 'app/client/clientList.component';
import { ClientInfoComponent } from 'app/client/clientInfo.component';
import { ClientService } from 'app/services/client.service';
import { EditClientComponent } from 'app/client/editClient.component';
import { CreateClientComponent } from 'app/client/createClient.component';
import { FournisseurInfoComponent } from 'app/fournisseur/fournisseurInfo.component';
import { FournisseurListComponent } from 'app/fournisseur/fournisseurList.component';
import { FournisseurService } from 'app/services/fournisseur.service';
import { CreateFournisseurComponent } from 'app/fournisseur/createFournisseur.component';
import { EditFournisseurComponent } from 'app/fournisseur/editFournisseur.component';
import { CreateCommandeComponent } from 'app/commande/createCommande.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CreateProduitComponent } from 'app/commande/createProduit.component';
import { ProduitInfoComponent } from 'app/commande/produitInfo.component';
import { CommandeListComponent } from 'app/commande/commandeList.component';
import { CommandeService } from 'app/services/commande.service';
import { CommandeInfoComponent } from 'app/commande/commandeInfo.component';
import { HomeComponent } from 'app/user/home.component';
import { AuthenticationService } from 'app/services/authentication.service';
import { CanActivateAuthGuard } from 'app/services/canActivateAuthGuard.service';
import { UserListComponent } from 'app/user/userList.component';
import { UserService } from 'app/services/user.service';
import { UserInfoComponent } from 'app/user/userInfo.component';
import { CreateUserComponent } from 'app/user/createUser.component';
import { EditUserComponent } from 'app/user/editUser.component';
import { ChangePasswordComponent } from 'app/user/changePassword.component';
import { EditCommandeComponent } from 'app/commande/editCommande.component';
import { ConfirmationDialogComponent } from 'app/shared/confirmationDialog.component';

@NgModule({
  declarations: [
    AppComponent, ConfirmationDialogComponent,
    ClientListComponent,ClientInfoComponent,EditClientComponent,CreateClientComponent,
    FournisseurListComponent,FournisseurInfoComponent,EditFournisseurComponent,CreateFournisseurComponent,
    CommandeListComponent, CommandeInfoComponent, CreateCommandeComponent, CreateProduitComponent,EditCommandeComponent, 
    UserListComponent,UserInfoComponent,CreateUserComponent,EditUserComponent,
    ChangePasswordComponent,
    ProduitInfoComponent, HomeComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule, MatTooltipModule, MatInputModule, MatIconModule, MatSnackBarModule, MatListModule, MatProgressSpinnerModule,
    MatCardModule, MatMenuModule, MatAutocompleteModule, MatDatepickerModule, MatNativeDateModule, MatDialogModule
  ],
  providers: [AuthenticationService, CanActivateAuthGuard, ClientService,FournisseurService,
              CommandeService,UserService],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialogComponent]
})
export class AppModule { }
