import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import { DialogService, DialogCloseDirective } from '@ngneat/dialog';
import {BundeslandsComponent} from "./components/bundeslands/bundeslands.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BundeslandsComponent, DialogCloseDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private dialog = inject(DialogService);

  ngOnInit() {
    const dialogRef = this.dialog.open(BundeslandsComponent, {})
  }

}
