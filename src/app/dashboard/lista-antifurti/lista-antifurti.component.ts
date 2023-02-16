import {Component, Input, OnInit} from "@angular/core";
import {Antifurto} from "../../../shared/model/cliente.interface";
import {ClienteModalComponent} from "../../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController} from "@ionic/angular";
import {ClientiService} from "../../../shared/service/clienti.service";

@Component({
  selector: 'lista-antifurti',
  templateUrl: './lista-antifurti.component.html',
  styleUrls: ['./lista-antifurti.component.scss']
})
export class ListaAntifurtiComponent implements OnInit {

  @Input() antifurtiCliente: Antifurto[] = [];
  isEmpty: boolean = true;
  modal: any;
  oldAntifurti: Antifurto[] =[];

  constructor(public modalCtrl: ModalController,
              private clientiService: ClientiService) {
  }

  ngOnInit(): void {
    this.isEmpty = this.antifurtiCliente.length === 0 ? true : false
  }

  ngDoCheck(): void {
    if(this.oldAntifurti.length != this.antifurtiCliente.length){
      console.log('cambiato');
      this.oldAntifurti = Object.assign(this.antifurtiCliente);
      this.isEmpty = this.antifurtiCliente.length === 0 ? true : false
    }
  }

  /*async manageAntifurto() {
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

    const {data, role} = await this.modal.onWillDismiss();
    if (role === 'confirm') {
      // this.clientiService.getActivedCliente().antifurti.push();
      this.antifurtiCliente = this.clientiService.getActivedCliente().antifurti;
      console.log(this.antifurtiCliente);
    }
  }*/
}
