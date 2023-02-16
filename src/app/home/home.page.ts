import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../theme/theme.service";
import {Cliente} from "../../shared/model/cliente.interface";
import {ClientiService} from "../../shared/service/clienti.service";
import {ModalController} from "@ionic/angular";
import {ClienteModalComponent} from "../../shared/components/cliente-modal/cliente-modal.component";
import {FileManagerService} from "../../shared/service/file-manager.service";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  clienti: Cliente[] = [];
  modal: any;

  boolToggle: any;

  constructor(private themeService: ThemeService,
              private clientiService: ClientiService,
              public modalCtrl: ModalController,
              private fileManager: FileManagerService) {}

  ngOnInit(): void {
    this.clienti = this.clientiService.getClienti();
    // this.fileManager.writeDir();
    this.fileManager.readDirData();
    this.fileManager.readAppFiles();
  }

/*  changePage(): void{
    this.router.navigateByUrl('dashboard');
  }*/

  async manageCliente(){
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

    const {data, role} = await this.modal.onWillDismiss();
    if(role === 'confirm'){
      this.clienti = this.clientiService.getClienti();
      //console.log(this.clienti);
    }
  }


  /*cambiaTema(){
    this.themeService.activeTheme('myTheme');
  }

  darkTema(){
    this.themeService.activeTheme('dark');
  }*/
}
