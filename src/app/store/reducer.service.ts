import {inject, Injectable} from '@angular/core';
import {AppStoreService} from "./app-store.service";
import {Question} from "../core/question";

@Injectable({
  providedIn: 'root'
})
export class ReducerService {
  appStore = inject(AppStoreService);

  setBundeslandId(bundeslandID: string) {
    this.appStore.bundeslandId.set(bundeslandID);
  }

  setExam(exam: {userAnswer: number, question:Question}[]){
   this.appStore.test.set(exam);
  }

  updateExam(answer: number , currentQuestionIndex: number) {
    this.appStore.test.update((testElement => {
      return testElement.map((e, index) => ({
        ...e,
        userAnswer: index === currentQuestionIndex ? answer : e.userAnswer
      }))
    }))
  }

  setTheme(theme: string) {
    this.appStore.trainingTheme.set(theme);
  }
}


