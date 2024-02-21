import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private skillsUrl = 'http://localhost:9000/skill';

  // private apiUrl = 'http://localhost:9000/skill'

  constructor(private http: HttpClient) {}

  getManagerNames(): Observable<any> {
    const endpoint = `${this.skillsUrl}/getmanagername`;

    return this.http.get<any>(endpoint);
  }

  postManagerList(name: String): Observable<any> {
    console.log('name', name);

    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { ManagerName: name };

    return this.http.post<any>(this.skillsUrl + '/select-manager', body, {
      headers,
    });
  }

  getExistingData(): Observable<any> {
    const endpoint = `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/question`;

    return this.http.get<any[]>(endpoint);
  }

  getskillsList(): Observable<any> {
    return this.http.get<any>(this.skillsUrl + '/getskill');
  }

  // Method to fetch data by fileName and Managername
  getdataby_Id(
    id: any
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = { id: id };
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/viewquestion',
      body,
      {
        headers,
      }
    );
  }

  // Method to fetch data by fileName and Managername
  getCandidatelist_reviewer(
    candidateName: string,
    email_FileName: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      candidateName: candidateName,
      email_FileName: email_FileName,
    };
    return this.http.post<any>(
      this.skillsUrl + '/candidatelist_for_reviewer',
      body,
      { headers }
    );
  }

  //sending view data to questiondisplay component
  getFinalizedQuestions(): Observable<any> {
    return this.http.get<any[]>(this.skillsUrl + '/view_fetchData');
  }

  getExistingCandidate(): Observable<any> {
    return this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/candidate'
    );
  }
  //New User
  postCandidateDetails(
    candidateId: Date,
    managerName: String,
    name: String,
    emailId: String,
    phoneNumber: number | null,
    status: String,
    fileName: String,
    questions: any,
    score: number | null,
    results: String,
    cutoff: number,
    durations: number,
    candidatePassword: string,
    candidateConfirmPassword: string,
    roles: String,
    candidateSkill: any
  ): Observable<any> {
    console.log('name', name);

    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = {
      id: candidateId,
      email_Managername: managerName,
      candidateName: name,
      candidateEmail: emailId,
      candidatePhone: phoneNumber,
      email_Status: status,
      email_Filename: fileName,
      questions: questions,
      score: score,
      results: results,
      cutoff: cutoff,
      durations: durations,
      password: 'abc123',
      confirmPassword: 'abc123',
      roles: roles,
    };
    console.log('Send email Data', body);

    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/candidatemail',
      body,
      {
        headers,
      }
    );
  }
  //Post the data of Existing Candidates
  postExistingCandidateDetails(
    candidateId: Date,
    empid : number | null,
    managerName: string,
    candidateName: string,
    candidateEmail: string,
    candidatePhone: number | null,
    status: string,
    fileName: string,
    questions: any,
    score: number | null,
    results: string,
    cutoff: number,
    durations: number,
    candidatePassword: any,
    candidateConfirmPassword: any,
    roles: string,
    Skill: any,
    department : string,
    candidate_location: string,
    
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = {
      id: candidateId,
      empid: empid,
      email_Managername: managerName,
      candidateName: candidateName,
      candidateEmail: candidateEmail,
      candidatePhone: candidatePhone,
      email_Status: status,
      email_Filename: fileName,
      questions: questions,
      score: score,
      results: results,
      cutoff: cutoff,
      durations: durations,
      password: candidatePassword,
      confirmPassword: candidateConfirmPassword,
      roles: roles,
      Skill: Skill,
      department: department !== undefined ? department : '--',
      candidate_location:
        candidate_location !== undefined ? candidate_location : '--',
    };

    console.log('Send Existing email Data', body);
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/candidatemail',
      body,
      {
        headers,
      }
    );
  }
}
