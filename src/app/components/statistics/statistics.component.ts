import {Component, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {RouterLink} from "@angular/router";
import {UtilityService} from "../../core/services/utility.service";
import {Question} from "../../core/question";



@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css'
})
export class StatisticsComponent implements OnInit {
  utilityService = inject(UtilityService);
  facadeService = inject(FacadeService);

  correctCount = 0;
  wrongCount = 0;
  nullCount = 0;

  ngOnInit() {
    this.facadeService.selectorService.exam().map((e)=> {
      if(e.userAnswer === -1) {
        this.nullCount++;
      } else if (e.userAnswer === e.question.correctAnswerIndex){
        this.correctCount ++;
        } else {
        this.wrongCount++
        }
      })
    }

}
