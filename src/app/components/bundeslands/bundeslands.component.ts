import {Component, inject} from '@angular/core';
import { DialogRef, DialogCloseDirective } from '@ngneat/dialog';
import {Data} from "@angular/router";
import {UtilityService} from "../../core/services/utility.service";


@Component({
  selector: 'app-bundeslands',
  standalone: true,
  imports: [DialogCloseDirective],
  templateUrl: './bundeslands.component.html',
  styleUrl: './bundeslands.component.css'
})
export class BundeslandsComponent {
  ref: DialogRef<Data, boolean> = inject(DialogRef);
  utilityService = inject(UtilityService);
  selectedBundesland = '';

  selectBundesland(selectedBundesland: string) {
    this.selectedBundesland = selectedBundesland;
    this.utilityService.setItem('bundeslandID', this.selectedBundesland);
  }
}
