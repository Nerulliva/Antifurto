import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ClienteModalComponent} from "../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController} from "@ionic/angular";
import {ClientiService} from "../../shared/service/clienti.service";
import {Antifurto, Cliente} from "../../shared/model/cliente.interface";
import {Subscription} from "rxjs";
import {ComandiModel} from "../../shared/model/comandi.model";
import {ComandiService} from "../../shared/service/comandi.service";

export interface SelezioneCliente{
  comando: number;
  ingresso: number;
  descIngresso: string;
  codiceCliente: number;
}

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
        this.sceltaCliente = {
            comando: this.comandiService.getComandoScelto(),
            ingresso: this.comandiService.getIngressoScelto(),
            descIngresso: this.comandiService.getDescIngresso(),
            codiceCliente: this.comandiService.getCodiceCliente()
        }
         this.messageToSend = this.composeMessage();
          console.log(this.messageToSend)

      }
    );
  }

  composeMessage(): string{
    let baseString = `C.${this.sceltaCliente.codiceCliente} #`;
    if (this.sceltaCliente.comando && this.sceltaCliente.ingresso){
      let numIng = this.sceltaCliente.descIngresso.substring(0,1);
      let comando = this.comandiService.getComando(this.sceltaCliente.comando);
      comando = comando.replace('#', numIng);
      baseString = baseString.replace('#',comando);
    } else if (this.sceltaCliente.comando){
      let comando = this.comandiService.getComando(this.sceltaCliente.comando);
      baseString = baseString.replace('#',comando);
    }
    return baseString;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
