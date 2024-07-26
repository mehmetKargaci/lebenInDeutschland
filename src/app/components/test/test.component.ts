import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import { Question } from '../../core/question';
import { FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {UtilityService} from "../../core/services/utility.service";
import {NgForOf} from "@angular/common";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf,
    RouterLink
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{
  facadeService = inject(FacadeService);
  utilityService = inject(UtilityService);
  destroyRef = inject(DestroyRef);
  allQuestions: Question[] = [];
  examQuestions: Question[] = [];
  currentQuestionIndex: number = 0;
  userAnswers: number[] = [];
  answerControl = new FormControl();
  score: number | null = 0;
  showAnswers: boolean = true;


  ngOnInit() {
    this.allQuestions = this.facadeService.selectorService.commonQuestions();
    this.generateRandomExam();
    this.initializeUserAnswers();
    this.answerControl.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(answer => {
      if (answer != null) {
        this.facadeService.updateExam(parseInt(answer), this.currentQuestionIndex);
      }
      console.log(answer, this.currentQuestionIndex);

    })
    // console.log(this.answerControl.value);
  }

  initializeUserAnswers() {
    this.userAnswers = new Array(this.examQuestions.length).fill('');
  }

  generateRandomExam() {
    const shuffled = [...this.allQuestions].sort(() => 0.5 - Math.random());
    this.examQuestions = shuffled.slice(0, 33);
    const exam : {userAnswer: number, question:Question}[] = [];
    this.examQuestions.forEach(question => {
      exam.push({userAnswer: -1, question: question});
    })
    this.facadeService.setExam(exam);
  }

  onNextClick() {
    if (this.currentQuestionIndex < this.examQuestions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  onBackClick(){
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitExam() {
    const test = this.facadeService.getExam();
    console.log(test());
  }
}
