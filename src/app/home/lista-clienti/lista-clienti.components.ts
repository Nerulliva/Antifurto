import {Component, DoCheck, Input, OnInit} from "@angular/core";
import {Cliente} from "../../../shared/model/cliente.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientiService} from "../../../shared/service/clienti.service";
import {ClienteModalComponent} from "../../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController, ToastController} from "@ionic/angular";
import {ConfirmModalComponent} from "../../../shared/components/confirm-modal/confirm-modal.component";

@Component({
  selector: 'lista-clienti',
  templateUrl: './lista-clienti.components.html',
  styleUrls: ['./lista-clienti.components.scss'],
})
export class ListaClientiComponents implements OnInit{
  // @ts-ignore
  // @Input() clienti: Cliente[] = [];
  clienti: Cliente[] = [];
  isEmpty: boolean = true;
  oldClienti: Cliente[] = [];
  modal: any;
  intervalId: any;
  modalDemo: any;

  constructor(private router: Router,
              private clientiService: ClientiService,
              private modalCtrl: ModalController,
              private route: ActivatedRoute,
              private toast: ToastController) {
  }

  ngOnInit() {
    this.clienti = this.clientiService.getClienti();
     // this.isEmpty = this.clienti?.length === 0 ? true : false
  }

  goTo(index: number){
    this.clientiService.setActivedCliente(index);
    this.router.navigate([`${index}/antifurti`], {relativeTo: this.route})
  }

  async manageCliente(){
    console.log('cliccato')
    this.modal = await this.modalCtrl.create({
      component: ClienteModalComponent,
      backdropDismiss: false,
      swipeToClose: false,
      componentProps:{
        "titolo": "Aggiungi Account",
        "tipo": "addCliente"
      }
    });
    this.modal.present();

    const {role} = await this.modal.onWillDismiss();
    if(role === 'confirm'){
      this.clienti = this.clientiService.getClienti();
    }
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
    //document.getElementById("overlay").style.display = "none";
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
    let nominativo = this.clienti[index].nome + ' ' + this.clienti[index].cognome
    let info =`Attenzione, si sta per eliminare l'account ${nominativo}. Sei sicuro?`

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
      this.clienti.splice(index, 1);
      this.clientiService.deleteCliente(index);
      await this.presentToast(`Account ${nominativo} eliminato`, 'bottom');
    }

  }

}
