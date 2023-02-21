import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import {SharedModule} from "../../shared/shared.module";
// component
import {ListaClientiComponents} from "./lista-clienti/lista-clienti.components";
import { ListaAntifurtiComponent } from "./lista-antifurti/lista-antifurti.component";

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
    ListaClientiComponents,
    ListaAntifurtiComponent
  ],
  providers: []
})
export class HomePageModule {}
