import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

 

@Injectable({

  providedIn: 'root'

})

export class ManagernameService {

 

private managerNameUrl = 'http://localhost:9000/skill'; // Update the URL to match your backend API URL

 

  constructor(private http: HttpClient) { }

 

  getManagerNames(): Observable<any> {

    const endpoint = `${this.managerNameUrl}/getmanagername`;

    return this.http.get<any>(endpoint);

  }

  postManagerList(name:String): Observable<any>{
    const headers=new HttpHeaders({'content-Type':'application/json'});
    const body={Managername:name}
    return this.http.post<any>(this.managerNameUrl+'/select-manager',body,{headers})
  
  }

}