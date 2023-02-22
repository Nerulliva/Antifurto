import {Component, OnInit} from "@angular/core";
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit{

  info = '';
  titolo= '';

  constructor(private modalCtrl: ModalController){}

  ngOnInit(): void {
  }

  annulla(){
    this.modalCtrl.dismiss(null, 'annulla');
  }

  conferma(){
    this.modalCtrl.dismiss(null,'conferma');
  }
}
