import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// components
import { HeadersComponent } from './components/headers/headers.component';
import { ClienteModalComponent} from "./components/cliente-modal/cliente-modal.component";

@NgModule({
  declarations:[
    HeadersComponent,
    ClienteModalComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers:[],
  exports:[
    HeadersComponent,
    ClienteModalComponent
  ]
})
export class SharedModule{}
