import { Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {QuestionsComponent} from "./components/questions/questions.component";
import {BundeslandsComponent} from "./components/bundeslands/bundeslands.component";
import {TestComponent} from "./components/test/test.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {ExamAnalysisComponent} from "./components/exam-analysis/exam-analysis.component";
import {TrainingComponent} from "./components/training/training.component";
import {TrainingMenuComponent} from "./components/training-menu/training-menu.component";
import {SettingsComponent} from "./components/settings/settings.component";

export const routes: Routes = [
  {
    path: "",
    component: LandingComponent,
  },
  {
    path: "questions",
    component: QuestionsComponent,
  },
  {
    path: "bundeslands",
    component: BundeslandsComponent,
  },
  {
    path: "test",
    component: TestComponent,
  },
  {
    path: "training",
    component: TrainingComponent,
  },
  {
    path: "training-menu",
    component: TrainingMenuComponent,
  },
  {
    path: "settings",
    component: SettingsComponent,
  },
  {
    path: "exam-analysis",
    component: ExamAnalysisComponent,
  },
  {
    path: "statistics",
    component: StatisticsComponent,
  },


];
