import {Component, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit{
  facadeService = inject(FacadeService);
  index = 1;

  ngOnInit() {
    this.index = 1;
  }

  onNextClick() {
    if (this.index > 0 && this.index <= 33) {
      this.index++;
    } else {
      this.index = 1;
    }
  }

  onBackClick(){
      if (this.index > 0 && this.index <= 33) {
        this.index--;
      } else {
        this.index = 1;
      }
    }
}
