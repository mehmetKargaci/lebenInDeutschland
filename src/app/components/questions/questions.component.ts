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
  selectedThemeQuestions = this.facadeService.selectorService.bookletData;
  showTheme = "Verfassungsprinzipien";


  ngOnInit() {
    this.selectedThemeQuestions = this.facadeService.selectorService.bookletData.filter(data => data.theme === "Verfassungsprinzipien");
  }

  onBackTheme(theme: string){
    if (this.currentThemeIndex >= 0) {
      this.currentThemeIndex--;
      this.selectedThemeQuestions = this.facadeService.selectorService.bookletData.filter(data => data.theme === theme );
      this.showTheme = theme;
    }
  }

  onMiddleTheme(theme: string) {
    this.selectedThemeQuestions = this.facadeService.selectorService.bookletData.filter(data => data.theme === theme );
    this.showTheme = theme;
  }

  onNextTheme(theme: string) {
    if (this.currentThemeIndex < this.allThemes.length - 1) {
      this.currentThemeIndex++;
      this.selectedThemeQuestions = this.facadeService.selectorService.bookletData.filter(data => data.theme === theme );
      this.showTheme = theme;
    }
  }
}

