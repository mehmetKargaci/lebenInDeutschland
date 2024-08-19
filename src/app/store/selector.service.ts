import {Injectable, inject, computed, Signal} from '@angular/core';
import {AppStoreService} from "./app-store.service";
import {Question} from "../core/models/question";


@Injectable({
  providedIn: 'root'
})
export class SelectorService {
  appStore = inject(AppStoreService);

  questions = this.appStore.booklet().map((booklet) => booklet.question);
  themes = computed(()=>{
    const themes = this.commonQuestions().map((booklet) => booklet.theme);
    return [...new Set([...themes]),this.getBundeslandName()]
  })

  bundeslandID = this.appStore.bundeslandId.asReadonly();
  exam = this.appStore.test.asReadonly();

  commonQuestions = computed(()=>{
    return this.appStore.booklet().filter(q => q.id < 301);
  })


  allQuestions:Signal<Question[]> = computed(()=> {
    return this.appStore.booklet().filter(q => q.id < 461);
  })

  trainingTheme() {
    return this.appStore.trainingTheme();
  }

  getBundeslandQuestions():Question[] {
    const bundeslandID = this.bundeslandID();
    switch (bundeslandID) {
      case '1'://bandenwurtemberg
        return this.allQuestions().filter(data => +data.id < 311 && data.id > 300);
      case '2'://bayern
        return this.allQuestions().filter(data => +data.id < 321 && data.id > 310);
      case '3'://berlin
        return this.allQuestions().filter(data => +data.id < 331 && data.id > 320);
      case '4'://brandenburg
        return this.allQuestions().filter(data => +data.id < 341 && data.id > 330);
      case '5'://bremen
        return this.allQuestions().filter(data => +data.id < 351 && data.id > 340);
      case '6'://hamburg
        return this.allQuestions().filter(data => +data.id < 361 && data.id > 350);
      case '7'://hessen
        return this.allQuestions().filter(data => +data.id < 371 && data.id > 360);
      case '8'://mecklenburg
        return this.allQuestions().filter(data => +data.id < 381 && data.id > 370);
      case '9'://niedersachsen
        return this.allQuestions().filter(data => +data.id < 391 && data.id > 380);
      case '10'://NRW
        return this.allQuestions().filter(data => +data.id < 401 && data.id > 390);
      case '11'://rheinland
        return this.allQuestions().filter(data => +data.id < 411 && data.id > 400);
      case '12'://saarland
        return this.allQuestions().filter(data => +data.id < 421 && data.id > 410);
      case '13'://sachsenan
        return this.allQuestions().filter(data => +data.id < 431 && data.id > 420);
      case '14'://sachsenanhalt
        return this.allQuestions().filter(data => +data.id < 441 && data.id > 430);
      case '15'://schleiswig
        return this.allQuestions().filter(data => +data.id < 451 && data.id > 440);
      case '16'://thuringen
        return this.allQuestions().filter(data => +data.id < 461 && data.id > 450);
      default:
        return this.allQuestions().filter(data => +data.id < 311 && data.id > 300);
    }
  }

  getBundeslandName() {
    const bundeslandID = this.bundeslandID();
    switch (bundeslandID) {
      case '1':
        return 'Baden-Württemberg';
      case '2':
        return 'Bayern';
      case '3':
        return 'Berlin';
      case '4':
        return 'Brandenburg';
      case '5':
        return 'Bremen';
      case '6':
        return 'Hamburg';
      case '7':
        return 'Hessen';
      case '8':
        return ' Mecklenburg-Vorpommern';
      case '9':
        return 'Niedersachsen';
      case '10':
        return 'Nordrhein-Westfalen';
      case '11':
        return 'Rheinland-Pfalz';
      case '12':
        return 'Saarland';
      case '13':
        return 'Sachsen';
      case '14':
        return 'Sachsen-Anhalt';
      case '15':
        return 'Schleswig-Holstein';
      case '16':
        return 'Thüringen';
      default:
        return 'Baden-Württemberg';
    }
  }
}



