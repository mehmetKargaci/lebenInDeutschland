import {Component, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {LocalStorageService} from "../../core/services/local-storage.service";
import {BundeslandNameService} from "../../core/services/bundesland-name.service";
import {BundeslandQuestionsService} from "../../core/services/bundesland-questions.service";
import {BookletModel} from "../../core/booklet-model";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit{
  facadeService = inject(FacadeService);
  localStorage = inject(LocalStorageService);
  bundeslandID = localStorage.getItem('bundeslandID');
  bundeslandNameService= inject(BundeslandNameService);
  bundeslandQuestionService =inject(BundeslandQuestionsService);

  bundeslandName = this.bundeslandNameService.getBundeslandName(this.bundeslandID);
  bundeslandQuestions = this.bundeslandQuestionService.getBundeslandQuestions(this.bundeslandID);
  allgemeineQuestions= this.facadeService.selectorService.commonQuestions();
  allThemes= this.facadeService.selectorService.themes;
  currentThemeIndex: number = 0;



  ngOnInit() {
    console.log(this.allThemes);
  }

  previousThemeSelect() {

  }

  nextThemeSelect() {

  }
}

