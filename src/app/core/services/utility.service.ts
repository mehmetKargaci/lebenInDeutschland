import {inject, Injectable} from '@angular/core';
import {BundeslandNameService} from "./bundesland-name.service";
import {BundeslandQuestionsService} from "./bundesland-questions.service";
import {LocalStorageService} from "./local-storage.service";
import {CalculationService} from "./calculation.service";
import {FacadeService} from "../../store/facade.service";

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  bundeslandNameService= inject(BundeslandNameService);
  bundeslandQuestionsService= inject(BundeslandQuestionsService);


  calculationService = inject(CalculationService);
  localStorageService = inject(LocalStorageService);

  constructor() { }
}
