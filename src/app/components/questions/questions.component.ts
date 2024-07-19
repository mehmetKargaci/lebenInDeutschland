import {Component, Inject, inject, OnInit} from '@angular/core';
import {RavDataService} from "../../core/services/rav-data.service";

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit{
  ravDataService = inject(RavDataService);
  themas : string[]=[];


  ngOnInit() {
  }


}

