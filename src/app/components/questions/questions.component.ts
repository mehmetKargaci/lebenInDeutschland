import {Component, Inject, inject, OnInit} from '@angular/core';
import {SelectorService} from "../../store/selector.service";
import {FacadeService} from "../../store/facade.service";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit{
  facadeService = inject(FacadeService);


  ngOnInit() {
    console.log(this.facadeService.selectorService.correctAnswerIndex);

  }


}

