import {Component, inject} from '@angular/core';
import {DialogCloseDirective, DialogRef} from "@ngneat/dialog";
import {Data} from "@angular/router";
import {UtilityService} from "../../../core/services/utility.service";
import {FacadeService} from "../../../store/facade.service";

@Component({
  selector: 'app-select-bundesland',
  standalone: true,
  imports: [
    DialogCloseDirective
  ],
  templateUrl: './select-bundesland.component.html',
  styleUrl: './select-bundesland.component.css'
})
export class SelectBundeslandComponent {
  ref: DialogRef<Data, boolean> = inject(DialogRef);
  utilityService = inject(UtilityService);
  facadeService = inject(FacadeService);
  selectedBundesland = '';

  selectBundesland(selectedBundesland: string) {
    this.selectedBundesland = selectedBundesland;
    this.utilityService.setItem('bundeslandID', this.selectedBundesland);
    this.facadeService.setBundeslandID(selectedBundesland);
  }
}


