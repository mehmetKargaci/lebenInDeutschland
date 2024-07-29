import {Component, inject} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FacadeService} from "../../store/facade.service";

@Component({
  selector: 'app-exam-analysis',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './exam-analysis.component.html',
  styleUrl: './exam-analysis.component.css'
})
export class ExamAnalysisComponent {
  facadeService = inject(FacadeService);
  testQuestions = this.facadeService.getExam().map(answered => answered.question);
  userAnswers = this.facadeService.getExam().map(answered => answered.userAnswer);
}
