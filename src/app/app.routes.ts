import { Routes } from '@angular/router';
import {LandingComponent} from "./landing/landing.component";
import {QuestionsComponent} from "./questions/questions.component";
import {BundeslandsComponent} from "./bundeslands/bundeslands.component";
import {TestComponent} from "./test/test.component";

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


];
