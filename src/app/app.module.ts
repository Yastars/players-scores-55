import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardViewComponent } from './components/dashboard-view/dashboard-view.component';
import { GoogleChartsModule } from 'angular-google-charts';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatIconModule} from '@angular/material/icon'; 
import {MatDividerModule} from '@angular/material/divider'; 
import {LayoutModule} from '@angular/cdk/layout'; 
import { HttpClientModule } from '@angular/common/http';
import { PlayersScoresResolver } from './resolvers/players-scores.resolver';
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardViewComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    GoogleChartsModule,
    HttpClientModule,
    ReactiveFormsModule,

    // Mat Angular
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    LayoutModule,
    MatCheckboxModule
  ],
  providers: [PlayersScoresResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
