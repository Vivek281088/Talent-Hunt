import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

 

@Injectable({

  providedIn: 'root'

})

export class ManagernameService {

 

  private managerNameUrl = 'http://localhost:9000/skill'; // Update the URL to match your backend API URL
  
  private finalizedQuestions: any[] = [];

  private duration: number = 0;

  private cuttoff: number = 0;

 

  constructor(private http: HttpClient) { }

 

  getManagerNames(): Observable<any> {

    const endpoint = `${this.managerNameUrl}/getmanagername`;

    return this.http.get<any>(endpoint);

  }

  setFinalizedQuestions(questions: any[]): void {
    this.finalizedQuestions = questions;
  }

  getFinalizedQuestions(): any[] {
    return this.finalizedQuestions;
  }

  setDuration(duration: number) {
    this.duration = duration;
  }

  getDuration() {
    return this.duration;
  }

  setCuttoff(cuttoff: number) {
    this.cuttoff = cuttoff;
  }

  getCuttoff() {
    return this.cuttoff;
  }
  
}