import {Component, DoCheck, Input, OnInit} from "@angular/core";
import {Cliente} from "../../../shared/model/cliente.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {ClientiService} from "../../../shared/service/clienti.service";
import {ClienteModalComponent} from "../../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'lista-clienti',
  templateUrl: './lista-clienti.components.html',
  styleUrls: ['./lista-clienti.components.scss'],
})
export class ListaClientiComponents implements OnInit, DoCheck{
  // @ts-ignore
  // @Input() clienti: Cliente[] = [];
  clienti: Cliente[] = [];
  isEmpty: boolean = true;
  oldClienti: Cliente[] = [];
  modal: any;

  constructor(private router: Router,
              private clientiService: ClientiService,
              private modalCtrl: ModalController,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.clienti = this.clientiService.getClienti();
     // this.isEmpty = this.clienti?.length === 0 ? true : false
  }

  ngDoCheck(): void {
    /*if(this.clienti && this.clienti.length > 0) {
      if (this.oldClienti.length != this.clienti?.length) {
        console.log('cambiato');
        this.oldClienti = Object.assign(this.clienti);
        this.isEmpty = this.clienti?.length === 0 ? true : false
      }
    }*/
  }

  goTo(index: number){
    // this.router.navigate([`${index}/antifurti`], {relativeTo: this.route})
    this.router.navigate([`${index}/antifurti`], {relativeTo: this.route})
    this.clientiService.setActivedCliente(index);
   /* this.router.navigateByUrl(`dashboard/${index}`).catch(err => {
      console.log(`errore in lista clienti ${err}`);
    });*/
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
      /* const textForSave = JSON.stringify(this.clienti);
       await this.fileManager.writeFileOnDevice(textForSave, 'clienti');*/
    }
  }

}
