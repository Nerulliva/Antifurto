import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ClienteModalComponent} from "../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController} from "@ionic/angular";
import {ClientiService} from "../../shared/service/clienti.service";
import {Antifurto} from "../../shared/model/cliente.interface";
import {FileManagerService} from "../../shared/service/file-manager.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit{
  //@ts-ignore
  antifurti: Antifurto[] = [];
  index: any;
  modal: any;

  constructor(private route: ActivatedRoute,
              private modalCtrl: ModalController,
              private clienteService: ClientiService,
              private fileManager: FileManagerService)
  {
    //this.antifurti = [];
  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
        this.index = params['index'];
        this.clienteService.setActivedCliente(this.index);
        this.antifurti = this.clienteService.getActivedCliente()?.antifurti ? this.clienteService.getActivedCliente()?.antifurti : [];
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
    this.modal.present();

    const {role} = await this.modal.onWillDismiss();
    if (role === 'confirm') {
      this.antifurti = this.clienteService.getActivedCliente().antifurti;
      const nominativo = this.clienteService.getNominativo();
      const textForSave = JSON.stringify(this.clienteService.getActivedCliente());
      await this.fileManager.writeFileOnDevice(textForSave, nominativo);
     console.log(this.antifurti);
    }
  }
}
