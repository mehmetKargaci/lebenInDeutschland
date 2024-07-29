import {Component, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {NgForOf} from "@angular/common";
import {UtilityService} from "../../core/services/utility.service";

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
  utilityService = inject(UtilityService);

  allthemes= this.facadeService.selectorService.themes;
  themes:string[] = [];
  currentThemeIndex: number = 0;
  selectedThemeQuestions = this.facadeService.selectorService.bookletData;
  showTheme = "Verfassungsprinzipien";
  bundeslandID = this.facadeService.selectorService.appStore.bundeslandId.asReadonly();

  selectedBundeslandQuestions = () => {
    return this.utilityService.bundeslandQuestionsService.getBundeslandQuestions(this.bundeslandID());
  }

  selectedBundeslandName = () => {
    return this.utilityService.bundeslandNameService.getBundeslandName(this.bundeslandID());
  }

  ngOnInit() {
    this.selectedThemeQuestions = this.facadeService.selectorService.bookletData.filter(data => data.theme === "Verfassungsprinzipien");
    this.themes = this.allthemes.slice(0,20);
    this.themes.push(this.selectedBundeslandName());
  }

  onBackTheme(theme: string){
    if (this.currentThemeIndex >= 0) {
      this.currentThemeIndex--;
      this.selectedThemeQuestions = this.facadeService.selectorService.bookletData.filter(data => data.theme === theme && data.id < 301 );
      this.showTheme = theme;
    }
  }

  onNextTheme(theme: string) {
    if (this.currentThemeIndex <= this.themes.length) {
      this.currentThemeIndex++;
      this.selectedThemeQuestions = this.facadeService.selectorService.bookletData.filter(data => data.theme === theme && data.id < 301 );
      if(this.themes[this.themes.length -1] === this.selectedBundeslandName()){
        const bundeslandQuestions = this.selectedBundeslandQuestions();
        this.selectedThemeQuestions = this.selectedThemeQuestions.concat(bundeslandQuestions);
      }
      this.showTheme = theme;
    }
  }
}

