import {inject, Injectable, OnInit} from '@angular/core';
import {SelectorService} from "./selector.service";
import {ReducerService} from "./reducer.service";
import {Question} from "../core/question";

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  selectorService = inject(SelectorService);
  reducerService = inject(ReducerService);

  setBundeslandID(bundeslandID: string) {
    this.reducerService.setBundeslandId(bundeslandID);
  }

  bundeslandID() {
   return this.selectorService.bundeslandID;
  }

  setExam(exam: {userAnswer: number, question:Question}[]) {
    this.reducerService.setExam(exam);
  }

  updateExam(answer: number , currentQuestionIndex: number) {
    this.reducerService.updateExam(answer, currentQuestionIndex);
  }

  getExam() {
    return this.selectorService.exam();
  }
  getTrainingTheme(){
    return this.selectorService.trainingTheme();
  }

  setTheme(theme: string) {
    this.reducerService.setTheme(theme);

  }
}

