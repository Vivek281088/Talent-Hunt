import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

 

@Injectable({
  providedIn: 'root',
})
export class ManagernameService {
  private managerNameUrl = 'http://localhost:9000/skill'; 
  // Update the URL to match your backend API URL

  private finalizedQuestions: any[] = [];

  private duration!: number;

  private cutoff!: number;

  private SelectedManager: any;
  
  private fileName!: string;

  private finalizedName !: string;

  finalizedEmail !: string;

  finalizedManagerEmail !: string;

  userEmail !: string;

  constructor(private http: HttpClient) {}

  getManagerNames(): Observable<any> {
    const endpoint = `${this.managerNameUrl}/getmanagername`;

    return this.http.get<any>(endpoint);
  }

  postManagerList(name: String): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = { Managername: name };
    return this.http.post<any>(this.managerNameUrl + '/select-manager', body, {
      headers,
    });
  }

  postexistingcandidates(
    managername: string,
    name: string[],
    email: string,
    phone: number,
    status: string,
    filename: string,

    questions: any
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      email_Managername: managername,
      candidateName: name,
      candidateEmail: email,
      candidatePhone: phone,

      email_Status: status,
      email_Filename: filename,
      questions: questions,
    };
    return this.http.post<any>(this.managerNameUrl + '/add-candidate', body, {
      headers,
    });
  }

// Posting questions to database
postquestionstodb(
  question: String,
  selectedquestionType: String,
  option1: String,
  option2: String,
  option3: String,
  option4: String,
  chosenSkill: String,
  selecteddifficultyType: String,
  selectedAnswer: String,
  selectedAnswers : any

): Observable<any> {
  const headers = new HttpHeaders({ 'content-Type': 'application/json' });
  const body = {
    question: question ,
      questionType: selectedquestionType,
      option1: option1,
      option2: option2,
      option3:option3 ,
      option4: option4,
      skills: chosenSkill,
      Difficulty_Level: selecteddifficultyType,
      radioanswer: selectedAnswer,
       mcqanswer: selectedAnswers
  };
  return this.http.post<any>(this.managerNameUrl + '/post_question', body, {
    headers,
  });
}



  //candidate list

  getCandidateStatus(): Observable<any> {
    const endpoint = `${this.managerNameUrl}/existingcandidate`;
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

  setCutoff(cutoff: number) {
    this.cutoff = cutoff;
  }

  getCutoff() {
    return this.cutoff;
  }

  setManagerName(name: any) {
    this.SelectedManager = name;
  }

  getManagerName(): any {
    return this.SelectedManager;
  }
  setFileName(fileName: string) {
    this.fileName = fileName;
  }

  getFileName(): string {
    return this.fileName;
  }



setCandidateAssessment_Email(userEmail: string): void {
  this.finalizedEmail = userEmail;
}

getCandidateAssessment_Email(): string {
  return this.finalizedEmail;
}


setManagerName_Email(managerEmail: string): void {
  this.finalizedManagerEmail = managerEmail;
}

getManagerName_Email(): string {
  return this.finalizedManagerEmail;
}


getManagerdata_by_Email(
  managerEmail: string,
  
): Observable<any> {
  const headers = new HttpHeaders({ 'content-Type': 'application/json' });
  const body = {
   
    candidateEmail: managerEmail
  };
  return this.http.post<any>(
    this.managerNameUrl + '/manager-details',
    body,
    { headers }
  );
}

}