import { Injectable } from '@angular/core';

export class Question {
    number= '';
    trueAnswer='';
    question='';
    answerA='';
    answerB='';
    answerC='';
    answerD='';
    hasPhoto=false;
}



@Injectable({
  providedIn: 'root'
})

export class CalculationService {

private _questions = [
    {
      number : '1',
      trueAnswer : 'D',
      question : 'In Deutschland dürfen Menschen offen etwas gegen die Regierung sagen, weil…',
      answerA : 'hier Religionsfreiheit gilt.',
      answerB : 'die Menschen Steuern zahlen.',
      answerC : 'die Menschen das Wahlrecht haben.',
      answerD : 'hier Meinungsfreiheit gilt.',
      hasPhoto : false,
    },
    {
      number : '21',
      trueAnswer : 'B',
      question : 'In Deutschland können Eltern bis zum 14. Lebensjahr ihres Kindes entscheiden, ob es in der Schule am …',
      answerA : 'Geschichtsunterricht teilnimmt.',
      answerB : 'Religionsunterricht teilnimmt.',
      answerC : 'Politikunterricht teilnimmt.',
      answerD : 'Sprachunterricht teilnimmt.',
      hasPhoto : true,
    }
    ];
questions= structuredClone(this._questions)



}





