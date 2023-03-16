import {Component, DoCheck, Input, OnInit} from "@angular/core";
import {Antifurto} from "@plug/antifurto-plugin";
import {ClientiService} from "../../../shared/service/clienti.service";
import {SmsManager} from "@byteowls/capacitor-sms";

@Component({
  selector: 'sender',
  templateUrl: 'sender.component.html',
  styleUrls: ['sender.component.scss']
})
export class SenderComponent implements OnInit, DoCheck{

  @Input() messageToSend: any;
  @Input() index: any; // index antifurto
  oldMessage: any;
  messageReady: any;

  constructor(private clientiService: ClientiService) {
  }

  ngOnInit(): void {
    this.messageReady = !this.messageToSend.includes('#') ? true : false;
    this.oldMessage = this.messageReady
    console.log(`INIT: ${this.messageReady}`);
  }

  ngDoCheck(): void {
    if(this.oldMessage !== this.messageToSend){
      this.messageReady = !this.messageToSend.includes('#') ? true : false;
      this.oldMessage = this.messageToSend;
      console.log(`DOCHECK: ${this.messageReady}`);
    }
  }

  sendMessage(){
    console.log(`numero: ${this.clientiService.getActivedCliente().antifurti[this.index].numCentralina}`)
    Antifurto.sendMessage({
      numero: this.clientiService.getActivedCliente().antifurti[this.index].numCentralina.toString(),
      message: this.messageToSend
    })

  }

}
