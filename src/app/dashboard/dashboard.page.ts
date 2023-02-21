import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";
import {ClienteModalComponent} from "../../shared/components/cliente-modal/cliente-modal.component";
import {ModalController} from "@ionic/angular";
import {ClientiService} from "../../shared/service/clienti.service";
import {Antifurto, Cliente} from "../../shared/model/cliente.interface";
import {Subscription} from "rxjs";

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

  constructor(private route: ActivatedRoute,
              private modalCtrl: ModalController,
              private clienteService: ClientiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) =>{
        let param = params['index'];
        param = param.split('-');
        this.idc = param[0];
        this.index=param[1];
        console.log(`Dashboard: actived ${this.clienteService.actived}`);

        this.subscription = this.clienteService.clientiChanged.subscribe(res=>{
          this.antifurto = this.clienteService.getCliente(this.idc).antifurti[this.index];
          console.log(`Dashboard: clienti in subscribe ${JSON.stringify(res)}`);
          console.log(`Dashboard: antifurto in subscribe ${JSON.stringify(this.antifurto)}`);
        })
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
