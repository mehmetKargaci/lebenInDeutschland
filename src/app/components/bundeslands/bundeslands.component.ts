import {Component, inject} from '@angular/core';
import { DialogService, DialogRef, DialogCloseDirective } from '@ngneat/dialog';
import {Data} from "@angular/router";


@Component({
  selector: 'app-bundeslands',
  standalone: true,
  imports: [DialogCloseDirective],
  templateUrl: './bundeslands.component.html',
  styleUrl: './bundeslands.component.css'
})
export class BundeslandsComponent {
  ref: DialogRef<Data, boolean> = inject(DialogRef);


  onClick() {


  }


}
