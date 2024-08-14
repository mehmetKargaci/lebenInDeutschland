import {computed, Injectable, Signal, signal} from '@angular/core';
import {Question} from "../core/models/question";
import { booklet } from './booklet';


@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  questions = booklet;
  booklet = signal<Question[]>(this.questions);
  bundeslandId = signal('0');
  test= signal<{userAnswer: number, question:Question}[]>([]);
  trainingTheme = signal('');


}
