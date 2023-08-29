import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

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

}