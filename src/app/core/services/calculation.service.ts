import { Injectable } from '@angular/core';
import {BookletModel} from "../booklet-model";

@Injectable({
  providedIn: 'root'
})
export class CalculationService {

  constructor() {
  }

  findCorrectAnswers(questions: BookletModel[], userAnswers: string[]): number {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (question.correctAnswer === userAnswers[index]) {
        correctCount++;
      }
    });
    return correctCount;
  }
}
