import {Component, Input, OnInit} from "@angular/core";
import {Antifurto} from "../../../shared/model/cliente.interface";
import {ClienteModalComponent} from "../../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController, ToastController} from "@ionic/angular";
import {ClientiService} from "../../../shared/service/clienti.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ConfirmModalComponent} from "../../../shared/components/confirm-modal/confirm-modal.component";


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
  modalDemo: any;
  intervalId: any;

  constructor(public modalCtrl: ModalController,
              private clientiService: ClientiService,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastController) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.index = params['id'];
      console.log(`index ${this.index}`)
      this.antifurtiCliente = this.clientiService.getCliente(this.index).antifurti;
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
      let obj = JSON.stringify(this.clientiService.getCliente(0));
      console.log(`Lista-antifurti: obj in dismiss ${obj}`)
      console.log(`Lista-antifurti: index ${this.index}`)
    }
  }

  goTo(index: number){
    this.router.navigateByUrl(`dashboard/${this.index}-${index}`);
  }

  onOverlay() {
    this.modalDemo = true;
    const self = this;
    this.intervalId =  setInterval(function() {
      self.swipeItem();
    }, 1000);
  }

  offOverlay() {
    clearInterval(this.intervalId);
    this.modalDemo = false;
  }

  swipeItem(){
    const cliente = document.getElementById("overlayItem") as HTMLIonItemSlidingElement;
    cliente.open('start');
    cliente.close();
  }

  async presentToast(message: string,position: 'top' | 'middle' | 'bottom'){
    const toast = await this.toast.create({
      duration: 2000,
      position: position,
      message: message,
      cssClass: 'custom-toast'
    })
    await toast.present();
  }

  async elimina(index: number){
    let nominativo = this.antifurtiCliente[index].nome;
    let info =`Attenzione, si sta per eliminare l'antifurto ${nominativo}. Sei sicuro?`

    this.modal = await this.modalCtrl.create({
      component: ConfirmModalComponent,
      backdropDismiss: false,
      swipeToClose: false,
      componentProps:{
        'titolo': 'Elimina Account',
        'info': info
      }
    })

    this.modal.present();

    const {role} = await this.modal.onWillDismiss();
    if(role ==='conferma'){
      this.antifurtiCliente.splice(index, 1);
      this.clientiService.deleteAntifurto(index);
      await this.presentToast(`Antifurto ${nominativo} eliminato`, 'bottom');
    }
  }

}
