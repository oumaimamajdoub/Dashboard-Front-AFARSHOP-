import {User} from "../Models/user";
import { HttpClient ,HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import axios from 'axios';

const API_URL = 'http://localhost:9090/AFAR/API/USERS/';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,) {

  }

  async getAllUsers() {
    axios.defaults.headers.common['Authorization']='Bearer '+localStorage.getItem('token');
    const response =await  axios.get(API_URL+"get");
    return response;
  }

 /* getUserById(Userid: number): Observable<User> {
    const response=await axios.Userid(API_URL+"Userid")
    return this.http.get<User>(`${API_URL}/${Userid}`);
  }*/

  createUser(user: User): Observable<User> {
    return this.http.post<User>(`${API_URL}/add`, user);
  }

 /* updateUser(user: User): Observable<User> {
    return this.http.put<User>(`${API_URL}/update`, user);
  }*/
  async updateUser() {
    axios.defaults.headers.common['Authorization']='Bearer '+localStorage.getItem('token');
    const r=await axios.put(API_URL+"update")
    return r;
  }

  /*deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }*/
  async deleteById(id: number): Promise<void> {
    try {
      axios.defaults.headers.common['Authorization']='Bearer '+localStorage.getItem('token');
      await axios.delete(`${API_URL}${id}`);
    } catch (error) {
      console.error(error);
    }
  }


  findByFirstname(firstname: string): Observable<User[]> {
    return this.http.get<User[]>(`${API_URL}/FindUser/FindByFirstName/${firstname}`);
  }

  /*resetPassword(code: number, pwd: string): Observable<string> {
    return this.http.post<string>(`${API_URL}/ResetPassword/${code}/${pwd}`, {});
  }*/
}
