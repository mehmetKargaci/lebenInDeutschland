import {Injectable, inject, OnInit} from '@angular/core';
import {AppStoreService} from "./app-store.service";

@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  appStore = inject(AppStoreService);
  bookletData = this.appStore.booklet;

  questions = this.bookletData.map((booklet) => booklet.question);
  allthemes = this.bookletData.map((booklet) => booklet.theme);
  id = this.bookletData.map((booklet) => booklet.id);
  themes:string[] = [...new Set(this.allthemes)];
  bundeslandID = this.appStore.bundeslandId.asReadonly();

  commonQuestions = () => {
    return this.appStore.booklet.filter(data => data.id < 301);
  }

}


