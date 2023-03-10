import {Component, DoCheck, Input, OnInit} from "@angular/core";

@Component({
  selector: 'sender',
  templateUrl: 'sender.component.html',
  styleUrls: ['sender.component.scss']
})
export class SenderComponent implements OnInit, DoCheck{

  @Input() messageToSend: any;
  oldMessage: any;
  messageReady: any;

  ngOnInit(): void {
    this.messageReady = !this.messageToSend.includes('#') ? true : false;
    this.oldMessage = this.messageReady
  }

  ngDoCheck(): void {
    if(this.oldMessage !== this.messageToSend){
      this.messageReady = !this.messageToSend.includes('#') ? true : false;
    }
  }

}
