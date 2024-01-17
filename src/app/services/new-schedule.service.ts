import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NewScheduleService {
  newScheduleData: any;
  managerProfileData : any;

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

  getUniqueCandidateDetails(): Observable<any> {
    return this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/candidate_Details'
    );
  }
}
