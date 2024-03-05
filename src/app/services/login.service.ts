import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  static islogin() {
    throw new Error('Method not implemented.');
  }
  private skillsUrl = 'http://localhost:9000/skill';
 
  constructor(private http: HttpClient) {}
 
  postlogincredentials(
    userEmail: string,
    encrypted_password: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = { candidateEmail: userEmail, password: encrypted_password };
    console.log('bodey', body);
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/loginresource',
      body,
      {
        headers,
      }
    );
    // return this.http.post<any>(this.skillsUrl + '/authenticate', body, {
    //   headers,
    // });
  }
 
  postsignup(
    id: Date,
    Firstname: String,
    Lastname: String,
    emailId: string,
    phoneNumer: number | null,
    password: string,
    confirmpassword: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      id: id,
      Firstname: Firstname,
      Lastname: Lastname,
      candidateEmail: emailId,
      phoneNumber: phoneNumer,
      password: password,
      confirmPassword: confirmpassword,
      roles: 'manager',
    };
    console.log('signup', body);
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/signup',
      body,
      {
        headers,
      }
    );
    // return this.http.post<any>(this.skillsUrl + '/postsignup', body, {
    //   headers,
    // });

    
  }
 
  postforgotpassword(
    emailId: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      candidateEmail: emailId,
      password: password,
      confirmPassword: confirmPassword,
    };
 
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/forgotpassword',
      body,
      {
        headers,
      }
    );
    // return this.http.post<any>(this.skillsUrl + '/forgotpassword', body, {
    //   headers,
    // });
  }
  islogin() {
    return localStorage.getItem('token');
  }
}
 