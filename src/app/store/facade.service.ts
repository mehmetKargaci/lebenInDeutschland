import {inject, Injectable, OnInit} from '@angular/core';
import {SelectorService} from "./selector.service";
import {ReducerService} from "./reducer.service";

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  selectorService = inject(SelectorService);
  reducerService = inject(ReducerService);

}

