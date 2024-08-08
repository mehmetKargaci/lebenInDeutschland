import {inject, Injectable} from '@angular/core';
import {SelectorService} from "./selector.service";
import {ReducerService} from "./reducer.service";
import {Question} from "../core/models/question";
import {UserAnswer} from "../core/enums/user-answer";

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  private selectorService = inject(SelectorService);
  private reducerService = inject(ReducerService);

  bundeslandID = this.selectorService.bundeslandID;
  themes = this.selectorService.themes;
  getBundeslandQuestions = this.selectorService.getBundeslandQuestions;
  bundeslandName = this.selectorService.getBundeslandName;
  allQuestions = this.selectorService.allQuestions;
  commonQuestions = this.selectorService.commonQuestions;


  setBundeslandID(bundeslandID: string) {
    this.reducerService.setBundeslandId(bundeslandID);
  }

  setExam(exam: {userAnswer: number, question:Question}[]) {
    this.reducerService.setExam(exam);
  }
  getExam() {
    return this.selectorService.exam();
  }

  updateExam(answer: number , currentQuestionIndex: number) {
    this.reducerService.updateExam(answer, currentQuestionIndex);
  }

  getTrainingTheme(){
    return this.selectorService.trainingTheme();
  }

  setTheme(theme: string) {
    this.reducerService.setTheme(theme);
  }

  createBooklet() {
    this.reducerService.createBooklet();
  }

  updateBooklet(status: UserAnswer, currentQuestionIndex: number) {
    this.reducerService.updateBooklet(status, currentQuestionIndex);
  }

  resetBooklet() {
    this.reducerService.resetBooklet();
  }
}

