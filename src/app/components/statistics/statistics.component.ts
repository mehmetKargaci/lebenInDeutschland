import {Component, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {RouterLink} from "@angular/router";
import {UtilityService} from "../../core/services/utility.service";
import {Question} from "../../core/models/question";
import {NgIf} from "@angular/common";



@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './statistics.component.html',

})
export class StatisticsComponent implements OnInit {
  utilityService = inject(UtilityService);
  facadeService = inject(FacadeService);

  result= false;
  correctCount = 0;
  wrongCount = 0;
  nullCount = 0;

  ngOnInit() {
    this.facadeService.getExam().map((e)=> {
      if(e.userAnswer === -1) {
        this.nullCount++;
      } else if (e.userAnswer === e.question.correctAnswerIndex){
        this.correctCount ++;
        } else {
        this.wrongCount++
        }
      if(this.correctCount >= 17){
        this.result = true;
      }
      });
    }
}
