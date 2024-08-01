import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FacadeService} from "../../store/facade.service";
import {UtilityService} from "../../core/services/utility.service";
import {Question} from "../../core/question";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {take} from "rxjs";
import {booklet} from "../../store/booklet";

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit {
  facadeService = inject(FacadeService);
  dbService = inject(NgxIndexedDBService);
  destroyRef = inject(DestroyRef);

  trainingQuestions: Question[] = [];
  currentQuestionIndex: number = 0;
  answerControl = new FormControl();
  showAnswers: boolean = true;
  correctAnswer = false;
  wrongAnswer = false;
  selectedTheme = this.facadeService.selectorService.appStore.trainingTheme.asReadonly();

  ngOnInit() {
    this.trainingQuestions = this.facadeService.selectorService.bookletData.filter(question => question.theme === this.selectedTheme());
    this.answerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(answer => {
      if (answer != null && answer === this.trainingQuestions[this.currentQuestionIndex].correctAnswerIndex) {
        this.correctAnswer = true;
      }
        this.wrongAnswer = true;
    });
  }


  onNextClick() {
    if (this.currentQuestionIndex < this.trainingQuestions.length - 1) {
      this.currentQuestionIndex++;
    }

    if (this.answerControl.value != null && this.answerControl.value === this.trainingQuestions[this.currentQuestionIndex].correctAnswerIndex){
      this.dbService
        .update('question-data', {
          questionIndex:this.trainingQuestions[this.currentQuestionIndex].id,
          isCorrect:true
        })
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((storeData) => {
          console.log('storeData: ', storeData);
        });

    }
    this.dbService.getByKey('question-data', this.trainingQuestions[this.currentQuestionIndex].id).pipe(takeUntilDestroyed(this.destroyRef)).subscribe((questionData) => {
      console.log(questionData);
    });
    this.answerControl.setValue(null);
  }
}

