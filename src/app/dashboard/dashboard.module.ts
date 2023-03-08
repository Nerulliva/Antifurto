import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {DashboardPage} from "./dashboard.page";
import {File} from "@awesome-cordova-plugins/file/ngx";
import { ListaComandiComponent } from "./lista-comandi/lista-comandi.component";
import { MenuComponent} from "./menu/menu.component";
import { ListaIngressiComponent} from "./lista-ingressi/lista-ingressi.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRoutingModule,
    SharedModule,
    ScrollingModule
  ],
  declarations: [
    DashboardPage,
    ListaComandiComponent,
    MenuComponent,
    ListaIngressiComponent
  ],
  providers: [
    File
  ]
})
export class DashboardModule{}
