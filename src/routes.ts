import { Routes } from '@angular/router';
import { ClientListComponent } from 'app/client/clientList.component';


export const appRoutes: Routes = [
    { path: 'clients', component: ClientListComponent },
    { path: '', redirectTo: '/clients', pathMatch: 'full' }

]