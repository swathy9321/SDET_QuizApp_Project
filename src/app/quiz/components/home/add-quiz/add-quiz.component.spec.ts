import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddQuizComponent } from './add-quiz.component';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyService } from 'src/app/core/services/notify.service';
import { QuizService } from 'src/app/core/services/quiz.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


describe('AddQuizComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddQuizComponent],
      imports: [
        CoreModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([]),
        CommonModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ]
    })
      .compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(AddQuizComponent)
    const component: AddQuizComponent = fixture.debugElement.componentInstance
    const quizService = fixture.debugElement.injector.get(QuizService)
    const notifyService = fixture.debugElement.injector.get(NotifyService)
    return { fixture, component,notifyService,quizService}
  }

  it('should create', () => {
    const { component } = setup()
    expect(component).toBeTruthy();
  });

  it('should create add quiz form on initial loading', () => {
    const { component } = setup()
    spyOn(component, 'buildAddQuizForm').and.callThrough()
    component.ngOnInit()
    expect(component.buildAddQuizForm).toHaveBeenCalled()
  })

  it('should create a add quiz form on loading the screen ', () => {
    const { component } = setup()
    component.buildAddQuizForm()
    expect(component.addForm).toBeDefined()
  })

  it('should save the question if the form is valid ', () => {
    const { component,quizService,notifyService } = setup()
    component.buildAddQuizForm()
    component.addForm.patchValue({
      question: "What is the question",
      choiceOne: "option 1",
      choiceTwo: "option 2",
      choiceThree: "option 3",
      choiceFour: "option 4",
      answer: "1"
    })
    spyOn(quizService, 'addQuizes').and.callFake(() => {
      return of(true)
    })
    spyOn(notifyService,'show').and.callThrough()
    spyOn(component.addForm,'reset').and.callThrough()
    component.saveQuiz()
    expect(quizService.addQuizes).toHaveBeenCalled()
    expect(notifyService.show).toHaveBeenCalled()
    expect(component.addForm.reset).toHaveBeenCalled()
  })


  it('should save the question if the form is valid ', () => {
    const { component,quizService,notifyService } = setup()
    const mockData = {
      error: {
          errors: "Invalid question",
          status: 422
      },
      status: 422
  }
    component.buildAddQuizForm()
    component.addForm.patchValue({
      question: "What is the question",
      choiceOne: "option 1",
      choiceTwo: "option 2",
      choiceThree: "option 3",
      choiceFour: "option 4",
      answer: "1"
    })
    spyOn(quizService, 'addQuizes').and.callFake(() => {
      return throwError(new HttpErrorResponse(mockData))
  })
    spyOn(notifyService,'show').and.callThrough()
    component.saveQuiz()
    expect(quizService.addQuizes).toHaveBeenCalled()
    expect(notifyService.show).toHaveBeenCalled()
  })
 


  it('should show the message if the form is invalid ', () => {
    const { component,quizService,notifyService } = setup()
    component.buildAddQuizForm()
    component.addForm.patchValue({
      question: null,
      choiceOne: "option 1",
      choiceTwo: null,
      choiceThree: "option 3",
      choiceFour: "option 4",
      answer: "1"
    })
    spyOn(notifyService,'show').and.callThrough()
    component.saveQuiz()
    expect(notifyService.show).toHaveBeenCalled()
  })

})
