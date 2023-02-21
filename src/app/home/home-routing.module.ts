import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {ListaClientiComponents} from "./lista-clienti/lista-clienti.components";
import {ListaAntifurtiComponent} from "./lista-antifurti/lista-antifurti.component";


const routes: Routes = [
  {
    path: '',
    component: HomePage,
    /*children: [
      {path: 'clienti', component: ListaClientiComponents},
      {path: 'clienti/:id/antifurti', component: ListaAntifurtiComponent}
    ]*/
  },
  {path: 'clienti', component: ListaClientiComponents},
  {path: 'clienti/:id/antifurti', component: ListaAntifurtiComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
