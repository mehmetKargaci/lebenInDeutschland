import { Routes } from '@angular/router';
import {LandingComponent} from "./components/landing/landing.component";
import {QuestionsComponent} from "./components/questions/questions.component";
import {BundeslandsComponent} from "./components/bundeslands/bundeslands.component";
import {TestComponent} from "./components/test/test.component";
import {StatisticsComponent} from "./components/statistics/statistics.component";
import {ExamAnalysisComponent} from "./components/exam-analysis/exam-analysis.component";
import {BundeslandQuestionsComponent} from "./components/bundesland-questions/bundesland-questions.component";

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
    path: "bundesland-questions",
    component: BundeslandQuestionsComponent,
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
    path: "exam-amalysis",
    component: ExamAnalysisComponent,
  },
  {
    path: "statistics",
    component: StatisticsComponent,
  },


];
