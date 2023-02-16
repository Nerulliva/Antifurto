import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {Cliente} from "../../../shared/model/cliente.interface";
import {Router} from "@angular/router";
import {ClientiService} from "../../../shared/service/clienti.service";

@Component({
  selector: 'lista-clienti',
  templateUrl: './lista-clienti.components.html',
  styleUrls: ['./lista-clienti.components.scss']
})
export class ListaClientiComponents implements OnInit, DoCheck{
  // @ts-ignore
  @Input() clienti: Cliente[] = [];
  isEmpty: boolean = true;
  oldClienti: Cliente[] = [];

  constructor(private router: Router,
              private clienteService: ClientiService) {
  }

  ngOnInit() {
     this.isEmpty = this.clienti.length === 0 ? true : false
  }

  ngDoCheck(): void {
    if(this.oldClienti.length != this.clienti.length){
      console.log('cambiato');
      this.oldClienti = Object.assign(this.clienti);
      this.isEmpty = this.clienti.length === 0 ? true : false
    }
  }

  goTo(index: number){
    this.router.navigateByUrl(`dashboard/${index}`);
  }

}
