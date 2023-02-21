import {Injectable} from "@angular/core";
import {Antifurto, Cliente} from "../model/cliente.interface";
import {FileManagerService} from "./file-manager.service";
import {Subject} from "rxjs";


@Injectable({providedIn: 'root'})
export class ClientiService{

  clientiChanged = new Subject<Cliente[]>();
  clienti: Cliente[] = [];
  //@ts-ignore
  actived: number;

  constructor(private fileManager: FileManagerService) {
    console.log('Clienti-service: creato');
    console.log(`Clienti-service: length ${this.clienti.length}`);
    if(!this.clienti){
      console.log('Clienti-service: non è');
    } else if(this.clienti === undefined){
      console.log(`Clienti-service: clienti undefined`)
    }
    else if(this.clienti.length === 0){
      console.log(`Clienti-service: clienti vuota`)
      this.fileManager.read().then(res => {
        this.clienti = res;
        console.log(`ClientiService: dopo read ${JSON.stringify(this.clienti)}`)
        this.clientiChanged.next(this.clienti.slice());
      });
      if(this.clienti.length > 0){
        console.log(`Clienti-service: clienti ora piena`)
      }
    }
  }

  addCliente(cliente: Cliente): void{
    /*let cli = this.clienti.find(el => el.nome === cliente.nome && el.nome === cliente.cognome);
    if(cli && cli.antifurti.length > 0){
      cli.antifurti.push(...cli.antifurti, ...cliente.antifurti);
    }
*/
    this.clienti.push(cliente);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
    this.clientiChanged.next(this.clienti.slice());
    console.log(`cliente inserito esterno ${cliente.nome}`)
    console.log(`cliente dalla lista clienti ${this.clienti[0].nome}`)
  }

  setClienti(clienti: Cliente[]){
    this.clienti = clienti;
    this.clientiChanged.next(this.clienti.slice());
  }

  getCliente(index: number): Cliente{
    return this.clienti[index];
  }

  getClienti(): Cliente[]{
    return this.clienti.slice();
  }

  setActivedCliente(index: number):void{
    this.actived = index;
  }

  getActived(): number{
    return this.actived;
  }

  getActivedCliente(): Cliente{
    return this.clienti[this.actived];
  }

  getAntifurticliente(){
    return this.clienti[this.getActived()].antifurti;
  }

  getNominativo(): string{
    return this.getActivedCliente().nome + '_' + this.getActivedCliente().cognome
  }

  addAntifurto(antifurto: Antifurto){
    let obj = JSON.stringify(this.clienti);
    console.log(`ClientiService: lista clienti in add ${obj}`)
    console.log(`ClientiService: numero index ${this.actived}`)
    this.clienti[this.actived].antifurti?.push(antifurto);
    let obj2 = JSON.stringify(this.clienti);
    console.log(`ClientiService: lista clienti in add dopo ${obj2}`)
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
   /* // console.log(`cliente in addAnt ${this.clienti[0]}`);
     console.log(`attivo ${this.clienti[this.actived].nome}`)
    // console.log(`numero attivo ${this.actived}`)
    if(!this.clienti[this.actived].hasOwnProperty('antifurti')){
      console.log(`ClientiService: antifurto non presente`);
    }

    this.clienti[this.actived].antifurti?.push(antifurto);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
    this.clientiChanged.next(this.clienti.slice());
    // console.log(`aggiunto ${this.clienti[this.actived].antifurti}`)*/
  }

  print() {
    for (const x of this.clienti) {
      console.log(`Clienti-service: nome ${x.nome}`);
      console.log(`Clienti-service: nome ${x.cognome}`);
      console.log(`Clienti-service: nome ${x.antifurti}`);
    }
  }
}
