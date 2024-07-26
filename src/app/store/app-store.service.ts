import {Injectable, signal} from '@angular/core';
import {booklet} from "./booklet";
import {Question} from "../core/question";

@Injectable({
  providedIn: 'root'
})
export class AppStoreService {
  readonly booklet = booklet;
  bundeslandId = signal('');
  test= signal<{userAnswer: number, question:Question}[]>([]);
}
