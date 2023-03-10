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
      this.comandiService.setCodCliente(this.clientiService.getActivedCliente().antifurti[this.indexAntifurto].codiceCliente);
    });

    this.comandi = this.comandiService.getComandi();
    this.nomeCliente = this.clientiService.getNominativo();
  }

  //  setto il comando scelto
  select(index: number){
   this.comandiService.setComandoScelto(index);
   if(index === 23 || index === 24){
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
