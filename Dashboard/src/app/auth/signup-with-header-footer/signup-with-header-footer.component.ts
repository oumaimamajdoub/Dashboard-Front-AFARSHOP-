import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {AuthService} from "../../application/service/auth.service";
@Component({
  selector: 'app-signup-with-header-footer',
  templateUrl: './signup-with-header-footer.component.html',
  styleUrls: ['./signup-with-header-footer.component.scss']
})
export class SignupWithHeaderFooterComponent {
  //public registerForm: UntypedFormGroup;
  form: any ={
    name: null,
    lastName: null,
    username: null,
    email: null,
    password: null,
  };

  constructor( private route: ActivatedRoute, private authService: AuthService, private router: Router) {}
   /* this.createRegisterForm();
  }
  /*createRegisterForm() {
   this.registerForm = this.formBuilder.group({
     userName: [''],
     password: [''],
     confirmPassword: [''],
   });
 }*/


// On Signup link click
  onSignIn() {
    this.router.navigate(['signin-with-header-footer'], { relativeTo: this.route.parent });
  }

  ngOnInit(): void {
  }
  onRegister(): void {
    //const { username, password, firstname, lastName, email, address, dayOfBirth, cin, telNum } = this.form.value;
    this.authService.register(this.form.lastName,this.form.password,this.form.firstname,this.form.email,this.form.username)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/login']);
          // handle successful registration response here
        },
        error => {
          console.error(error);
          // handle registration error here
        }
      );
  }
  reloadPage(): void {
    window.location.reload();
  }
}
