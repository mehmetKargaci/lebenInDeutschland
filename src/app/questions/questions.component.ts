import { Component, inject } from '@angular/core';
import {CalculationService} from "../services/calculation.service";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent {

  calculationService = inject(CalculationService);


}
