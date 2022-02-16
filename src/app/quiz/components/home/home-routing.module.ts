import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { HomeComponent } from './home.component';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      { path: 'add', component: AddQuizComponent },
      { path:'view', component: ViewQuizComponent},
      { path: 'play-quiz', component: PlayQuizComponent},
      { path: 'quiz-result', component: QuizResultComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
