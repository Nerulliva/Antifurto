import {Injectable} from "@angular/core";
import {Antifurto, Cliente} from "../model/cliente.interface";
import {FileManagerService} from "./file-manager.service";


@Injectable({providedIn: 'root'})
export class ClientiService{
  clienti: Cliente[] = [];
  //@ts-ignore
  actived: number;

  constructor(private fileManager: FileManagerService) {
    console.log('creato');
    if(this.clienti.length == 0){
     // console.log('clienti vuota')
      this.fileManager.read().then(res => {
        this.clienti = res;
      });
    }
  }

  addCliente(cliente: Cliente): void{
    /*let cli = this.clienti.find(el => el.nome === cliente.nome && el.nome === cliente.cognome);
    if(cli && cli.antifurti.length > 0){
      cli.antifurti.push(...cli.antifurti, ...cliente.antifurti);
    }
*/
    this.clienti.push(cliente);
    console.log(`cliente inserito esterno ${cliente.nome}`)
    console.log(`cliente dalla lista clienti ${this.clienti[0].nome}`)
  }

  setClienti(clienti: Cliente[]){
    this.clienti = clienti;
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
    return this.getActivedCliente().nome + '_' + this.getActivedCliente().cognome
  }

  addAntifurto(antifurto: Antifurto){
    // console.log(`cliente in addAnt ${this.clienti[0]}`);
    // console.log(`attivo ${this.clienti[this.actived].nome}`)
    // console.log(`numero attivo ${this.actived}`)
    this.clienti[this.actived].antifurti?.push(antifurto);
    // console.log(`aggiunto ${this.clienti[this.actived].antifurti}`)
  }
}
