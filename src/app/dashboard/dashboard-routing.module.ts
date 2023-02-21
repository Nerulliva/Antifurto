import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardPage} from "./dashboard.page";
import {ListaAntifurtiResolverService} from "../home/lista-antifurti/lista-antifurti-resolver.service";

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
    resolve: [ListaAntifurtiResolverService]
  },
  {
    path: 'dashboard/:index',
    redirectTo: '',
    resolve: [ListaAntifurtiResolverService]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}
