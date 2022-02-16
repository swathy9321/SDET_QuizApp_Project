import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { ViewQuizComponent } from './view-quiz/view-quiz.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { PlayQuizComponent } from './play-quiz/play-quiz.component';
import { QuizResultComponent } from './quiz-result/quiz-result.component';
import { CoreModule } from 'src/app/core/core.module';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [HomeComponent, 
    AddQuizComponent, 
    ViewQuizComponent, 
    PlayQuizComponent, 
    QuizResultComponent],
  imports: [
    CoreModule,
    CommonModule,
    HomeRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatSelectModule
  ]
})
export class HomeModule { }
