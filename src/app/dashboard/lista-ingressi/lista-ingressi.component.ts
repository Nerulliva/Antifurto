import {Component, OnInit} from "@angular/core";
import {ClientiService} from "../../../shared/service/clienti.service";
import {Ingresso} from "../../../shared/model/cliente.interface";
import {ActivatedRoute, Params} from "@angular/router";
import {ModalController, ToastController} from "@ionic/angular";
import {ClienteModalComponent} from "../../../shared/components/cliente-modal/cliente-modal.component";
import {ConfirmModalComponent} from "../../../shared/components/confirm-modal/confirm-modal.component";

@Component({
  selector: 'lista-ingressi',
  templateUrl: './lista-ingressi.component.html',
  styleUrls: ['./lista-ingressi.component.scss']
})
export class ListaIngressiComponent implements OnInit{

  listaIngressi: Ingresso[] = [];
  modalDemoSwipe: any;
  modalDemoSwipe2: any;
  intervalId: any;
  //@ts-ignore
  indexAntifurto: number;
  modal: any;
  //@ts-ignore
  count: number; // numero ingresso da creare

  constructor(private clientiService: ClientiService,
              private route: ActivatedRoute,
              private modalCtrl: ModalController,
              private toast: ToastController){}

  ngOnInit(): void {
    this.count = this.listaIngressi.length + 1;
    this.route.params.subscribe((params: Params)=>{
      this.indexAntifurto = params['id'];
      console.log(`index antif ${this.indexAntifurto}`)
      console.log(`LISTA INGRESSI Cliente: ${JSON.stringify(this.clientiService.getActivedCliente())}`);
      this.listaIngressi = this.clientiService.getActivedCliente().antifurti[this.indexAntifurto]?.ingressi;

    })
  }

  async manageIngresso( tipo?: string, indexIng?: number, ingresso?: Ingresso) {
    let modalita = tipo ==='addIngresso' ? 'addIngresso' : 'modifyIng'
    let titolo = tipo === 'addIngresso' ? 'Aggiungi Ingresso' : 'Modifica Ingresso';
    let ingData = modalita === 'modifyIng' ? ingresso : null;

    this.modal = await this.modalCtrl.create({
      component: ClienteModalComponent,
      backdropDismiss: false,
      swipeToClose: false,
      componentProps: {
        "titolo": titolo,
        "tipo": modalita,
        "index": this.indexAntifurto,
        "count": this.count,
        "indexIng": indexIng,
        "data": ingData
      }
    });
    this.modal.present();

    const {data, role} = await this.modal.onWillDismiss();
    if (role === 'confirm') {
      this.listaIngressi = this.clientiService.getActivedCliente().antifurti[this.indexAntifurto].ingressi;
      this.count = this.listaIngressi.length+1;
      modalita === 'addIngresso' ? await this.presentToast(`Ingresso ${data.descrizione} aggiunto con successo`, 'bottom') :
      await this.presentToast(`Ingresso ${ingresso?.descrizione} modificato con successo`, 'bottom');
    }
  }

  async eliminaIng(indexIng: number){
    let nome = this.clientiService.getIngresso(this.indexAntifurto, indexIng).descrizione;
    let info = `Attenzione, si sta per eliminare l'ingresso ${nome}. Sei sicuro?`

    this.modal = await this.modalCtrl.create({
      component: ConfirmModalComponent,
      backdropDismiss: false,
      swipeToClose: false,
      componentProps:{
        'titolo': 'Elimina Ingresso',
        'info': info
      }
    })

    this.modal.present();
    const {role} = await this.modal.onWillDismiss();
    if(role==='conferma'){
      this.listaIngressi.splice(indexIng,1);
      this.clientiService.eliminaIngresso(this.indexAntifurto, indexIng);
      await this.presentToast(`Ingresso ${nome} eliminato con successo`, 'bottom');
    }
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

}
