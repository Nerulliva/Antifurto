import { Injectable} from "@angular/core";
import {ComandiModel} from "../model/comandi.model";

@Injectable({
  providedIn: 'root'
})
export class ComandiService{
  comandoScelto: any;
  ingressoScelto: any;
  descIngresso: any;
  codCliente: any;
  comandi = new ComandiModel();

  setComandoScelto(index: number){
    this.comandoScelto = index;
  }

  setIngressoScelto(index: number){
    this.ingressoScelto = index;
  }

  setDescIngresso(desc: string){
    this.descIngresso = desc;
  }

  setCodCliente(cod: number){
    this.codCliente = cod;
  }

  getComandoScelto(){
    return this.comandoScelto;
  }

  getIngressoScelto(){
    return this.ingressoScelto;
  }

  getDescIngresso(){
    return this.descIngresso;
  }

  getCodiceCliente(){
    return this.codCliente;
  }

  getComandi(){
    return this.comandi.getComandi();
  }

  getComando(index: number){
    return this.comandi.getComando(index);
  }

  composeMessage(): string {
    let baseString = `C.${this.codCliente} #`;
    console.log(`COM SERVICE: ${this.comandoScelto}`)
    console.log(`COM SERVICE: ${this.ingressoScelto}`)
    if(this.comandoScelto !== undefined && this.ingressoScelto !== undefined){
      console.log('tutti e due')
      let numIng = this.descIngresso.substring(0,2);
      let comando = this.getComando(this.comandoScelto);
      comando = comando.replace('#', numIng);
      baseString = baseString.replace('#',comando);
      console.log(baseString)
      // return baseString;
    } else if(this.comandoScelto && !this.ingressoScelto){
      let comando = this.getComando(this.comandoScelto);
      baseString = baseString.replace('#', comando);
      console.log(baseString)
    }
    return baseString;
  }
}
