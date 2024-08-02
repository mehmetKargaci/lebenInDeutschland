import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import { DialogService, DialogCloseDirective } from '@ngneat/dialog';
import {BundeslandsComponent} from "./components/bundeslands/bundeslands.component";
import {UtilityService} from "./core/services/utility.service";
import {FacadeService} from "./store/facade.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BundeslandsComponent, DialogCloseDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private dialog = inject(DialogService);
  private utilityService = inject(UtilityService);
  private facadeService = inject(FacadeService);

  ngOnInit() {
    const bundeslandID = this.utilityService.getItem('bundeslandID')
    if (!bundeslandID) {
      this.dialog.open(BundeslandsComponent, {})
    } else {
      this.facadeService.setBundeslandID(bundeslandID);
    }

    this.facadeService.createBooklet();
  }
}
