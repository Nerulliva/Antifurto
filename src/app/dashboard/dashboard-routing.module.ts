import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DashboardPage} from "./dashboard.page";
import {ListaIngressiComponent} from "./lista-ingressi/lista-ingressi.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardPage,
  },
  {
    path: 'dashboard/:index',
    redirectTo: '',
  },
  {
    path: 'lista-ingressi/:id',
    component: ListaIngressiComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule{}
