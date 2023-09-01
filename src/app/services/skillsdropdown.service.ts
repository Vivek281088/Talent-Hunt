import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsdropdownService {

  private skillsUrl = 'http://localhost:9000/skill';
  

  constructor(private http: HttpClient) { }

getskillsList(): Observable<any>{
  return this.http.get<any>(this.skillsUrl + '/getskill')
}
  
  postskillsList(Skills:string[]): Observable<any>{

  const headers=new HttpHeaders({'content-Type':'application/json'});

  const body={selectedSkill:Skills}

 

  return this.http.post<any>(this.skillsUrl+'/questionfind',body,{headers})

}

}
