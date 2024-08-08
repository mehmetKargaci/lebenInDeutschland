import {Component, inject} from '@angular/core';
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import { DialogService, DialogCloseDirective } from '@ngneat/dialog';
import {ConfirmationComponent} from "./confirmation/confirmation.component";
import {SelectBundeslandComponent} from "./select-bundesland/select-bundesland.component";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  private dialog = inject(DialogService);

  onResetPopup() {
    this.dialog.open(ConfirmationComponent, {});
  }

  onWecseln() {
    this.dialog.open(SelectBundeslandComponent, {});
  }
}
