import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

 

@Injectable({

  providedIn: 'root'

})

export class TableService{



 private skillsUrl = 'http://localhost:9000/skill';
// private apiUrl = 'http://localhost:9000/skill'

  constructor(private http: HttpClient) {}

getManagerNames(): Observable<any>{
  const endpoint = `${this.skillsUrl}/getmanagername`;
  return this.http.get<any>(endpoint);
}
postManagerList(name:String): Observable<any>{
  console.log("name" , name);
  const headers=new HttpHeaders({'content-Type':'application/json'});
  const body={ManagerName:name}
  return this.http.post<any>(this.skillsUrl+'/select-manager',body,{headers})
}

getTableData(): Observable<any>{
  const endpoint = `${this.skillsUrl}/existinguser`;
  return this.http.get<any[]>(endpoint);
}
}

