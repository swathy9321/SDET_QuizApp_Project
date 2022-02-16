import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastTypes } from 'src/app/config/app.configs';
import { Quizes } from 'src/app/core/models/Quizes';
import { NotifyService } from 'src/app/core/services/notify.service';
import { QuizService } from 'src/app/core/services/quiz.service';


@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent implements OnInit {
  quizId: Array<Quizes> = []
  addForm: FormGroup

  constructor(
    private quizService: QuizService,
    private notifyService: NotifyService,
    private fb: FormBuilder,
  ) {

  }
  ngOnInit() {
    this.buildAddQuizForm()
  }

  buildAddQuizForm() {
    this.addForm = this.fb.group({
      question: ['', Validators.required],
      choiceOne: ['', Validators.required],
      choiceTwo: ['', Validators.required],
      choiceThree: ['', Validators.required],
      choiceFour: ['', Validators.required],
      answer: ['', Validators.required]
    })
  }

  /**
  * To  Add a Quiz
  * 
  */
  saveQuiz() {
    if (this.addForm.valid) {
      // let correctAnswer = this.getAnswer()
      let options = this.getChoices()
      let params = {
        question: this.addForm.value.question,
        choices: options,
        answer:this.addForm.value.answer
      }
      console.log(params);

      this.quizService.addQuizes(params).subscribe(response => {
        this.notifyService.show(ToastTypes.Success, 'Successfully Added Question')
        this.addForm.reset()
      }, (err) => {
        this.notifyService.show(ToastTypes.Error, 'Failed To Add Question')
      })
    }
    else {
      this.notifyService.show(ToastTypes.Warning, 'Enter All the Fields')
    }
  }

  getChoices() {
    let choices = ['choiceOne', 'choiceTwo', 'choiceThree', 'choiceFour']
    let choiceArray = []
    choices.map(choice => {
      choiceArray.push(this.addForm.controls[choice].value)
    })
    return choiceArray

  }
}