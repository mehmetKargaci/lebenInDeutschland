import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FacadeService} from "../../store/facade.service";
import {UtilityService} from "../../core/services/utility.service";
import {NgClass, NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NgxIndexedDBService} from "ngx-indexed-db";

@Component({
  selector: 'app-training-menu',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    NgClass,
  ],
  templateUrl: './training-menu.component.html',
  styleUrl: './training-menu.component.css',

})
export class TrainingMenuComponent implements OnInit {
  facadeService = inject(FacadeService);
  utilityService = inject(UtilityService);
  dbService = inject(NgxIndexedDBService);
  destroyRef = inject(DestroyRef);

  allthemes= this.facadeService.selectorService.themes;
  themes:string[] = [];

  bundeslandID = this.facadeService.selectorService.appStore.bundeslandId.asReadonly();
  selectedTheme = this.facadeService.selectorService.appStore.trainingTheme.asReadonly();

  ngOnInit() {
    this.themes = this.allthemes.slice(0,20);
    this.themes.push(this.selectedBundeslandName());
  }

  selectedThemeQustions (){
    return this.facadeService.selectorService.bookletData.map(question => question.theme === this.selectedTheme())
  }

  selectedBundeslandName = () => {
    return this.utilityService.bundeslandNameService.getBundeslandName(this.bundeslandID());
  }

  onThemeSelect(theme: string) {
    this.facadeService.setTheme(theme);
  }
}
