import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../theme/theme.service";
import {ClientiService} from "../../shared/service/clienti.service";
import {FileManagerService} from "../../shared/service/file-manager.service";
import {ActivatedRoute, Router} from "@angular/router";

// import { PrivacyScreen } from '@capacitor-community/privacy-screen';
import { Antifurto} from '@plug/antifurto-plugin';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  boolToggle: any;

  constructor(private themeService: ThemeService,
              private clientiService: ClientiService,
              private fileManager: FileManagerService,
              private router: Router,
              private route: ActivatedRoute,) {}

  ngOnInit(): void {
    this.fileManager.printAppFiles();
    this.fileManager.writeDir();
    this.fileManager.read().then(res=>{
      this.clientiService.setClienti(res);
    });
    Antifurto.askPermissions();
    // console.log(`Home: clienti length ${this.clientiService.getClienti().length}`)
    // this.noScreen();
  }


  start(){
    this.router.navigate(['clienti'], {relativeTo: this.route});
  }

  goTo(){
    this.router.navigate(['pdfView'], {relativeTo: this.route});
  }

  /*async noScreen(){
    await PrivacyScreen.enable();
  }*/


  /*cambiaTema(){
    this.themeService.activeTheme('myTheme');
  }

  darkTema(){
    this.themeService.activeTheme('dark');
  }*/
}
