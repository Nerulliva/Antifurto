import {Component, Input, OnInit} from "@angular/core";
import {Antifurto} from "../../../shared/model/cliente.interface";
import {ClienteModalComponent} from "../../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController} from "@ionic/angular";
import {ClientiService} from "../../../shared/service/clienti.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'lista-antifurti',
  templateUrl: './lista-antifurti.component.html',
  styleUrls: ['./lista-antifurti.component.scss']
})
export class ListaAntifurtiComponent implements OnInit {
  //@ts-ignore
  antifurtiCliente: Antifurto[] = [];
  isEmpty: boolean = true;
  modal: any;
  oldAntifurti: Antifurto[] =[];
  //@ts-ignore
  index: number; // index cliente attivo

  constructor(public modalCtrl: ModalController,
              private clientiService: ClientiService,
              private route: ActivatedRoute,
              private router: Router) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.index = params['id'];
      console.log(`index ${this.index}`)
      this.antifurtiCliente = this.clientiService.getCliente(this.index).antifurti;
    /*  console.log(`Lista-antifurti: cliService cliIndexAttivo ${this.clientiService.getCliente(0).toString()}`);
      let obj = JSON.stringify(this.clientiService.getCliente(0));
      console.log(`Lista-antifurti: obj ${obj}`)*/
      // console.log(`lista-antifurti cliService cliAttivo ${this.clientiService.getActivedCliente().nome}`);
    })
  }

  ngDoCheck(): void {
   /* if(this.oldAntifurti.length != this.antifurtiCliente?.length){
      console.log('cambiato');
      this.oldAntifurti = Object.assign(this.antifurtiCliente);
      this.isEmpty = this.antifurtiCliente.length === 0 ? true : false
    }*/
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
      let obj = JSON.stringify(this.clientiService.getCliente(0));
      console.log(`Lista-antifurti: obj in dismiss ${obj}`)
      console.log(`Lista-antifurti: index ${this.index}`)
    }
  }

  goTo(index: number){
    this.router.navigateByUrl(`dashboard/${this.index}-${index}`);
  }

}
