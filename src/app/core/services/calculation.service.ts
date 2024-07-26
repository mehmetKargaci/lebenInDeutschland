import { Injectable } from '@angular/core';
import {Question} from "../question";

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() {
  }

  findCorrectAnswers(questions: Question[], userAnswers: string[]): number {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        correctCount++;
      }
    });
    return correctCount;
  }
}
