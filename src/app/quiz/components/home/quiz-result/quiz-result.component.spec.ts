import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { QuizResultComponent } from './quiz-result.component';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyService } from 'src/app/core/services/notify.service';
import { QuizService } from 'src/app/core/services/quiz.service';
import { of} from 'rxjs';


describe('QuizResultComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuizResultComponent],
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
    const fixture = TestBed.createComponent(QuizResultComponent)
    const component: QuizResultComponent = fixture.debugElement.componentInstance
    const quizService = fixture.debugElement.injector.get(QuizService)
    const notifyService = fixture.debugElement.injector.get(NotifyService)
    return { fixture, component, notifyService, quizService }
  }

  it('should create', () => {
    const { component } = setup()
    expect(component).toBeTruthy();
  })

  

});
