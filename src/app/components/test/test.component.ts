import {Component, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import { BookletModel } from '../../core/booklet-model';
import { FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {UtilityService} from "../../core/services/utility.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgForOf
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{
  facadeService = inject(FacadeService);
  utilityService = inject(UtilityService);
  allQuestions: BookletModel[] = [];
  examQuestions: BookletModel[] = [];
  currentQuestionIndex: number = 0;
  userAnswers: string[] = [];
  answerControl = new FormControl();
  score: number | null = 0;
  showAnswers: boolean = true;

  ngOnInit() {
    this.allQuestions = this.facadeService.selectorService.commonQuestions();
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
    }
  }

  onBackClick(){
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitExam() {
    this.score = this.utilityService.calculationService.findCorrectAnswers(this.examQuestions, this.userAnswers);
    console.log(this.score);
  }
}
