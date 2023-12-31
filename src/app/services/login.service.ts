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

  postlogincredentials(userEmail:string,encrypted_password:string):Observable<any>{
    const headers=new HttpHeaders({'content-Type':'application/json'});
    const body={candidateEmail:userEmail,password:encrypted_password};
console.log("bodey",body)
    return this.http.post<any>(this.skillsUrl+'/authenticate',body,{headers})
    

  }

  postsignup(Managername:String,emailId:string,phoneNumer:number  | null ,password:string,confirmpassword:string):Observable<any>{
    const headers=new HttpHeaders({'content-Type':'application/json'});
    const body={Managername:Managername,candidateEmail:emailId,phoneNumber:phoneNumer,password:password,confirmPassword:confirmpassword};
    console.log("signup",body)
    return this.http.post<any>(this.skillsUrl+'/postsignup',body,{headers})
  }

  postforgotpassword(name:string,emailId:string,password:string,confirmPassword:string):Observable<any>{
    const headers=new HttpHeaders({'content-Type':'application/json'});
    const body={Managername:name,candidateEmail:emailId,password:password,confirmPassword:confirmPassword};
   
    return this.http.post<any>(this.skillsUrl+'/forgotpassword',body,{headers})
  }
  islogin(){
    return localStorage.getItem('token');
  }
}
