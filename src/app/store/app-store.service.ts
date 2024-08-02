import {computed, Injectable, Signal, signal} from '@angular/core';
import {Question} from "../core/models/question";

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  booklet = signal<Question[]>([]);
  bundeslandId = signal('0');
  test= signal<{userAnswer: number, question:Question}[]>([]);
  trainingTheme = signal('');


}
