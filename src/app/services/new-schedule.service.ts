import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NewScheduleService {
  newScheduleData:any;

  constructor(private http: HttpClient) { }

  setNewScheduleData(newScheduleData:any){
    this.newScheduleData=newScheduleData;

  }
  getNewScheduleData(){
    return this.newScheduleData;

  }

  getUniqueCandidateDetails(): Observable<any> {
    return this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/candidate_Details'
    );
  }
}
