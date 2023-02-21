import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ClienteModalComponent} from "../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController} from "@ionic/angular";
import {ClientiService} from "../../shared/service/clienti.service";
import {Antifurto, Cliente} from "../../shared/model/cliente.interface";
import {Subscription} from "rxjs";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, OnDestroy{
  //@ts-ignore
  antifurti: Antifurto[] = [];
  index: any;
  modal: any;
  //@ts-ignore
  subscription: Subscription;

  constructor(private route: ActivatedRoute,
              private modalCtrl: ModalController,
              private clienteService: ClientiService)
  {
    //this.antifurti = [];
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
        this.index = params['index'];
        this.clienteService.print();
        console.log(`Dashboard: index ${this.index}`)
        this.clienteService.setActivedCliente(this.index);
        console.log(`Dashboard: cliente ${this.clienteService.getActivedCliente()}`)
        // this.antifurti = this.clienteService.getActivedCliente()?.antifurti
        if(this.antifurti === undefined){
          console.log(`Dashboard: antifurti undefined`)
          // this.antifurti = this.clienteService.getActivedCliente()?.antifurti
        }
      }
    );
    this.subscription = this.clienteService.clientiChanged.subscribe((clienti:Cliente[])=>{
      for(const cliente of clienti){
        for(const antif of cliente.antifurti){
          this.antifurti.push(antif);
        }
      }
      console.log(` in subsription ${this.antifurti}`)
    })
  }

  async manageAntifurto() {
    this.modal = await this.modalCtrl.create({
      component: ClienteModalComponent,
      backdropDismiss: false,
      swipeToClose: false,
      componentProps: {
        "titolo": "Aggiungi Account",
        "tipo": "addAntif"
      }
    });
    this.modal.present();

    const {role} = await this.modal.onWillDismiss();
    if (role === 'confirm') {
      this.antifurti = this.clienteService.getActivedCliente().antifurti;
      // const textForSave = JSON.stringify(this.clienteService.getActivedCliente());
      // await this.fileManager.writeFileOnDevice(textForSave, nominativo);
     //console.log(this.antifurti);
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
