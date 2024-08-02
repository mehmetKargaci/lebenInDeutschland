import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import { Question } from '../../core/models/question';
import { FormControl, ReactiveFormsModule } from "@angular/forms";
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
  destroyRef = inject(DestroyRef);
  commonQuestions: Question[] = [];
  examQuestions: Question[] = [];
  currentQuestionIndex: number = 0;
  answerControl = new FormControl();
  showAnswers: boolean = true;
  bundeslandID = this.facadeService.bundeslandID;

  selectedBundeslandQuestions ()  {
    return this.facadeService.getBundeslandQuestions();
  }


  ngOnInit() {
    this.commonQuestions = this.facadeService.commonQuestions();

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
    this.answerControl.setValue(null);
    if (this.currentQuestionIndex < this.examQuestions.length - 1) {
      this.currentQuestionIndex++;
    }
  }

  onBackClick(){
    this.answerControl.setValue(null);
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
    }
  }

  submitExam() {
    const test = this.facadeService.getExam();
    console.log(test);
  }

}
