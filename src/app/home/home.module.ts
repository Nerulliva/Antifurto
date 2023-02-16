import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import {SharedModule} from "../../shared/shared.module";

// component
import {ListaClientiComponents} from "./lista-clienti/lista-clienti.components";
import {FileManagerService} from "../../shared/service/file-manager.service";
import { File } from '@awesome-cordova-plugins/file/ngx';
import { Diagnostic  } from '@awesome-cordova-plugins/diagnostic/ngx';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [
    HomePage,
    ListaClientiComponents
  ],
  providers: [
    FileManagerService,
    File,
    Diagnostic
  ]
})
export class HomePageModule {}
