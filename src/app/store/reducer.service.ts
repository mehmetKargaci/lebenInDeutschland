import {inject, Injectable} from '@angular/core';
import {AppStoreService} from "./app-store.service";
import {Question} from "../core/models/question";
import {take} from "rxjs";
import {UserAnswer} from "../core/enums/user-answer";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {booklet} from "./booklet";


@Injectable({
  providedIn: 'root'
})
export class ReducerService {
  appStore = inject(AppStoreService);
  dbService = inject(NgxIndexedDBService);
  readonly booklet = booklet;

  setBundeslandId(bundeslandID: string) {
    this.appStore.bundeslandId.set(bundeslandID);
  }

  setExam(exam: { userAnswer: number, question: Question }[]) {
    this.appStore.test.set(exam);
  }

  updateExam(answer: number, currentQuestionIndex: number) {
    this.appStore.test.update((testElement => {
      return testElement.map((e, index) => ({
        ...e,
        userAnswer: index === currentQuestionIndex ? answer : e.userAnswer
      }))
    }))
  }

  updateBooklet(userAnswer: UserAnswer, currentQuestionIndex: number) {
    this.appStore.booklet.update(questions => {
      return questions.map((question, index) => {
        return {
          ...question,
          userAnswer: index === currentQuestionIndex ? userAnswer : question.userAnswer
        }
      })
    })
  }

  setTheme(theme: string) {
    this.appStore.trainingTheme.set(theme);
  }

  createBooklet() {
    this.dbService.getAll('question-data').pipe(take(1)).subscribe((resultArray: any[]) => {
      if (resultArray.length === 0) {
        this.prepareBooklet(resultArray);
      } else {
        this.setBooklet(resultArray);
      }
    });
  }

  resetBooklet(){
    this.appStore.booklet.update(booklet=> {
      return booklet.map(question => {
        return {
          ...question,
          userAnswer: UserAnswer.Empty
        }
      })
    });
  }

  prepareBooklet(resultArray: any[]) {
    let counter = 0;
    this.booklet.forEach((q: Question, index:number) => {
      this.dbService.add('question-data', {
        questionIndex: index,
        status: UserAnswer.Empty
      }).pipe(take(1)).subscribe((_) => {
        counter++;
      });
    });
    setTimeout(() => this.setBooklet(resultArray), 100);
  }

  private setBooklet(resultArray: any[]) {
    const questions = this.booklet.map((q: Question, index:number) => {
      const element = resultArray.find((e) => e.questionIndex === index);
      return {
        ...q,
        userAnswer: element ? element.status : UserAnswer.Empty
      }
    });
    this.appStore.booklet.set(questions);
  }
}
