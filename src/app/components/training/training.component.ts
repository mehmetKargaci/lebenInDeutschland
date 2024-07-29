import {Component, DestroyRef, inject} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FacadeService} from "../../store/facade.service";
import {UtilityService} from "../../core/services/utility.service";
import {Question} from "../../core/question";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    FormsModule,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent {
  facadeService = inject(FacadeService);
  utilityService = inject(UtilityService);
  destroyRef = inject(DestroyRef);
  commonQuestions: Question[] = [];
  examQuestions: Question[] = [];
  currentQuestionIndex: number = 0;
  answerControl = new FormControl();
  showAnswers: boolean = true;
  bundeslandID = this.facadeService.selectorService.appStore.bundeslandId.asReadonly();

  selectedBundeslandQuestions = () => {
    return this.utilityService.bundeslandQuestionsService.getBundeslandQuestions(this.bundeslandID());
  }


  ngOnInit() {
    this.commonQuestions = this.facadeService.selectorService.commonQuestions();

    this.generateRandomExam();
    this.answerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(answer => {
      if (answer != null) {
        this.facadeService.updateExam(parseInt(answer), this.currentQuestionIndex);
      }
    });
  }

  generateRandomExam() {
    const shuffled = [...this.commonQuestions].sort(() => 0.5 - Math.random());
    this.examQuestions = shuffled.slice(0, 30);
    const bundeslandQuestions = this.selectedBundeslandQuestions();
    const shuffledBundeslandQuestions = [...bundeslandQuestions].sort(() => 0.5 - Math.random()).slice(0,3);
    this.examQuestions = this.examQuestions.concat(shuffledBundeslandQuestions);

    const exam : {userAnswer: number, question:Question}[] = [];
    this.examQuestions.forEach(question => {
      exam.push({userAnswer: -1, question: question});
    });
    this.facadeService.setExam(exam);
  }

  onNextClick() {
    if (this.currentQuestionIndex < this.examQuestions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

}
