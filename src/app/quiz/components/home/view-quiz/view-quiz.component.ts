import { Component, OnInit } from '@angular/core';
import { ToastTypes } from 'src/app/config/app.configs';
import { Quizes } from 'src/app/core/models/Quizes';
import { NotifyService } from 'src/app/core/services/notify.service';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-view-quiz',
  templateUrl: './view-quiz.component.html',
  styleUrls: ['./view-quiz.component.scss']
})
export class ViewQuizComponent implements OnInit {

  quizes: Array<Quizes> = []
  constructor(private quizService: QuizService, private notifyService: NotifyService) { }

  ngOnInit(): void {
    this.fetchAllQuizess();
  }
  /**
  * To  Fetch all the Quiz
  */
  fetchAllQuizess(){
    this.quizService.fetchAllQuizes()
    .subscribe((res:any) => {
      this.quizes=res;
      console.log(this.quizes);
      
    });
  }
  /**
  * To  Delete a Quiz
  */
  deleteQuiz(id: number){
    this.quizService.deleteQuiz(id)
    .subscribe((res:any)=>{
      this.fetchAllQuizess()
    })
    this.notifyService.show(ToastTypes.Success, 'Quiz Deleted Successfully')
  }
}
