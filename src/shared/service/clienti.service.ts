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
    this.clienti.sort((a:any, b:any) => a.nome > b.nome ? 1 : -1);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti').then(res => {
      this.fileManager.read()
    });

    // console.log(`cliente inserito esterno ${cliente.nome}`)
    // console.log(`cliente dalla lista clienti ${this.clienti[0].nome}`)
  }

  modifyCliente(cliente: any, index: number){
   /* console.log(`index ${index}`)
    console.log(`prima di modifica ${this.clienti[index].nome}`);*/
    this.clienti[index] = {...this.clienti[index], ...cliente};
    // console.log(`clientiService cli modificato: ${this.clienti[index].nome}`);//debug

    this.clienti.sort((a:any, b:any) => a.nome > b.nome ? 1 : -1);
    const textForSave = JSON.stringify(this.clienti);
    console.log(`textForSave ${textForSave}`);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti').then(res=>{
      // console.log(`writeFile ${res}`);
      this.fileManager.read().then(res=>{ // prima era fuori
        console.log(`lettura: ${res[0].nome}`)
      });//debug
    });

    // this.print();// debug
  }

  deleteCliente(index: number){
    this.clienti.splice(index,1);
    this.clienti.sort((a:any, b:any) => a.nome > b.nome ? 1 : -1);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
  }

  addAntifurto(antifurto: Antifurto){
    this.clienti[this.actived].antifurti?.push(antifurto);
    this.clienti[this.actived].antifurti.sort((a:any, b:any) => a.nome > b.nome ? 1 : -1);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
  }

  deleteAntifurto(index: number){
    this.clienti[this.actived].antifurti.splice(index, 1);
    this.clienti[this.actived].antifurti.sort((a:any, b:any) => a.nome > b.nome ? 1 : -1);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
  }

  modifyAntifurto(antifurto: any, index:number){
    this.clienti[this.actived].antifurti[index] = {...this.clienti[this.actived].antifurti[index], ...antifurto};
    this.clienti[this.actived].antifurti.sort((a:any, b:any) => a.nome > b.nome ? 1 : -1);
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
  }

  addIngresso(ingresso: any,index: number){
    this.clienti[this.actived].antifurti[index].ingressi.push(ingresso);
    this.clienti[this.actived].antifurti[index].ingressi.sort((a:any, b:any) => a.numero > b.numero ? 1 : -1)
    const textForSave = JSON.stringify(this.clienti);
    this.fileManager.writeFileOnDevice(textForSave, 'clienti');
  }

  modifyIngresso(ingresso:any, indexAnt: number, indexIng: number){
    this.clienti[this.actived].antifurti[indexAnt].ingressi[indexIng] = {
      ...this.clienti[this.actived].antifurti[indexAnt].ingressi[indexIng], ...ingresso
    };
    this.clienti[this.actived].antifurti[indexAnt].ingressi.sort((a:any, b:any) => a.numero > b.numero ? 1 : -1)
  }

  eliminaIngresso(indexAnt: number, indexIng: number){
    this.clienti[this.actived].antifurti[indexAnt].ingressi.splice(indexIng,1);
    this.clienti[this.actived].antifurti[indexAnt].ingressi.sort((a:any, b:any) => a.numero > b.numero ? 1 : -1)
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
      console.log(`Clienti-service: cognome ${x.cognome}`);
      // console.log(`Clienti-service: anti ${x.antifurti}`);
    }
  }
}
