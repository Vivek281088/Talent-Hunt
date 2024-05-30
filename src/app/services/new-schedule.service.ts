import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../store/candidate/candidate.action';
import { PCR } from '../store/pcr/pcr.action';

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
  getUniqueCandidate() : Observable<Candidate[]>{
    return this.http.get<Candidate[]>(`${process.env.BASE_URL_PRIVATE}/uniqueCandidate`)
  }
  getIndividualQuestion(id: string[] ): Observable<any> {
    //const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    console.log("service body",id)
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/TH-Questions_GetById',
      id,
      // {
      //   headers,
      // }
    );
  }
}
