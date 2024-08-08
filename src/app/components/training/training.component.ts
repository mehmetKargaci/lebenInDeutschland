import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FacadeService} from "../../store/facade.service";
import {Question} from "../../core/models/question";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {NgxIndexedDBService} from "ngx-indexed-db";
import {UserAnswer} from "../../core/enums/user-answer";
import {take} from "rxjs";

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
  currentQuestion? :Question;
  answerControl = new FormControl();
  selectedTheme = this.facadeService.getTrainingTheme();
  userClicked = false;
  correctAnswer = false;
  wrongAnswer = false;
  trainingQuestionIndex = 0;
  index = 1;

  ngOnInit() {
    this.trainingQuestions = this.facadeService.allQuestions().filter(question =>  {
      return question.theme === this.selectedTheme && question.userAnswer !== UserAnswer.Correct;
    });
    if(this.trainingQuestions.length === 0){
      this.trainingQuestions = this.facadeService.allQuestions().filter(question =>  {
        return question.theme === this.selectedTheme;
      });
    }
    this.currentQuestion = this.trainingQuestions[0];
    this.answerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(answer => {
      if(!this.currentQuestion) return;
      const isCorrect = answer != null && answer === this.currentQuestion.correctAnswerIndex;
      if (!this.userClicked && isCorrect) {
        this.dbService
          .update('question-data', {
            questionIndex: this.currentQuestion.id-1,
            status: UserAnswer.Correct
          })
          .pipe(take(1))
          .subscribe((storeData) => {
            this.facadeService.updateBooklet(storeData.status, this.currentQuestion ? this.currentQuestion.id-1 : -1);
          });
        this.correctAnswer = true;
      } else if (!isCorrect){
        this.dbService
          .update('question-data', {
            questionIndex: this.currentQuestion.id-1,
            status: UserAnswer.Incorrect
          })
          .pipe(take(1))
          .subscribe((storeData) => {
            this.facadeService.updateBooklet(storeData.status, this.currentQuestion ? this.currentQuestion.id-1 : -1);
          });
        this.wrongAnswer = true;
      }
    });
  }

  onNextClick() {
    if (this.currentQuestion) {
      this.trainingQuestionIndex = this.trainingQuestions.indexOf(this.currentQuestion)
      if (this.trainingQuestionIndex +1 === this.trainingQuestions.length) return;
      this.currentQuestion = this.trainingQuestions[this.trainingQuestionIndex+1];
      this.userClicked = false;
      this.index++;
      this.answerControl.setValue(null);
    }

  }

}

