import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginComponent } from './login.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services';
import { of, throwError } from 'rxjs';
import { NotifyService } from 'src/app/core/services/notify.service';
import { HomeModule } from '../home/home.module';
import { HttpErrorResponse } from '@angular/common/http';

describe('LoginComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        CoreModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([{ path: 'home', component: HomeModule}]),
        CommonModule,
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ]
    })
      .compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(LoginComponent)
    const component: LoginComponent = fixture.debugElement.componentInstance
    const authService = fixture.debugElement.injector.get(AuthService)
    const notifyService = fixture.debugElement.injector.get(NotifyService)
    return { fixture, component, authService,notifyService }
  }

  it('should create', () => {
    const { component } = setup()
    expect(component).toBeTruthy();
  });

  it('should create login form on initial loading', () => {
    const { component } = setup()
    spyOn(component, 'createLoginForm').and.callThrough()
    component.ngOnInit()
    expect(component.createLoginForm).toHaveBeenCalled()
  })

  it('should trigger login form creation on initial loading', () => {
    const { component } = setup()
    spyOn(component, 'createLoginForm').and.callThrough()
    component.ngOnInit()
    expect(component.createLoginForm).toHaveBeenCalled()
  })

  it('should create a form on loading the screen ', () => {
    const { component } = setup()
    component.createLoginForm()
    expect(component.loginForm).toBeDefined()
  })

  it('should save login form if valid ', () => {
    const { component, authService } = setup()
    const dummyResponse = {
      username: "user",
      password: "user"
    }
    component.createLoginForm()
    component.loginForm.patchValue({
      username: "user",
      password: "user"
    })
    spyOn(authService, 'loginUser').and.callFake(() => {
      return of(dummyResponse)
    })
    spyOn(component, 'setLoginAccess').and.callThrough()
    spyOn(component, 'navigateToHome').and.callThrough()
    component.saveLogin()
    expect(authService.loginUser).toHaveBeenCalled()
    expect(component.setLoginAccess).toHaveBeenCalled()
    expect(component.navigateToHome).toHaveBeenCalled()
  })

  it('should show message if failed to login ', () => {
    const { component, authService,notifyService } = setup()
    const dummyResponse = null
    component.createLoginForm()
    component.loginForm.patchValue({
      username: "user",
      password: "user"
    })
    spyOn(authService, 'loginUser').and.callFake(() => {
      return of(dummyResponse)
    })
    spyOn(notifyService,'show').and.callThrough()
    component.saveLogin()
    expect(authService.loginUser).toHaveBeenCalled()
    expect(notifyService.show).toHaveBeenCalled()
  })

  it('should show message if the login details are not entered ', () => {
    const { component,notifyService } = setup()
    component.createLoginForm()
    component.loginForm.patchValue({
      username: null,
      password: null
    })
    spyOn(notifyService,'show').and.callThrough()
    component.saveLogin()
    expect(notifyService.show).toHaveBeenCalled()
  })

  it('should show message if the login failed', () => {
    const { component,authService,notifyService } = setup()
    const mockData = {
      error: {
          errors: "login Failed",
          status: 422
      },
      status: 422
  }
    component.createLoginForm()
    component.loginForm.patchValue({
      username: "user",
      password: "user"
    })
    spyOn(authService, 'loginUser').and.callFake(() => {
      return throwError(new HttpErrorResponse(mockData))
  })
    spyOn(notifyService,'show').and.callThrough()
    component.saveLogin()
    expect(authService.loginUser).toHaveBeenCalled()
    expect(notifyService.show).toHaveBeenCalled()
  })
 


});
