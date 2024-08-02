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

  allthemes= this.facadeService.allQuestions().filter(data => data.theme);
  themes = this.facadeService.themes();
  themes2:string[] = [];
  currentThemeIndex: number = 0;
  selectedThemeQuestions = this.allthemes.filter(data => data.theme);
  showTheme = "Verfassungsprinzipien";
  bundeslandID = this.facadeService.bundeslandID;

  ngOnInit() {
    console.log(this.themes[this.currentThemeIndex]);
    this.selectedThemeQuestions = this.allthemes.filter(data => data.theme === "Verfassungsprinzipien");
    // this.themes = this.themes.push(this.allthemes.slice(0,20));
    // this.themes.push(this.selectedBundeslandName());
  }
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
      this.showTheme = theme;
    }
  }

  onNextTheme(theme: string) {
    if (this.currentThemeIndex <= this.themes.length) {
      this.currentThemeIndex++;
      this.selectedThemeQuestions = this.allthemes.filter(data => data.theme === theme && data.id < 301 );
      if(this.themes[this.themes.length -1] === this.selectedBundeslandName()){
        const bundeslandQuestions = this.selectedBundeslandQuestions();
        this.selectedThemeQuestions = this.selectedThemeQuestions.concat(bundeslandQuestions);
      }
      this.showTheme = theme;
    }
  }
}

