import {Component, computed, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {NgClass, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {UserAnswer} from "../../core/enums/user-answer";
import { BaseChartDirective } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {ProgressbarModule} from "ngx-bootstrap/progressbar";



@Component({
  selector: 'app-training-menu',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgClass,
    NgxChartsModule,
    BaseChartDirective,
    ProgressbarModule
  ],
  templateUrl: './training-menu.component.html',
  styleUrl: './training-menu.component.css',

})
export class TrainingMenuComponent {
  facadeService = inject(FacadeService);
  bundeslandID = this.facadeService.bundeslandID();


  statistics = computed(() => {
    const stats: { themeName: string, empty: number, correct: number, incorrect: number, total:number } [] = [];
    const themes = this.facadeService.themes();
    const allQuestions = this.facadeService.allQuestions();
    for (const themeName of themes) {
      const stat = { themeName: themeName, empty: 0, correct: 0, incorrect: 0, total: 0 }
      allQuestions
        .filter(question => question.theme === themeName)
        .forEach(question => {
          if(question.userAnswer === UserAnswer.Correct){
            stat.correct++;
          } else if(question.userAnswer === UserAnswer.Incorrect){
            stat.incorrect++;
          } else {
            stat.empty++;
          }
        })
      stat.total = stat.empty + stat.incorrect + stat.correct;
      stats.push(stat)
    }
    return stats;
  });

  onThemeSelect(theme: string) {
    this.facadeService.setTheme(theme);
  }

}
