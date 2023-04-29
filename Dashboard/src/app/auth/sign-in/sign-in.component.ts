import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {AuthenticationRequest} from "../../application/Models/authentication-request";
import {User} from "../../application/Models/user";
import {AuthService} from "../../application/service/auth.service";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  currentUser: User = new User();
  isLoggedIn = false;
  isLoginFailed = false;
  form: AuthenticationRequest = {
    email:"",
    password: "",
  };
  constructor(private authService: AuthService,private router: Router, private route: ActivatedRoute) {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
    if (this.authService.isLoggedIn()){
      this.isLoggedIn = true;
    }
  }

  // On Forgotpassword link click
  onForgotpassword() {
    this.router.navigate(['forgot-password'], { relativeTo: this.route.parent });
  }

  // On Signup link click
  onSignup() {
    this.router.navigate(['sign-up'], { relativeTo: this.route.parent });
  }


  ngOnInit(): void {
    this.authService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
    if (this.authService.isLoggedIn()) {
      this.isLoggedIn = true;
    }
    console.log('login page open');
  }

  onSubmit(): void {
    const { email, password } = this.form;
    console.log('clicked login');
    console.log(this.form.email);
    this.authService.login(this.form.email, this.form.password).subscribe({
      next: data => {
        // tslint:disable-next-line:no-shadowed-variable
        this.authService.currentUser.subscribe(data => {
          this.currentUser = data;
          console.log('login done');
        });
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/']);
        /*this.reloadPage();*/
      },
      error: err => {
        this.isLoginFailed = true;
        console.log('err login');
        console.log(err);
      }
    });
  }
}
