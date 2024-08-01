import {Component, DestroyRef, inject, input, OnInit, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import { DialogService, DialogCloseDirective } from '@ngneat/dialog';
import {BundeslandsComponent} from "./components/bundeslands/bundeslands.component";
import {UtilityService} from "./core/services/utility.service";
import {FacadeService} from "./store/facade.service";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {booklet} from "./store/booklet";
import {Question} from "./core/question";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {take} from "rxjs";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, BundeslandsComponent, DialogCloseDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  private dialog = inject(DialogService);
  utilityService = inject(UtilityService);
  facadeService = inject(FacadeService);
  dbService = inject(NgxIndexedDBService);

  ngOnInit() {
    const bundeslandID = this.utilityService.localStorageService.getItem('bundeslandID')
    if (!bundeslandID) {
      this.dialog.open(BundeslandsComponent, {})
    } else {
      this.facadeService.setBundeslandID(bundeslandID);
    }

    this.dbService.getAll('question-data').pipe(take(1)).subscribe((resultArray:any[]) => {
      // console.log('results: ', resultArray);
      if (resultArray.length === 0) {
        let counter = 0;
        booklet.forEach((q:Question,index)=> {
          this.dbService.add('question-data',{
            questionIndex:index,
            isCorrect:false
          }).pipe(take(1)).subscribe((_) => {
            counter++ ;
          });
        });
      }
    });
  }
}
