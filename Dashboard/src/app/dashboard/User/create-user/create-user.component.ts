import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../application/service/auth.service";
import { Router, ActivatedRoute } from "@angular/router";
import {UserService} from "../../../application/service/user.service";

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
userId:any
  form: any ={
  userId:null,
    firstname: null,
    lastName: null,
    username: null,
    email: null,
    password: null,
    address : "",
    dayOfBirth : "2020-02-06",
    cin : "088989",
    telNum: "53574617",
    roles:"ROLE_BUYER",
    image:null,
  };



  constructor( private route: ActivatedRoute, private userService: UserService, private router: Router) {}

  onSignIn() {
    this.router.navigate([''], { relativeTo: this.route.parent });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      this.userId = params['params']['id'];
    })

    if (this.userId && this.userId!==""){

      this.userService.getById(this.userId).then((res)=>{
        this.form.userId=this.userId;
        this.form.firstname=res.data.firstname;
        this.form.lastName=res.data.lastName;
        this.form.username=res.data.username
        this.form.email=res.data.email;

      }).catch(err=>console.log(err));
    }
  }
  onAddUser(): void {


if (this.userId && this.userId!==""){
  this.updateUser();
}else{
  this.addUser();
}


  }
  addUser(){
    const formData = new FormData();
    const f =document.getElementById('fileInput') as HTMLInputElement;
    formData.append("userId", this.userId);
    formData.append("firstname", this.form.firstname);
    formData.append("lastname", this.form.lastname);
    formData.append("email", this.form.email);
    formData.append("username", this.form.username);
    formData.append("password", this.form.password);
    formData.append("address", this.form.address);
    formData.append("dayOfBirth", this.form.dayOfBirth);
    formData.append("cin", this.form.cin);
    formData.append("telNum", this.form.telNum);
    formData.append("roles", this.form.roles);
    formData.append("image", f.files[0]);

    console.log(formData);
    this.userService.addUser(formData).then(()=>{
      this.router.navigate(['/dashboard/human-resources']);
    }).catch(err=>console.log(err))
  }

  updateUser(){
    this.userService.updateUser(this.form).then(()=>{
      this.router.navigate(['/dashboard/human-resources']);
    }).catch(err=>console.log(err))
  }
}
