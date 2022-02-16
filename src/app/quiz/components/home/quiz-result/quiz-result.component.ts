import { Component, OnInit } from '@angular/core';
import { Quizes } from 'src/app/core/models/Quizes';
import { AuthService } from 'src/app/core/services';
import { QuizService } from 'src/app/core/services/quiz.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {

  answerCount:number=0
  questionCount:number=0
  quizes: Array<Quizes> = []
  resultArray: Array<any>=[]
  constructor(private quizService: QuizService,private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchAllQuizess(); 
  }
  get isLogged(){
    return this.authService.isLoggedin
  } 
  /**
  * To  Fetch all the Quiz
  */
  fetchAllQuizess(){
    this.quizService.fetchAllQuizes()
    .subscribe((res:any) => {
      this.quizes=res;
      this.quizService.getResult()
    .subscribe((res:any)=>{
      this.resultArray=res;
      console.log("Result1",this.resultArray);
      
      console.log("Result",this.quizes);
      this.quizes.forEach(element=>{

        this.resultArray.forEach(ele=>{
          if(element.id==ele.qstId){
            element.selectedId=ele.answerId;
            if(element.answer==ele.answerId ){
              element.result=true;
            }else{
              element.result=false;
            }
          }         
        })
      })
      console.log("Ans",this.quizes);

      this.questionCount=this.quizes.length;
      this.getAnswerCount()
    })
    });
  }

  getAnswerCount(){
    this.quizes.forEach(element=>{
      if(element.result)
      this.answerCount++;

    })
    console.log("Count",this.answerCount);
  }
}
