import {Component, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import { BookletModel } from '../../core/booklet-model';
import {FormArray, FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {CalculationService} from "../../core/services/calculation.service";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{
  facadeService = inject(FacadeService);
  calculationService = inject(CalculationService);
  allQuestions: BookletModel[] = [];
  examQuestions: BookletModel[] = [];
  currentQuestionIndex: number = 0;
  userAnswers: string[] = [];
  answerControl= new FormArray([
    new FormControl('', Validators.required),
    new FormControl('', Validators.required),
    new FormControl('', Validators.required),
    new FormControl('', Validators.required),
  ]);
  score: number | null = 0;

  ngOnInit() {
    this.allQuestions = this.facadeService.selectorService.allgemeineQuestions();
    this.generateRandomExam();
    this.initializeUserAnswers();
  }

  initializeUserAnswers() {
    this.userAnswers = new Array(this.examQuestions.length).fill('');
  }

  generateRandomExam() {
    const shuffled = [...this.allQuestions].sort(() => 0.5 - Math.random());
    this.examQuestions = shuffled.slice(0, 33);
  }

  onNextClick() {
    console.log(this.answerControl.value);
    if (this.currentQuestionIndex < this.examQuestions.length - 1) {
      this.currentQuestionIndex++;
      // this.loadAnswer();
    }
  }

  onBackClick(){
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      // this.loadAnswer();
    }
  }

  // saveAnswer() {
  //   if (this.answerControl.value != null) {
  //     this.userAnswers[this.currentQuestionIndex] = this.answerControl.value;
  //   }
  // }
  //
  // loadAnswer() {
  //   this.answerControl.setValue(this.userAnswers[this.currentQuestionIndex]);
  // }

  submitExam() {
    // this.saveAnswer();
    this.score = this.calculationService.findCorrectAnswers(this.examQuestions, this.userAnswers);
    console.log(this.score);
  }
}
