import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewScheduleService {
  newScheduleData: any;
  managerProfileData: any;
  candidateProfileData: any;

  constructor(private http: HttpClient) {}

  setNewScheduleData(newScheduleData: any) {
    this.newScheduleData = newScheduleData;
  }
  getNewScheduleData() {
    return this.newScheduleData;
  }
  setManagerProfileData(Data: any) {
    this.managerProfileData = Data;
  }
  getManagerProfileData() {
    return this.managerProfileData;
  }

  setCandidateProfileData(Data: any) {
    this.candidateProfileData = Data;
  }
  getCandidateProfileData() {
    return this.candidateProfileData;
  }

  getUniqueCandidateDetails(): Observable<any> {
    return this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/candidate_Details'
    );
  }
  getIndividualQuestion(id: string ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      id: id,
    };
    console.log("service body",body)
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/TH-Questions_GetById',
      body,
      {
        headers,
      }
    );
  }
}