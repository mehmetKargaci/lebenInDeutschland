import {Component, computed, inject, OnInit} from '@angular/core';
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
export class QuestionsComponent {
  facadeService = inject(FacadeService);

  initialTheme = "Verfassungsprinzipien";
  allthemes= this.facadeService.allQuestions().filter(data => data.theme || this.initialTheme);
  themes = this.facadeService.themes();
  currentThemeIndex: number = 0;
  selectedThemeQuestions = this.allthemes.filter(data => data.theme || this.initialTheme);
  bundeslandID = this.facadeService.bundeslandID;

  selectedBundeslandQuestions = () => {
    return this.facadeService.getBundeslandQuestions();
  }


  selectedBundeslandName = () => {
    return this.facadeService.bundeslandName();
  }

  onBackTheme(theme: string){
    if (this.currentThemeIndex >= 0) {
      this.currentThemeIndex--;
      this.selectedThemeQuestions = this.allthemes.filter(data => data.theme === theme && data.id < 301 );
      this.initialTheme = theme;
    }
  }

  onNextTheme(theme: string) {
    if (this.currentThemeIndex <= this.themes.length) {
      this.currentThemeIndex++;
      this.selectedThemeQuestions = this.allthemes.filter(data => data.theme === theme && data.id < 301 );
      if(this.themes[this.themes.length -1] === this.selectedBundeslandName()){
        const bundeslandQuestions = this.selectedBundeslandQuestions;
        // this.selectedThemeQuestions = this.selectedThemeQuestions.concat(bundeslandQuestions());
      }
      this.initialTheme = theme;
    }
  }
}

