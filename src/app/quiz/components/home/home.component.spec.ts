import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from 'src/app/core/core.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { ToastrModule } from 'ngx-toastr';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';


describe('HomeComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        CoreModule,
        RouterTestingModule,
        RouterTestingModule.withRoutes([{path:'home',component:HomeComponent}]),
        CommonModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        ToastrModule.forRoot()
      ]
    })
      .compileComponents();
  });

  function setup() {
    const fixture = TestBed.createComponent(HomeComponent)
    const component: HomeComponent = fixture.debugElement.componentInstance
    return { fixture, component}
  }

  it('should create', () => {
    const { component } = setup()
    expect(component).toBeTruthy();
  });

  it('should check for the home route', () => {
    const { component } = setup()
    component.ngOnInit()
    expect(component.homePage).toEqual(false)
  })
  
})