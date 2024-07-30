import {Component, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {UtilityService} from "../../core/services/utility.service";
import {NgClass, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-training-menu',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgClass
  ],
  templateUrl: './training-menu.component.html',
  styleUrl: './training-menu.component.css'
})
export class TrainingMenuComponent implements OnInit {
  facadeService = inject(FacadeService);
  utilityService = inject(UtilityService);
  themeProgress = [
    { name: 'Theme 1', progress: 55 },
    { name: 'Theme 2', progress: 95 },
    { name: 'Theme 3', progress: 30 },
    { name: 'Theme 4', progress: 55 },
    { name: 'Theme 5', progress: 80 },
    { name: 'Theme 6', progress: 30 },
    { name: 'Theme 7', progress: 55 },
    { name: 'Theme 8', progress: 75 },
    { name: 'Theme 9', progress: 30 },
    { name: 'Theme 10', progress: 55 },
    { name: 'Theme 2', progress: 75 },
    { name: 'Theme 3', progress: 30 },
    { name: 'Theme 3', progress: 10 },
    { name: 'Theme 1', progress: 55 },
    { name: 'Theme 2', progress: 75 },
    { name: 'Theme 3', progress: 30 },
    { name: 'Theme 1', progress: 55 },
    { name: 'Theme 2', progress: 15 },
    { name: 'Theme 3', progress: 30 },
    { name: 'Theme 1', progress: 55 },
    { name: 'Theme 2', progress: 75 },
    { name: 'Theme 3', progress: 30 },
  ];

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
