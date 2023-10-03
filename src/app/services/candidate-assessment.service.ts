import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateAssessmentService {

  private defaultUrl = 'http://localhost:9000/skill';
  

  constructor(private http: HttpClient) { }
  
  postCandiadte_assessment(data : any): Observable<any> {


    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { data };

    return this.http.post<any>(this.defaultUrl + '/postcandiadate_assessment', body, {
      headers,
    });
  }
  
}

