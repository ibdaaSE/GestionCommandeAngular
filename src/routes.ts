import { Routes } from '@angular/router';
import { ClientListComponent } from 'app/client/clientList.component';
import { EditClientComponent } from 'app/client/editClient.component';
import { CreateClientComponent } from 'app/client/createClient.component';
import { FournisseurListComponent } from 'app/fournisseur/fournisseurList.component';
import { CreateFournisseurComponent } from 'app/fournisseur/createFournisseur.component';
import { EditFournisseurComponent } from 'app/fournisseur/editFournisseur.component';


export const appRoutes: Routes = [
    { path: 'clients/create', component: CreateClientComponent },
    { path: 'clients/edit/:id', component: EditClientComponent },
    { path: 'clients', component: ClientListComponent },
    { path: 'fournisseurs/create', component: CreateFournisseurComponent },
    { path: 'fournisseurs/edit/:id', component: EditFournisseurComponent },
    { path: 'fournisseurs', component: FournisseurListComponent },
    { path: '', redirectTo: '/clients', pathMatch: 'full' }


]