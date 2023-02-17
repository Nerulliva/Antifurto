import {Component, DoCheck, Input, OnInit} from "@angular/core";
import {Cliente} from "../../../shared/model/cliente.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'lista-clienti',
  templateUrl: './lista-clienti.components.html',
  styleUrls: ['./lista-clienti.components.scss'],
})
export class ListaClientiComponents implements OnInit, DoCheck{
  // @ts-ignore
  @Input() clienti: Cliente[] = [];
  isEmpty: boolean = true;
  oldClienti: Cliente[] = [];

  constructor(private router: Router) {
  }

  ngOnInit() {
     this.isEmpty = this.clienti?.length === 0 ? true : false
  }

  ngDoCheck(): void {
    if(this.clienti) {
      if (this.oldClienti.length != this.clienti?.length) {
        console.log('cambiato');
        this.oldClienti = Object.assign(this.clienti);
        this.isEmpty = this.clienti?.length === 0 ? true : false
      }
    }
  }

  goTo(index: number){
    this.router.navigateByUrl(`dashboard/${index}`).catch(err => {
      console.log(`errore in lista clienti ${err}`);
    });
  }

}
