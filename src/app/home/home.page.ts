import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../theme/theme.service";
import {Cliente} from "../../shared/model/cliente.interface";
import {ClientiService} from "../../shared/service/clienti.service";
import {ModalController} from "@ionic/angular";
import {ClienteModalComponent} from "../../shared/components/cliente-modal/cliente-modal.component";
import {FileManagerService} from "../../shared/service/file-manager.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  // clienti: Cliente[] = [];
  modal: any;

  boolToggle: any;

  constructor(private themeService: ThemeService,
              private clientiService: ClientiService,
              public modalCtrl: ModalController,
              private fileManager: FileManagerService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fileManager.printAppFiles();
    this.fileManager.writeDir();
    this.fileManager.read().then(res=>{
      this.clientiService.setClienti(res);
      //console.log(`cliente dopo setClienti -> ${this.clientiService.getCliente(0).nome}`)
      // this.clienti = this.clientiService.getClienti();
    });
    console.log(`Home: clienti length ${this.clientiService.getClienti().length}`)
  }

  /*async manageCliente(){
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
      // this.clienti = this.clientiService.getClienti();
     /!* const textForSave = JSON.stringify(this.clienti);
      await this.fileManager.writeFileOnDevice(textForSave, 'clienti');*!/
    }
  }*/

  start(){
    this.router.navigate(['clienti'], {relativeTo: this.route});
  }


  /*cambiaTema(){
    this.themeService.activeTheme('myTheme');
  }

  darkTema(){
    this.themeService.activeTheme('dark');
  }*/
}
