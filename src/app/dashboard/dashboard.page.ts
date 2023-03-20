import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ClienteModalComponent} from "../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController} from "@ionic/angular";
import {ClientiService} from "../../shared/service/clienti.service";
import {Antifurto, Cliente} from "../../shared/model/cliente.interface";
import {Subscription} from "rxjs";
import {ComandiModel} from "../../shared/model/comandi.model";
import {ComandiService} from "../../shared/service/comandi.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss']
})
export class DashboardPage implements OnInit, OnDestroy{
  //@ts-ignore
  antifurto: Antifurto;
  index: any;
  //@ts-ignore
  idc: number; // index cliente attivo
  modal: any;
  //@ts-ignore
  subscription: Subscription;

  nomeCliente: any;
  nomeAntifurto: any;
  //@ts-ignore
  sceltaCliente: SelezioneCliente;
  messageToSend: any;

  constructor(private route: ActivatedRoute,
              private modalCtrl: ModalController,
              private clienteService: ClientiService,
              private comandiService: ComandiService) {}

  ngOnInit(): void {
    console.log('init dashboard')
    this.route.params.subscribe((params: Params) =>{
        let param = params['index'];
        param = param.split('-');
        this.idc = param[0];
        this.index=param[1];
        this.clienteService.setActivedCliente(this.idc);
        // console.log(`Dashboard: actived ${this.clienteService.actived}`);

        if(this.clienteService.getCliente(this.idc)){
          this.antifurto = this.clienteService.getCliente(this.idc).antifurti[this.index];
          this.nomeCliente = this.clienteService.getNominativo();
          this.nomeAntifurto = this.antifurto?.nome;
          // console.log('esiste');
          // console.log(`DASHBOARD: nome antif ${this.antifurto.nome}`);
        }

      // catturato quando nasce nuova istanza di clientiService
        this.subscription = this.clienteService.clientiChanged.subscribe(res=>{
          this.antifurto = this.clienteService.getCliente(this.idc).antifurti[this.index];
          this.nomeCliente = this.clienteService.getNominativo();
          this.nomeAntifurto = this.antifurto?.nome;
          // console.log(`Dashboard: clienti in subscribe ${JSON.stringify(res)}`);
          // console.log(`Dashboard: antifurto in subscribe ${JSON.stringify(this.antifurto)}`);
        });
        // scelte comandi con eventuali ingressi fatte dal cliente

         // this.messageToSend = this.composeMessage();
       this.messageToSend = this.comandiService.composeMessage();
        console.log(`Dashboard: ${this.messageToSend}`)
      }
    );
  }

  clearMessage(event: any){
    if( event) {
      this.messageToSend = '';
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
