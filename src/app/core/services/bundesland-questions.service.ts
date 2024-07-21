import {inject, Injectable} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {BookletModel} from "../booklet-model";

@Injectable({
  providedIn: 'root'
})
export class BundeslandQuestionsService {
  facadeService = inject(FacadeService);

  getBundeslandQuestions(bundeslandID:string | null):BookletModel[] {
    switch (bundeslandID) {
      case '1'://bandenwurtemberg
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 311 && data.id > 300);
      case '2'://bayern
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 321 && data.id > 310);
      case '3'://berlin
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 331 && data.id > 320);
      case '4'://brandenburg
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 341 && data.id > 330);
      case '5'://bremen
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 351 && data.id > 340);
      case '6'://hamburg
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 361 && data.id > 350);
      case '7'://hessen
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 371 && data.id > 360);
      case '8'://mecklenburg
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 381 && data.id > 370);
      case '9'://niedersachsen
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 391 && data.id > 380);
      case '10'://NRW
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 401 && data.id > 390);
      case '11'://rheinland
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 411 && data.id > 400);
      case '12'://saarland
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 421 && data.id > 410);
      case '13'://sachsenan
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 431 && data.id > 420);
      case '14'://sachsenanhalt
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 441 && data.id > 430);
      case '15'://schleiswig
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 451 && data.id > 440);
      case '16'://thuringen
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 461 && data.id > 450);
      default:
        return this.facadeService.selectorService.bookletData.filter(data => +data.id < 311 && data.id > 300);
    }
  }
}
