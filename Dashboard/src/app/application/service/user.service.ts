import {User} from "../Models/user";
import { HttpClient ,HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import axios from 'axios';
import { from } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  API_URL:string = 'http://localhost:9090/AFAR/API/USERS/';
  api;
  token;
  constructor(private http: HttpClient,) {
  this.api = axios.create({
    baseURL: this.API_URL
  })
    this.token = localStorage.getItem('token');
  if(this.token && this.token !==""){
    axios.defaults.headers.common['Authorization']='Bearer '+this.token;
  }
  }

  async getAllUsers() {

    const response =await  this.api.get("get");
    return response;
  }

 /* getUserById(Userid: number): Observable<User> {
    const response=await axios.Userid(API_URL+"Userid")
    return this.http.get<User>(`${API_URL}/${Userid}`);
  }*/

  async createUser(user: User){
    return this.api.post(`add`, user);
  }

 /* updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/update`, user);
  }*/
  /*async updateUser() {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
    const r = await axios.put(API_URL + 'update');
    return from(r);
  }*/


  /*deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }*/
  async deleteById(id: string) {
    return this.api.delete(id);
  }
  async addUser(user:any){

    return this.api.post('add',user,{
      headers:{
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  async updateUser(user:any){
    return this.api.put('update',user);
  }

  async getById(id: string) {
    return this.api.get(id);
  }

/*t
  findByFirstname(firstname: string): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/FindUser/FindByFirstName/${firstname}`);
  }*/

  /*resetPassword(code: number, pwd: string): Observable<string> {
    return this.http.post<string>(`${API_URL}/ResetPassword/${code}/${pwd}`, {});
  }*/
}
