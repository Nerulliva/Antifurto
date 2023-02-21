import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {DashboardRoutingModule} from "./dashboard-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {DashboardPage} from "./dashboard.page";
import {ListaAntifurtiComponent} from "../home/lista-antifurti/lista-antifurti.component";
import {File} from "@awesome-cordova-plugins/file/ngx";
// import {ListaAntifurtiResolverService} from "../home/lista-antifurti/lista-antifurti-resolver.service";

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
    // ListaAntifurtiComponent
  ],
  providers: [
    File,
    // ListaAntifurtiResolverService
  ]
})
export class DashboardModule{}
