import { Routes } from '@angular/router';
import { ClientListComponent } from 'app/client/clientList.component';
import { EditClientComponent } from 'app/client/editClient.component';
import { CreateClientComponent } from 'app/client/createClient.component';
import { FournisseurListComponent } from 'app/fournisseur/fournisseurList.component';
import { CreateFournisseurComponent } from 'app/fournisseur/createFournisseur.component';
import { EditFournisseurComponent } from 'app/fournisseur/editFournisseur.component';
import { CreateCommandeComponent } from 'app/commande/createCommande.component';
import { CommandeListComponent } from 'app/commande/commandeList.component';
import { HomeComponent } from 'app/user/home.component';
import { CanActivateAuthGuard } from 'app/services/canActivateAuthGuard.service';
import { UserListComponent } from 'app/user/userList.component';


export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'clients/create', component: CreateClientComponent, canActivate: [CanActivateAuthGuard]},
    { path: 'clients/edit/:id', component: EditClientComponent, canActivate: [CanActivateAuthGuard]},
    { path: 'clients', component: ClientListComponent, canActivate: [CanActivateAuthGuard]},
    { path: 'fournisseurs/create', component: CreateFournisseurComponent, canActivate: [CanActivateAuthGuard]},
    { path: 'fournisseurs/edit/:id', component: EditFournisseurComponent, canActivate: [CanActivateAuthGuard]},
    { path: 'fournisseurs', component: FournisseurListComponent, canActivate: [CanActivateAuthGuard]},
    { path: 'commandes/create', component: CreateCommandeComponent, canActivate: [CanActivateAuthGuard]},
    { path: 'commandes', component: CommandeListComponent, canActivate: [CanActivateAuthGuard]},
    { path: 'users', component: UserListComponent, canActivate: [CanActivateAuthGuard]},    
    { path: '', redirectTo: '/home', pathMatch: 'full'}
]