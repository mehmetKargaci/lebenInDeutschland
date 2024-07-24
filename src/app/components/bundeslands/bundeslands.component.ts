import {Component, inject} from '@angular/core';
import { DialogRef, DialogCloseDirective } from '@ngneat/dialog';
import {Data} from "@angular/router";
import {FacadeService} from "../../store/facade.service";
import {LocalStorageService} from "../../core/services/local-storage.service";


@Component({
  selector: 'app-bundeslands',
  standalone: true,
  imports: [DialogCloseDirective],
  templateUrl: './bundeslands.component.html',
  styleUrl: './bundeslands.component.css'
})
export class BundeslandsComponent {
  ref: DialogRef<Data, boolean> = inject(DialogRef);
  localStorage = inject(LocalStorageService);
  selectedBundesland = '';

  selectBundesland(selectedBundesland: string) {
    this.selectedBundesland = selectedBundesland;
    this.localStorage.setItem('bundeslandID', this.selectedBundesland);
  }
}
