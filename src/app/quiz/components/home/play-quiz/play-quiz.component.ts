import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quizes } from 'src/app/core/models/Quizes';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {

  quizes: Array<Quizes> = []
  question: Array<Quizes> = []
  count: number = 0;
  questionId:number;
  answerId:number;
  buttonDisable: boolean=true;
  quizArrayLength: number
  constructor(private quizService: QuizService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.fetchAllQuizess();
  }
  /**
  * To  Fetch all the Quiz
  */
  fetchAllQuizess() {
    this.quizService.fetchAllQuizes()
      .subscribe((res: any) => {
        this.quizes = res;
        this.question.push(this.quizes[this.count]);
        this.quizArrayLength = this.quizes.length;
        console.log("Quiz",this.quizes);
      });
    
  }

  nextOf(quesId) {
    this.buttonDisable=true;
    this.count = this.count + 1;
    this.quizService.saveAnswer(this.questionId,this.answerId)
        .subscribe((res: any) => {
          console.log(res);
        });
    if (this.count < this.quizArrayLength) {
      console.log("ALength",this.quizArrayLength);
      this.question = [];
      
      this.question.push(this.quizes[this.count]);
      
    }
    else{
      this.router.navigate(['/quiz-result'], {
        relativeTo: this.activatedRoute
      })
    }  
  }
  chooseAnswer(qId,cId){
    this.buttonDisable=false;
    this.questionId=qId;
    this.answerId=cId;
  }
}
