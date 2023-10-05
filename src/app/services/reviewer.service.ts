import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewerService {
  private defaultUrl = 'http://localhost:9000/skill';
  constructor(private http: HttpClient) {}

  // Method to fetch data by fileName and Managername
  getCandidatelist_reviewer(
    email_Managername: string,
    candidateName: string,
    email_FileName: String
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      email_Managername: email_Managername,
      candidateName: candidateName,
      email_FileName: email_FileName,
    };
    console.log('body', body);
    return this.http.post<any>(
      this.defaultUrl + '/candidatelist_for_reviewer',
      body,
      { headers }
    );
  }

  updateScoreAndResult(data: any): Observable<any> {
    // Send a PUT request to the API endpoint to update score and result
    return this.http.put<any>(
      this.defaultUrl + '/reviewer_updating_score_result',data );
  }
}
