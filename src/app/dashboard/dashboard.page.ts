import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ClienteModalComponent} from "../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController} from "@ionic/angular";
import {ClientiService} from "../../shared/service/clienti.service";
import {Antifurto} from "../../shared/model/cliente.interface";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit{

  antifurti: Antifurto[] = [];
  index: any;
  modal: any;

  constructor(private route: ActivatedRoute,
              private modalCtrl: ModalController,
              private clienteService: ClientiService) {
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
        this.index = params['index'];
        this.clienteService.setActivedCliente(this.index);
        this.antifurti = this.clienteService.getActivedCliente().antifurti;
        console.log(`nome ${this.clienteService.getActivedCliente().nome}`)
        // console.log(`index ${this.index}`)
      }
    );
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
    // this.modal.present();
    this.modal.present();

    const {data, role} = await this.modal.onWillDismiss();
    if (role === 'confirm') {
      this.clienteService.getActivedCliente().antifurti.push();
      this.antifurti = this.clienteService.getActivedCliente().antifurti;
     console.log(this.antifurti);
    }
  }
}
