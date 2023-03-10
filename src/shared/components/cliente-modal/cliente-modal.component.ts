import {Component, OnInit, ViewChild} from "@angular/core";
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ClientiService} from "../../service/clienti.service";
import {Antifurto, Cliente} from "../../model/cliente.interface";

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
  tipo: string = ""; // addCliente || addAntif || modifyAnt || modifyCliente || addIngresso || modifyIng
  // @ts-ignore
  index: number = 0;
  // @ts-ignore
  count: number;
  // @ts-ignore
  indexIng: number;
  // @ts-ignore
  data: any;

  constructor(private modalCtrl: ModalController,
              public formsBuilder: FormBuilder,
              private clientiService: ClientiService) {
  }

  ngOnInit(): void {
    // console.log(`cliente in modal ${this.clientiService.getCliente(0).nome}`)
    console.log(`tipo: ${this.tipo}`);
    if(this.tipo === 'addCliente' || this.tipo === 'modifyCliente'){
      this.initForAddCliente()
    } else if (this.tipo === 'addAntif' || this.tipo === 'modifyAnt'){
      this.initForAddAntifurto();
    } else if (this.tipo === 'addIngresso' || this.tipo === 'modifyIng'){
      this.initForAddIngresso();
    }
    console.log(this.index);
  }

  initForAddCliente(){
    if(this.tipo === 'addCliente'){
      this.formData = new FormGroup({
        'nome': new FormControl(null, Validators.required),
        'cognome': new FormControl(null, Validators.required),
      });
    } else {
      this.formData = new FormGroup({
        'nome': new FormControl(this.data.nome, Validators.required),
        'cognome': new FormControl(this.data.cognome, Validators.required),
      });
    }

  }

  initForAddAntifurto(){
    if(this.tipo === 'addAntif'){
      this.formData = new FormGroup({
        'nome': new FormControl(null, Validators.required),
        'centralina': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
        'codCentralina': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{6}$')])
      });
    } else {
      this.formData = new FormGroup({
        'nome': new FormControl(this.data.nome, Validators.required),
        'centralina': new FormControl(this.data.numCentralina, [Validators.required, Validators.pattern('^[0-9]{10}$')]),
        'codCentralina': new FormControl(this.data.codiceCliente, [Validators.required, Validators.pattern('^[0-9]{6}$')])
      });
    }
  }

  initForAddIngresso(){
    if(this.tipo === 'addIngresso'){
      this.formData = new FormGroup({
        'numero': new FormControl(null, [Validators.required, Validators.min(1)]),
        'nome' : new FormControl(null, Validators.required)
      });
    } else {
      this.formData = new FormGroup({
        'numero': new FormControl(this.data.numero, [Validators.required, Validators.min(1)]),
        'nome' : new FormControl(this.data.nome, Validators.required)
      });
    }

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
    else if (this.tipo === 'addAntif') {
      let antifurto: Antifurto = {
        nome: this.formData.get('nome')?.value,
        numCentralina: this.formData.get('centralina')?.value,
        codiceCliente: this.formData.get('codCentralina')?.value,
        ingressi: [] = []
      }
      this.clientiService.addAntifurto(antifurto);
      this.modalCtrl.dismiss(antifurto,'confirm');
    }
     else if(this.tipo === 'modifyCliente'){
      let cliente = {
        nome: this.formData.get('nome')?.value,
        cognome: this.formData.get('cognome')?.value
      }
      this.clientiService.modifyCliente(cliente, this.index);
      this.modalCtrl.dismiss(cliente,'confirm');
    }
    else if(this.tipo === 'modifyAnt'){
      let antifurto = {
        nome: this.formData.get('nome')?.value,
        numCentralina: this.formData.get('centralina')?.value,
        codiceCliente: this.formData.get('codCentralina')?.value,
      }
      this.clientiService.modifyAntifurto(antifurto, this.index);
      this.modalCtrl.dismiss(antifurto,'confirm');
    }
    else if(this.tipo === 'addIngresso'){
      let num = this.formData.get('numero')?.value
      let desc = num < 10 ? '0'+num+'_'+this.formData.get('nome')?.value : num+'_'+this.formData.get('nome')?.value;
      let ingresso = {
        nome: this.formData.get('nome')?.value,
        numero: this.formData.get('numero')?.value,
        descrizione: desc
      }
      this.clientiService.addIngresso(ingresso, this.index);
      this.modalCtrl.dismiss(ingresso,'confirm');
    }
    else if(this.tipo === 'modifyIng'){
      let num = this.formData.get('numero')?.value
      let desc = num < 10 ? '0'+num+'_'+this.formData.get('nome')?.value : num+'_'+this.formData.get('nome')?.value;
      let ingresso = {
        nome: this.formData.get('nome')?.value,
        numero: this.formData.get('numero')?.value,
        descrizione: desc
      }
      this.clientiService.modifyIngresso(ingresso, this.index, this.indexIng);
      this.modalCtrl.dismiss(ingresso,'confirm');
    }
     // this.confirm();
  }

  validIngresso(): boolean{
    if( this.tipo === 'modifyAnt'){
      return !this.clientiService.ingressoExists(this.index, this.formData.get('numero')?.value);
    }
    return false;
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
