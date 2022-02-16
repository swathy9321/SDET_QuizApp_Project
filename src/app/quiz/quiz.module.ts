import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { CoreModule } from '../core/core.module';
import { LoginComponent } from './components/login/login.component';
import { HomeModule } from './components/home/home.module';


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    CoreModule,
    HomeModule
   ]
})
export class QuizModule { }
