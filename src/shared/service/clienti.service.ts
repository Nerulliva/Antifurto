import {EventEmitter, Injectable} from "@angular/core";
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
    if(this.clienti.length === 0){
      this.fileManager.read().then(clienti => {
        this.clienti = clienti;
        this.clientiChanged.next(this.clienti.slice());
      })
    }
  }

  addCliente(cliente: Cliente): void{
    this.clienti.push(cliente);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
    // console.log(`cliente inserito esterno ${cliente.nome}`)
    // console.log(`cliente dalla lista clienti ${this.clienti[0].nome}`)
  }

  modifyCliente(cliente: any, index: number){
    this.clienti[index] = {...this.clienti[index], ...cliente};
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
    this.print();
  }

  deleteCliente(index: number){
    this.clienti.splice(index,1);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
  }

  addAntifurto(antifurto: Antifurto){
    this.clienti[this.actived].antifurti?.push(antifurto);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
  }

  deleteAntifurto(index: number){
    this.clienti[this.actived].antifurti.splice(index, 1);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
  }

  modifyAntifurto(antifurto: any, index:number){
    this.clienti[this.actived].antifurti[index] = {...this.clienti[this.actived].antifurti[index], ...antifurto};
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
  }

  addIngresso(ingresso: any,index: number){
    this.clienti[this.actived].antifurti[index].ingressi.push(ingresso);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
  }

  modifyIngresso(ingresso:any, indexAnt: number, indexIng: number){
    this.clienti[this.actived].antifurti[indexAnt].ingressi[indexIng] = {
      ...this.clienti[this.actived].antifurti[indexAnt].ingressi[indexIng], ...ingresso
    };
  }

  eliminaIngresso(indexAnt: number, indexIng: number){
    this.clienti[this.actived].antifurti[indexAnt].ingressi.splice(indexIng,1);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
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
    return this.clienti[this.getActived()].antifurti.slice();
  }

  getIngresso(indexAnt: number, indexIng: number){
    return this.getAntifurticliente()[indexAnt].ingressi[indexIng];
  }

  getNominativo(): string{
    return this.getActivedCliente().nome + ' ' + this.getActivedCliente().cognome
  }

  ingressoExists(index: number, numIng: number): boolean {
    let ing = this.clienti[this.actived].antifurti[index].ingressi.find(el => el.numero === numIng);
    return ing ? true : false;
  }

  print() {
    for (const x of this.clienti) {
      console.log(`Clienti-service: nome ${x.nome}`);
      console.log(`Clienti-service: conome ${x.cognome}`);
      // console.log(`Clienti-service: anti ${x.antifurti}`);
    }
  }
}
