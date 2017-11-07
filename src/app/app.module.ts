import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule, MatTooltipModule, MatIconModule, MatSnackBarModule } from '@angular/material';

import { RouterModule } from "@angular/router";
import { appRoutes } from "routes";
import { AppComponent } from './app.component';
import { ClientListComponent } from 'app/client/clientList.component';
import { ClientInfoComponent } from 'app/client/clientInfo.component';
import { ClientService } from 'app/services/client.service';

@NgModule({
  declarations: [
    AppComponent, ClientListComponent,ClientInfoComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule, MatTooltipModule, MatIconModule,MatSnackBarModule
  ],
  providers: [ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
