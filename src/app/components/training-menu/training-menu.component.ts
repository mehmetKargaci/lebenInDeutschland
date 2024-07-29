import {Component, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {UtilityService} from "../../core/services/utility.service";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-training-menu',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink
  ],
  templateUrl: './training-menu.component.html',
  styleUrl: './training-menu.component.css'
})
export class TrainingMenuComponent implements OnInit {
  facadeService = inject(FacadeService);
  utilityService = inject(UtilityService);

  allthemes= this.facadeService.selectorService.themes;
  themes:string[] = [];
  currentThemeIndex: number = 0;


  bundeslandID = this.facadeService.selectorService.appStore.bundeslandId.asReadonly();

  selectedBundeslandQuestions = () => {
    return this.utilityService.bundeslandQuestionsService.getBundeslandQuestions(this.bundeslandID());
  }

  selectedBundeslandName = () => {
    return this.utilityService.bundeslandNameService.getBundeslandName(this.bundeslandID());
  }

  ngOnInit() {
    this.themes = this.allthemes.slice(0,20);
    this.themes.push(this.selectedBundeslandName());
  }


  onThemeSelect(theme: string) {

  }
}
