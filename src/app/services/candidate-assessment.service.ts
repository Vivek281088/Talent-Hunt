import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateAssessmentService {

  private defaultUrl = 'http://localhost:9000/skill';
  

  constructor(private http: HttpClient) { }
  
  postCandiadte_assessment(
          candidateName : string,
          FinalizedQuestions : any,
          selectedOption : any,
          startTime : Date,
          endTime : Date,
          cutoff : number,
          duration : number
  ): Observable<any> {


    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = {  candidateName:candidateName,
      questions:FinalizedQuestions ,
      selectedOption:selectedOption ,
      startTime: startTime ,
      endTime:endTime,
      cutoff:cutoff ,
      duration:duration };

    return this.http.post<any>(this.defaultUrl + '/postcandidate_assessment', body, {
      headers,
    });
  }

 


  
}

