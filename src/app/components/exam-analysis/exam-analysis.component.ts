import {Component, inject, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {FacadeService} from "../../store/facade.service";

@Component({
  selector: 'app-exam-analysis',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './exam-analysis.component.html',
  styleUrl: './exam-analysis.component.css'
})
export class ExamAnalysisComponent implements OnInit{
  facadeService = inject(FacadeService);

  allThemes= this.facadeService.selectorService.themes;

  currentThemeIndex: number = 0;
  selectedThemeQuestions = this.facadeService.selectorService.bookletData;
  showTheme = "Verfassungsprinzipien";


  ngOnInit() {
    this.selectedThemeQuestions = this.facadeService.selectorService.bookletData.filter(data => data.theme === "Verfassungsprinzipien");
  }

}
