import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'QuizProject';
  homePage: boolean = false;
  constructor(public router: Router) {

  }
  ngOnInit() {
    this.getter();
    if (this.router.url == "/home") {
      this.homePage = true;

    }
    else {
      this.homePage = false;
    }
  }
  getter(){
    console.log();
    
  }
}
