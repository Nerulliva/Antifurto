import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from "@angular/common/http";

import {ThemeService} from "../theme/theme.service";

// import {ClientiService} from "../shared/service/clienti.service";
// import {FileManagerService} from "../shared/service/file-manager.service";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ThemeService,

   /* ClientiService,
    FileManagerService*/

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
