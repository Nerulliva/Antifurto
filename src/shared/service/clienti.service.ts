import {Injectable} from "@angular/core";
import {Antifurto, Cliente} from "../model/cliente.interface";

@Injectable({providedIn: 'root'})
export class ClientiService{

  clienti: Cliente[] = [];
  //@ts-ignore
  actived: number;

  addCliente(cliente: Cliente): void{
    /*let cli = this.clienti.find(el => el.nome === cliente.nome && el.nome === cliente.cognome);
    if(cli && cli.antifurti.length > 0){
      cli.antifurti.push(...cli.antifurti, ...cliente.antifurti);
    }
*/
    this.clienti.push(cliente);
  }

  getCliente(index: number): Cliente{
    return this.clienti[index];
  }

  getClienti(): Cliente[]{
    return this.clienti;
  }

  setActivedCliente(index: number):void{
    this.actived = index;
  }

  getActivedCliente(): Cliente{
    return this.clienti[this.actived];
  }

  getNominativo(): string{
    return this.getActivedCliente().nome + ' ' + this.getActivedCliente().cognome
  }

  addAntifurto(antifurto: Antifurto){
    this.clienti[this.actived].antifurti?.push(antifurto);
    console.log(`aggiunto ${this.clienti[this.actived].antifurti}`)
  }
}
