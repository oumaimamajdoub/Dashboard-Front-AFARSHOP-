import { Component, OnInit } from '@angular/core';
import {User} from "../../application/Models/user";
import {UserService} from "../../application/service/user.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
@Component({
  selector: 'app-human-resources',
  templateUrl: './human-resources.component.html',
  styleUrls: ['./human-resources.component.scss']
})
export class HumanResourcesComponent implements OnInit {
  users: User[];
  selectedUser: User;
  userForm: FormGroup;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    this.getAllUsers();
  }

 /* getAllUsers() {
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
    });
  }*/
  getAllUsers() {
    this.userService.getAllUsers().then(res => {
      console.log(res);
      this.users = res.data;
    });
  }

  createForm() {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      address: ['', Validators.required],
      cin: ['', Validators.required],
      telNum: ['', Validators.required],
      roles: ['', Validators.required],
      dayOfBirth: ['', Validators.required]
    });
  }

  onSelect(user: User) {
    this.selectedUser = user;
    this.userForm.patchValue({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      address: user.address,
      cin: user.cin,
      telNum: user.telNum,
      roles: user.roles,
      dayOfBirth: user.dayOfBirth
    });
  }

  onSubmit() {
    const Userid = this.userForm.get('Userid').value;
    const username = this.userForm.get('username').value;
    const firstname = this.userForm.get('firstname').value;
    const lastname = this.userForm.get('lastname').value;
    const email = this.userForm.get('email').value;
    const password = this.userForm.get('password').value;
    const address = this.userForm.get('address').value;
    const cin = this.userForm.get('cin').value;
    const telNum = this.userForm.get('telNum').value;
    const roles = this.userForm.get('roles').value;
    const dayOfBirth = this.userForm.get('dayOfBirth').value;

    const user = new User();
    user.username = username;
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;
    user.address = address;
    user.cin = cin;
    user.telNum = telNum;
    user.roles = roles;
    user.dayOfBirth = dayOfBirth;

     this.userService.createUser(user).then((newUser: User) => {
       this.users.push(newUser);
       this.userForm.reset();
     }).catch(err=>console.log(err));
   }
    /*this.userService.createUser(user).then((newUser: User) => {
      this.users.push(newUser.data);
      this.userForm.reset();
    }).catch(error => {
      console.error(error);
    });*/



  /*onUpdate() {
    this.userService.updateUser(this.selectedUser).subscribe((updatedUser: User) => {
      const index = this.users.findIndex(user => user.Userid === updatedUser.Userid);
      if (index !== -1) {
        this.users[index] = updatedUser;
      }
      this.selectedUser = null;
    });
  }*/
  /*onUpdate() {
    this.userService.updateUser(this.selectedUser).subscribe(
      (response: any) => {
        const updatedUser = response.data;
        const index = this.users.findIndex(user => user.Userid === updatedUser.Userid);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
        this.selectedUser = null;
      },
      error => {
        console.error(error);
      }
    );
  }*/

/*
  onSearch(firstname: string) {
    this.userService.findByFirstname(firstname).subscribe(users => {
      this.users = users;
    });
  }
  reset() {
    this.userForm.reset();
    this.selectedUser = null;
    this.getAllUsers();
  }*/
  edit(id:number){
    this.router.navigate(['/dashboard/human-resources/user/'+id])
  }

  deleteById(id: number) {
    this.userService.deleteById(this.users[id].userId.toString()).then((res)=>{
      this.users.splice(id,1);
    }).catch(err=>console.log(err))
  }
}
