import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidateAssessmentService {

  private defaultUrl = 'http://localhost:9000/skill';
  private assessmentData : any;
  

  constructor(private http: HttpClient) { }
  
  postCandiadte_assessment(
          candidateName : string,
          FinalizedQuestions : any,
          startTime : Date,
          endTime : Date,
          cutoff : number,
          duration : number
  ): Observable<any> {


    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = {  candidateName:candidateName,
      questions:FinalizedQuestions ,
      startTime: startTime ,
      endTime:endTime,
      cutoff:cutoff ,
      duration:duration };

    return this.http.post<any>(this.defaultUrl + '/postcandidate_assessment', body, {
      headers,
    });
  }

  // Method to fetch Candidate data by email 
  getCandidatedata_by_Email(
    candidateEmail: string,
    
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      candidateEmail: candidateEmail,
    };
    return this.http.post<any>(
      this.defaultUrl + '/candidate-details',
      body,
      { headers }
    );
  }

 setAssessmentData(data : any):void{
  this.assessmentData = data;
 }
 getAssessmentData(): any{
  return this.assessmentData;

 }

 updateStatus(data: any): Observable<any> {
  // Send a PUT request to the API endpoint to update score and result
  return this.http.put<any>(
    this.defaultUrl + '/candidate_status-update',data );
}


  
}

