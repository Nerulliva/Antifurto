import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {DashboardPage} from "./dashboard.page";
import {ListaAntifurtiComponent} from "./lista-antifurti/lista-antifurti.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardPage,
    ListaAntifurtiComponent
  ],
  providers: []
})
export class DashboardModule{}
