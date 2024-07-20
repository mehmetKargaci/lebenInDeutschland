import {Injectable, inject, OnInit} from '@angular/core';
import {AppStoreService} from "./app-store.service";

@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  appStore = inject(AppStoreService);
  bookletData = this.appStore.booklet;

  questions = this.bookletData.map((booklet) => booklet.question);
  themes = this.bookletData.map((booklet) => booklet.theme);
  answers = this.bookletData.map((booklet) => booklet.answers);
  id  = this.bookletData.map((booklet) => booklet.id);
  hasPhoto = this.bookletData.map((booklet) => booklet.hasPhoto);
  correctAnswers = this.bookletData.map((booklet) => booklet.correctAnswer);
  correctAnswerIndex = this.bookletData.map((booklet) => booklet.correctAnswerIndex);

  themesUniq = [...new Set(this.themes)];


}


