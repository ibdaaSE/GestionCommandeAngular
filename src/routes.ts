import { Routes } from '@angular/router';
import { ClientListComponent } from 'app/client/clientList.component';
import { EditClientComponent } from 'app/client/editClient.component';
import { CreateClientComponent } from 'app/client/createClient.component';


export const appRoutes: Routes = [
    { path: 'clients/create', component: CreateClientComponent },
    { path: 'clients/edit/:id', component: EditClientComponent },
    { path: 'clients', component: ClientListComponent },
    { path: '', redirectTo: '/clients', pathMatch: 'full' }


]