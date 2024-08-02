import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FacadeService} from "../../store/facade.service";
import {Question} from "../../core/models/question";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {UserAnswer} from "../../core/enums/user-answer";

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
  selectedTheme = this.facadeService.getTrainingTheme();

  ngOnInit() {
    this.trainingQuestions = this.facadeService.allQuestions().filter(question => question.theme === this.selectedTheme);
    this.answerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(answer => {
      if (answer != null && answer === this.trainingQuestions[this.currentQuestionIndex].correctAnswerIndex) {
        this.correctAnswer = true;
      }
      this.wrongAnswer = true;
    });
  }

  onNextClick() {
    if (this.currentQuestionIndex === this.trainingQuestions.length) return;
    if (this.answerControl.value === this.trainingQuestions[this.currentQuestionIndex].correctAnswerIndex) {
      this.dbService
        .update('question-data', {
          questionIndex: this.currentQuestionIndex,
          status: UserAnswer.Correct
        })
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((storeData) => {
        console.log('correct: ', storeData);
        this.facadeService.updateBooklet(storeData.status, this.currentQuestionIndex);
      });
    } else if(this.answerControl.value != null) {
      this.dbService
        .update('question-data', {
          questionIndex: this.currentQuestionIndex,
          status: UserAnswer.Incorrect
        })
        .pipe(takeUntilDestroyed(this.destroyRef)).subscribe((storeData) => {
        console.log('incorrect: ', storeData);
        this.facadeService.updateBooklet(storeData.status, this.currentQuestionIndex);
      });
    }
    this.currentQuestionIndex++;
    this.answerControl.setValue(null);
  }
}

