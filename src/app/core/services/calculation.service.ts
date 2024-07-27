import {inject, Injectable} from '@angular/core';
import {Question} from "../question";
import {FacadeService} from "../../store/facade.service";

@Injectable({
  providedIn: 'root'
})
export class CalculationService {
  facadeService = inject(FacadeService);
  exam  = this.facadeService.selectorService.exam();



  findCorrectAnswers(exam: {userAnswer: number, question:Question}[]) {
    let correctCount = 0;
    let wrongCount = 0;
    let nullCount = 0;
    exam.forEach((e)=> {
      if (e.userAnswer === null) {
        nullCount++;
      } else if (e.userAnswer === e.question.correctAnswerIndex) {
        correctCount++;
      } else {
        wrongCount++;
      }
      return correctCount;
    });
    }

}

// let correctCount = 0;
// questions.forEach((question, index) => {
//   if (question.correctAnswer === userAnswers[index]) {
//     correctCount++;
//   }
// });
// return correctCount;
