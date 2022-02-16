import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastTypes } from 'src/app/config/app.configs';
import { AuthService } from 'src/app/core/services';
import { NotifyService } from 'src/app/core/services/notify.service';
import { SessionStorageService } from 'src/app/core/services/session-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  isLoginSuccess: boolean
  isLoginValid: boolean

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private sessionStorage: SessionStorageService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private notifyService: NotifyService
  ) { }


  ngOnInit(): void {
    this.createLoginForm()
  }
  /**
   * To  create the login form
   */
  createLoginForm(): void {
    console.log("Getter2",this.getter());

    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })

  }

  /**
   * To login to the application
   */
  saveLogin(): void {
    this.loginForm.markAllAsTouched()
    this.isLoginValid = true
    if (this.loginForm.valid) {
      this.authService.loginUser(this.loginForm.value).subscribe(res => {
        if (res) {
          this.setLoginAccess(res)
          this.navigateToHome()
        }
        else {
          this.notifyService.show(ToastTypes.Error, 'Invalid Credentials')
        }

      }, () => { this.notifyService.show(ToastTypes.Error, 'Login Failed') })
    }
    else {
      this.notifyService.show(ToastTypes.Error, 'Enter Credentials')
    }
  }

  /**
   * To set the session storage for login
   * @param loginResponse 
   */
  setLoginAccess(loginResponse: any): void {
    this.sessionStorage.set('accessToken', loginResponse.token)
  }

  /**
   * To direct to home page
   */
  navigateToHome(): void {
    this.getter();
    let swathy=this.getter();
    console.log("Getter1",this.getter());
    console.log("123",swathy);
    
    this.router.navigate(['home'], { relativeTo: this.activatedRoute })
  }
  getter(){
    return this.authService.isLoggedin
  }
  

}
