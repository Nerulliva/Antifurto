import {Component, Input, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Antifurto} from "../../../shared/model/cliente.interface";

@Component({
  selector: 'menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  //@ts-ignore
  @Input() antifurto: Antifurto;
  //@ts-ignore
  @Input() indexAntifurto: number;
  //@ts-ignore
  sceltaCliente: SelezioneCliente;

  constructor(private router: Router,
              private route: ActivatedRoute){}

  ngOnInit(): void {

  }

  goToIngressi(){
    this.router.navigate([`lista-ingressi/${this.indexAntifurto}`], {relativeTo: this.route});
  }

  goToComandi(){
    this.router.navigate([`lista-comandi/${this.indexAntifurto}`], {relativeTo: this.route});
  }

}
