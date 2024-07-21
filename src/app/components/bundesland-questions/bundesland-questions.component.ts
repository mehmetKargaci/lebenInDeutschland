import {Component, inject} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {LocalStorageService} from "../../core/services/local-storage.service";
import {BundeslandNameService} from "../../core/services/bundesland-name.service";
import {BundeslandQuestionsService} from "../../core/services/bundesland-questions.service";
import {BookletModel} from "../../core/booklet-model";

@Component({
  selector: 'app-bundesland-questions',
  standalone: true,
  imports: [],
  templateUrl: './bundesland-questions.component.html',
  styleUrl: './bundesland-questions.component.css'
})
export class BundeslandQuestionsComponent {
  facadeService = inject(FacadeService);
  localStorage = inject(LocalStorageService);
  bundeslandID = localStorage.getItem('bundeslandID');
  bundeslandNameService= inject(BundeslandNameService);
  bundeslandQuestionService =inject(BundeslandQuestionsService);

  bundeslandName = this.bundeslandNameService.getBundeslandName(this.bundeslandID);
  bundeslandQuestions = this.bundeslandQuestionService.getBundeslandQuestions(this.bundeslandID);
  questions: BookletModel[] | undefined = [];

}
