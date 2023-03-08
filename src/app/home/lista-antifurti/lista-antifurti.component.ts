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
  modalDemoSwipe: any;
  modalDemoSwipe2: any;
  intervalId: any;
  nomeCliente = '';

  constructor(public modalCtrl: ModalController,
              private clientiService: ClientiService,
              private route: ActivatedRoute,
              private router: Router,
              private toast: ToastController) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      this.index = params['id'];
      // console.log(`index ${this.index}`)
      this.antifurtiCliente = this.clientiService.getCliente(this.index).antifurti;
      this.nomeCliente = this.clientiService.getNominativo();
    })
  }

  async manageAntifurto( tipo?:string, index?: number, antifurto?: Antifurto) {

    let modalita = tipo ==='addAntif' ? 'addAntif' : 'modifyAnt'
    let titolo = tipo === 'addAntif' ? 'Aggiungi Antifurto' : 'Modifica Antifurto';
    let antifData = modalita === 'modifyAnt' ? antifurto : null;

    this.modal = await this.modalCtrl.create({
      component: ClienteModalComponent,
      backdropDismiss: false,
      swipeToClose: false,
      componentProps: {
        "titolo": titolo,
        "tipo": modalita,
        "index": index,
        "data": antifData
      }
    });
    this.modal.present();

    const {data,role} = await this.modal.onWillDismiss();
    if (role === 'confirm') {
      this.antifurtiCliente = this.clientiService.getAntifurticliente();
       modalita === 'addAntif' ?  await this.presentToast(`Antifurto ${data.nome} creato con successo`, 'bottom'):
        await this.presentToast(`Antifurto ${antifurto?.nome} modificato con successo`, 'bottom');
    }
  }

  goTo(index: number){
    this.router.navigateByUrl(`dashboard/${this.index}-${index}`);
  }

  onOverlay() {
    this.modalDemoSwipe = true;
    const self = this;
    this.intervalId =  setInterval(function() {
      self.swipeItem();
    }, 1000);
  }

  onOverlay2() {
    this.modalDemoSwipe = true;
    this.modalDemoSwipe2 = true;
    const self = this;
    this.intervalId = setInterval(function() {
      self.swipeItem2();
    }, 1000);
  }

  offOverlay() {
    clearInterval(this.intervalId);
    this.modalDemoSwipe = false;
    this.modalDemoSwipe2 = false;
  }

  swipeItem(){
    const cliente = document.getElementById("overlayItem") as HTMLIonItemSlidingElement;
    cliente.open('start');
    cliente.close();
  }

  swipeItem2(){
    const cliente = document.getElementById("overlayItem") as HTMLIonItemSlidingElement;
    cliente.open('end');
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
        'titolo': 'Elimina Antifurto',
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
