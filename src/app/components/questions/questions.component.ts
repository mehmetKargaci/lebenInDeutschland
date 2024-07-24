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

  allThemes= this.facadeService.selectorService.themes;
  currentThemeIndex: number = 0;
  selectedThemeQuestions = this.facadeService.selectorService.bookletData.filter(data => +data.id < 311 && data.id > 300);



  ngOnInit() {
    console.log(this.allThemes);
  }

  previousThemeSelect() {

  }

  nextThemeSelect() {

  }
}

