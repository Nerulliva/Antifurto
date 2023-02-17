import {Component, OnInit, ViewChild} from "@angular/core";
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ClientiService} from "../../service/clienti.service";
import {Antifurto, Cliente} from "../../model/cliente.interface";
import {FileManagerService} from "../../service/file-manager.service";

@Component({
  selector: 'cliente-modal',
  templateUrl: './cliente-modal.component.html',
  styleUrls: ['./cliente-modal.component.scss']
})
export class ClienteModalComponent implements OnInit{
  // @ts-ignore
  formData: FormGroup;
  // @ts-ignore
  @ViewChild('form') form: NgForm

  titolo: string = '';
  tipo: string = ""; // addCliente || addAntif
  index: null = null;

  constructor(private modalCtrl: ModalController,
              public formsBuilder: FormBuilder,
              private clientiService: ClientiService,
              private fileManagerService: FileManagerService) {
  }

  ngOnInit(): void {
    // console.log(`cliente in modal ${this.clientiService.getCliente(0).nome}`)
    console.log(`tipo: ${this.tipo}`);
    if(this.tipo === 'addCliente'){
      this.initForAddCliente()
    } else if (this.tipo === 'addAntif'){
      this.initForAddAntifurto();
    }
  }

  initForAddCliente(){
    this.formData = new FormGroup({
      'nome': new FormControl(null, Validators.required),
      'cognome': new FormControl(null),
    });
  }

  initForAddAntifurto(){
    this.formData = new FormGroup({
      'nome': new FormControl(null, Validators.required),
      'centralina': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
      'codCentralina': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{6}$')])
    });
  }
  // @ts-ignore
   onSubmit() {

    if (this.tipo === 'addCliente') {
      let cliente: Cliente = {
        nome: this.formData.get('nome')?.value,
        cognome: this.formData.get('cognome')?.value,
        antifurti: [], // riguardare questo
      }
      this.clientiService.addCliente(cliente);
      this.modalCtrl.dismiss(cliente,'confirm');
    }

    if (this.tipo === 'addAntif') {
      let antifurto: Antifurto = {
        nome: this.formData.get('nome')?.value,
        numCentralina: this.formData.get('centralina')?.value,
        codiceCliente: this.formData.get('codCentralina')?.value
      }
      this.clientiService.addAntifurto(antifurto);
      this.modalCtrl.dismiss(antifurto,'confirm');
    }
     // this.confirm();
  }


  validNumero(): boolean{
    let res = !this.formData.get('centralina')?.valid && this.formData.touched;
    return res;
  }

  validCodCentralina(): boolean {
    let res = !this.formData.get('codCentralina')?.valid && this.formData.touched;
    return res;
  }

  confirm() {
    return this.modalCtrl.dismiss('creato', 'confirm');
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }
}
