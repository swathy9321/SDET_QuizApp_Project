import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http: HttpClient) { }

  fetchAllQuizes(){
    return this.http.get(environment.basePath);
  }

  addQuizes(course: any){
    return this.http.post( environment.basePath, course)
  }

  deleteQuiz(id: number){
    return this.http.delete( environment.basePath + id)
  }
  
  updateQuiz(id: string|null, course: any){
    return this.http.patch( environment.basePath + id, course)
  }

  saveAnswer(questionId: number,answerId){
    let reqbody ={
      id: questionId,
      answer: answerId
      }
    return this.http.post(environment.basePath+"save",reqbody)
  }
  getResult(){
    return this.http.get(environment.basePath+"fetchAll");
  }
}
