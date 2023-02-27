import {Component, Input, OnInit, ViewChild} from "@angular/core";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";

@Component({
  selector: 'lista-comandi',
  templateUrl: 'lista-comandi.component.html',
  styleUrls: ['lista-comandi.component.scss']
})
export class ListaComandiComponent implements OnInit{
  //@ts-ignore
  //@ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  @Input() comandi = [];

  scrollInterval: any;

  ngOnInit(): void {
   /* this.scrollInterval = setInterval(() =>{
      this.viewPort.scrollToIndex(this.comandi.length-1,'auto')
    })*/
  }
}
