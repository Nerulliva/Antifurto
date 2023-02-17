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
  //@ts-ignore
  @Input() antifurtiCliente: Antifurto[];
  isEmpty: boolean = true;
  modal: any;
  oldAntifurti: Antifurto[] =[];

  constructor(public modalCtrl: ModalController) {

  }

  ngOnInit(): void {
    this.isEmpty = this.antifurtiCliente.length === 0 ? true : false
    // console.log(`clienti size in lista antifu ${this.clientiService.getClienti().length}`);
  }

  ngDoCheck(): void {
    if(this.oldAntifurti.length != this.antifurtiCliente?.length){
      console.log('cambiato');
      this.oldAntifurti = Object.assign(this.antifurtiCliente);
      this.isEmpty = this.antifurtiCliente.length === 0 ? true : false
    }
  }

}
