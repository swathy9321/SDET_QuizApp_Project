import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ViewQuizComponent } from './view-quiz.component';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyService } from 'src/app/core/services/notify.service';
import { QuizService } from 'src/app/core/services/quiz.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


describe('ViewQuizComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewQuizComponent],
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
    const fixture = TestBed.createComponent(ViewQuizComponent)
    const component: ViewQuizComponent = fixture.debugElement.componentInstance
    const quizService = fixture.debugElement.injector.get(QuizService)
    const notifyService = fixture.debugElement.injector.get(NotifyService)
    return { fixture, component,notifyService,quizService}
  }

  it('should create', () => {
    const { component } = setup()
    expect(component).toBeTruthy();
  });

  it('should get all quizes on initial loading', () => {
    const { component } = setup()
    spyOn(component, 'fetchAllQuizess').and.callThrough()
    component.ngOnInit()
    expect(component.fetchAllQuizess).toHaveBeenCalled()
  })

  it('should get all quizes on initial loading', () => {
    const { component,quizService } = setup()
    const dummyData =[{
      id: 1, 
      question: "String", 
      choices:["choice1","choice2"],
      answer:1,
      selectedId: 1,
      result:true
    }]
    spyOn(quizService, 'fetchAllQuizes').and.callFake(() => {
      return of(dummyData)
    })
    component.fetchAllQuizess()
    expect(quizService.fetchAllQuizes).toHaveBeenCalled()
  })

  it('should delete the question on delete button click', () => {
    const { component,quizService,notifyService } = setup()
    spyOn(quizService, 'deleteQuiz').and.callFake(() => {
      return of(true)
    })
    spyOn(component, 'fetchAllQuizess').and.callThrough()
    spyOn(notifyService, 'show').and.callThrough() 
    component.deleteQuiz(2)
    expect(quizService.deleteQuiz).toHaveBeenCalled()
    expect(notifyService.show).toHaveBeenCalled()
    expect(component.fetchAllQuizess).toHaveBeenCalled()
  })

})