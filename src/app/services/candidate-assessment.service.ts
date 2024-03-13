import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandidateAssessmentService {
  private defaultUrl = 'http://localhost:9000/skill';
  private assessmentData: any;

  constructor(private http: HttpClient) {}

  postCandiadte_assessment(
    candidateName: string,
    FinalizedQuestions: any,
    startTime: Date,
    endTime: Date,
    cutoff: number,
    duration: number
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = {
      candidateName: candidateName,
      questions: FinalizedQuestions,
      startTime: startTime,
      endTime: endTime,
      cutoff: cutoff,
      durations: duration,
    };

    return this.http.post<any>(
      this.defaultUrl + '/postcandidate_assessment',
      body,
      {
        headers,
      }
    );
  }

  // Method to fetch Candidate data by email
  getCandidatedata_by_Email(candidateEmail: string | null): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      candidateEmail: candidateEmail,
    };
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/fetch_candidatedetails',
      body,
      {
        headers,
      }
    );
  }

  setAssessmentData(data: any): void {
    this.assessmentData = data;
  }
  getAssessmentData(): any {
    return this.assessmentData;
  }

  updateStatus(data: any): Observable<any> {
    // Send a PUT request to the API endpoint to update score and result
    return this.http.put<any>(
      this.defaultUrl + '/candidate_status-update',
      data
    );
  }

  // Updating user profile
  updateCandidateProfile(data: any): Observable<any> {
    return this.http.put<any>('https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/update_candidateprofile',
      data
    );
  }

  // Updating user profile
  updateManagerProfile(data: any): Observable<any> {
    return this.http.post<any>( 'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/update_managerprofile',
      data
    );
  }
}

