import {Component, DoCheck, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {Antifurto} from "@plug/antifurto-plugin";
import {ClientiService} from "../../../shared/service/clienti.service";
import {ToastController} from "@ionic/angular";

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

  @Output() messageSendEmitter = new EventEmitter<boolean>();

  constructor(private clientiService: ClientiService,
              private toast: ToastController) {
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
    }).then(async () => {
      await this.presentToast('Messaggio inviato', 'bottom');
       this.messageSendEmitter.emit(true);
    });
  }

  async presentToast(message: string,position: 'top' | 'middle' | 'bottom'){
    const toast = await this.toast.create({
      duration: 2000,
      position: position,
      message: message,
      cssClass: 'custom-toast'
    })
    await toast.present();
  }

}
