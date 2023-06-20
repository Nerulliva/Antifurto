import {Component, OnInit, ViewChild} from "@angular/core";
import {ClientiService} from "../../../shared/service/clienti.service";
import {ComandiService} from "../../../shared/service/comandi.service";
import {ActivatedRoute} from "@angular/router";
import {NavController} from "@ionic/angular";

@Component({
  selector: 'lista-comandi',
  templateUrl: 'lista-comandi.component.html',
  styleUrls: ['lista-comandi.component.scss']
})
export class ListaComandiComponent implements OnInit{

  @ViewChild('modal') modale: any;
  comandi: any;
  nomeCliente: any
  //@ts-ignore
  openModal: boolean;
  ingressi: any;
  indexAntifurto: any;

  constructor(private clientiService: ClientiService,
              private comandiService: ComandiService,
              private navCtrl: NavController,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((params)=>{
      this.indexAntifurto = params['index'];
      this.ingressi = this.clientiService.getActivedCliente().antifurti[this.indexAntifurto].ingressi;
      this.ingressi.sort((a:any, b:any) => a.numero > b.numero ? 1 : -1);
      this.comandiService.setCodCliente(this.clientiService.getActivedCliente().antifurti[this.indexAntifurto].codiceCliente);
    });

    this.comandi = this.comandiService.getComandi();
    this.comandi.sort((a:any, b:any) => a[1] > b[1] ? 1 : -1);
    this.nomeCliente = this.clientiService.getNominativo();
  }

  //  setto il comando scelto
  select(index: number){
   this.comandiService.setComandoScelto(index);
   let comando = this.comandiService.getComandoDesc(index);

   if(comando === 'Inclusione ingresso' || comando === 'Esclusione Ingresso'){
     this.openModal = true;
   } else {
     this.navCtrl.pop();
   }
  }

  // setto ingresso per il comando
  selectIng(index: number){
    this.comandiService.setIngressoScelto(index);
    this.comandiService.setDescIngresso(this.clientiService.getActivedCliente().antifurti[this.indexAntifurto].ingressi[index].descrizione)
    this.openModal = false;
    this.modale.dismiss();
    this.navCtrl.pop();
  }
}
