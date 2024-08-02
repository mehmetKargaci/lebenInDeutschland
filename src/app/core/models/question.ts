import {UserAnswer} from "../enums/user-answer";

export class Question {
  question: string ='';
  answers: string[] = [];
  hasPhoto: boolean = false;
  correctAnswerIndex: number = 0;
  theme: string = '';
  id: number = 0;
  correctAnswer: string = '';
  userAnswer?: UserAnswer = 0;
}
