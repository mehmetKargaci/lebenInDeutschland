import {Component, inject} from '@angular/core';
import {FacadeService} from "../../../store/facade.service";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {UserAnswer} from "../../../core/enums/user-answer";
import {take} from "rxjs";
import {DialogCloseDirective, DialogRef} from "@ngneat/dialog";

@Component({
  selector: 'app-confirmation',
  standalone: true,
  imports: [
    DialogCloseDirective
  ],
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.css'
})
export class ConfirmationComponent {
  facadeService = inject(FacadeService);
  dbService = inject(NgxIndexedDBService);
  diaologRef = inject(DialogRef);


  onReset() {
    const allQuestions = this.facadeService.allQuestions();
    for (const question of allQuestions) {
      this.dbService
        .update('question-data', {
          questionIndex: question.id -1,
          status: UserAnswer.Empty
        })
        .pipe(take(1))
        .subscribe((storeData) => {
          console.log(storeData.status);
        });
    }
    this.facadeService.resetBooklet();
    setTimeout(() => {
      this.diaologRef.close()
    }, 100);
  }

  onSettings() {
    setTimeout(() => {
      this.diaologRef.close()
    }, 100);
  }
}
