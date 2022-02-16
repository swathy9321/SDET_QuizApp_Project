import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppComponent } from './app.component';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './quiz/components/login/login.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [
        CoreModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([{path:'',component:LoginComponent}]),
        CommonModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    })
      .compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(AppComponent)
    const component: AppComponent = fixture.debugElement.componentInstance
    return { fixture, component }
  }

  it('should create', () => {
    const { component } = setup()
    expect(component).toBeTruthy();
  });

  it('should check for the empty route', () => {
    const { component } = setup()
    component.ngOnInit()
    expect(component.loginPage).toEqual(false)
  })
})
