import {Inject, Injectable, Renderer2, RendererFactory2} from "@angular/core";
import {DOCUMENT} from "@angular/common";

export class BasicTheme{
  'ion-color-primary' : string = '';
  'ion-color-primary-rgb' : string = '';
  'ion-color-primary-shade': string = '';
  'ion-color-dark' : string ='';
  'ion-background-color' : string = '';
  // 'ion-text-color':string ='';
  'ion-color-primary-contrast' : string = '';
  'ion-color-primary-contrast-rgb' : string = '';
}

@Injectable({
  providedIn: 'root'
})
export class ThemeService{

  public renderer: Renderer2;
  private currentTheme = '';

  constructor(private rendererFactory: RendererFactory2,
              @Inject(DOCUMENT) private document: Document) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  getCurrentTheme(){
    return this.currentTheme;
  }

  activeTheme(theme: string){
    if(this.currentTheme != theme) {
      switch (theme) {
        case 'dark':
          this.renderer.setAttribute(this.document.body, 'data-theme', 'myThemeDark');
          //this.currentTheme = this.currentTheme + '_dark';
          // this.renderer.addClass(this.document.body, 'dark-myTheme');
          console.log(`case dark: ${this.currentTheme}`);
          break;
        default:

          // this.renderer.removeAttribute(this.document.body, 'myTheme', 'dark');
          if(this.currentTheme){
            this.renderer.removeClass(this.document.body, this.currentTheme);
          }
          this.currentTheme = theme;
          console.log(`case default: ${this.currentTheme}`);
          let t = new BasicTheme();
          Object.keys(t).forEach(k =>
            this.document.body.style.removeProperty(`--${k}`)
          );
          this.renderer.addClass(this.document.body, theme);
      }
    }
  }
}
