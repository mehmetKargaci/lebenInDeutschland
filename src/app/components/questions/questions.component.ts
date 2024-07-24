import {Component, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [
    NgForOf
  ],
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
  onNextTheme() {
    if (this.currentThemeIndex < this.allThemes.length - 1) {
      this.currentThemeIndex++;
      // this.loadAnswer();
    }
  }

  onBackTheme(){
    if (this.currentThemeIndex > 0) {
      this.currentThemeIndex--;
      // this.loadAnswer();
    }
  }
}

