import {Component, Input} from "@angular/core";

@Component({
    selector: 'headers',
    templateUrl: './headers.component.html',
    styleUrls: ['./headers.component.scss']
})
export class HeadersComponent{
  @Input() color = 'primary';

}
