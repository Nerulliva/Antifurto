import {Injectable} from "@angular/core";
import {FileManagerService} from "../../../shared/service/file-manager.service";
import {ClientiService} from "../../../shared/service/clienti.service";
import {ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Antifurto} from "../../../shared/model/cliente.interface";

@Injectable({providedIn: 'root'})
export class ListaAntifurtiResolverService{

  constructor(private fileManagerService: FileManagerService,
              private clientiService: ClientiService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot ){
    const clienti = this.clientiService.getClienti();
    let antifurti: Antifurto[] = [];
    for(let i=0; i< clienti.length; i++){
      if( i === this.clientiService.getActived()){
        for(let j=0; j < clienti[i].antifurti.length; j++){
          antifurti.push(clienti[i].antifurti[j]);
        }
        return antifurti
      }
    }
    return antifurti;
  }
}
