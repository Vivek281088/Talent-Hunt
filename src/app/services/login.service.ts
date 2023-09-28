import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static islogin() {
    throw new Error('Method not implemented.');
  }
  private skillsUrl = 'http://localhost:9000/skill';

  constructor(private http: HttpClient) {}

  postlogincredentials(name:string,password:string):Observable<any>{
    const headers=new HttpHeaders({'content-Type':'application/json'});
    const body={name:name,password:password};

    return this.http.post<any>(this.skillsUrl+'/authenticate',body,{headers})
    

  }

  islogin(){
    return localStorage.getItem('token');
  }
}
