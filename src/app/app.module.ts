import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatTooltipModule, MatIconModule, MatSnackBarModule, MatInputModule, MatListModule, MatCardModule, MatMenuModule } from '@angular/material';

import { RouterModule } from "@angular/router";
import { appRoutes } from "routes";
import { AppComponent } from './app.component';
import { ClientListComponent } from 'app/client/clientList.component';
import { ClientInfoComponent } from 'app/client/clientInfo.component';
import { ClientService } from 'app/services/client.service';
import { EditClientComponent } from 'app/client/editClient.component';
import { CreateClientComponent } from 'app/client/createClient.component';

@NgModule({
  declarations: [
    AppComponent, ClientListComponent,ClientInfoComponent,EditClientComponent,CreateClientComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule, MatTooltipModule, MatInputModule, MatIconModule, MatSnackBarModule, MatListModule, 
    MatCardModule, MatMenuModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
