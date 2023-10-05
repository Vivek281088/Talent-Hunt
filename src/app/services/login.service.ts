import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  static islogin() {
    throw new Error('Method not implemented.');
  }
  private skillsUrl = 'http://localhost:9000/skill';

  constructor(private http: HttpClient) {}

  postlogincredentials(name:string,encrypted_password:string):Observable<any>{
    const headers=new HttpHeaders({'content-Type':'application/json'});
    const body={name:name,password:encrypted_password};

    return this.http.post<any>(this.skillsUrl+'/authenticate',body,{headers})
    

  }

  postsignup(name:String,emailId:string,phoneNumer:number  | null ,password:string,confirmpassword:string):Observable<any>{
    const headers=new HttpHeaders({'content-Type':'application/json'});
    const body={name:name,emailId:emailId,phoneNumber:phoneNumer,password:password,confirmPassword:confirmpassword};

    return this.http.post<any>(this.skillsUrl+'/postsignup',body,{headers})
  }

  postforgotpassword(name:string,emailId:string,password:string,confirmPassword:string):Observable<any>{
    const headers=new HttpHeaders({'content-Type':'application/json'});
    const body={name:name,emailId:emailId,password:password,confirmPassword:confirmPassword};
    console.log("fp",body)
    return this.http.post<any>(this.skillsUrl+'/forgotpassword',body,{headers})
  }
  islogin(){
    return localStorage.getItem('token');
  }
}
