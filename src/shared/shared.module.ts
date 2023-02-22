import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// components
import { HeadersComponent } from './components/headers/headers.component';
import { ClienteModalComponent} from "./components/cliente-modal/cliente-modal.component";
import {ClientiService} from "./service/clienti.service";
import {FileManagerService} from "./service/file-manager.service";
import {File} from "@awesome-cordova-plugins/file/ngx";
import { Diagnostic  } from '@awesome-cordova-plugins/diagnostic/ngx';
import { ConfirmModalComponent} from "./components/confirm-modal/confirm-modal.component"

@NgModule({
  declarations:[
    HeadersComponent,
    ClienteModalComponent,
    ConfirmModalComponent
  ],
  imports:[
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule
  ],
  providers:[
    ClientiService,
    FileManagerService,
    File,
    Diagnostic
  ],
  exports:[
    HeadersComponent,
    ClienteModalComponent,
    ConfirmModalComponent
  ]
})
export class SharedModule{}
