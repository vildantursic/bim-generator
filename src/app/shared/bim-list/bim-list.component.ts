import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bim-list',
  templateUrl: './bim-list.component.html',
  styleUrls: ['./bim-list.component.css']
})
export class BimListComponent {

  @Input() items = [];
}
