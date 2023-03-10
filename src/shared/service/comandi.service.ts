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
}
