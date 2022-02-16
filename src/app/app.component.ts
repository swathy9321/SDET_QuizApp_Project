import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { AuthService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'QuizProject';
  loginPage: boolean = false;
  constructor(public router: Router, private authService: AuthService) {

  }
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url == "/") {
          this.loginPage = true;
        }
        else {
          this.loginPage = false;
        }
      }
    });
  }
  get isLogin(){
    console.log("123123");
    
    return this.authService.isLoggedin
  }
}
