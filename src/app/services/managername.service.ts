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

  private finalizedName!: string;

  finalizedEmail!: string;

  finalizedManagerEmail!: string;

  userEmail!: string;

  constructor(private http: HttpClient) {}

  getManagerNames(): Observable<any> {
    const endpoint = `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/managernames`;

    return this.http.get<any>(endpoint);
  }
  getclientManagerData(): Observable<any> {
    const endpoint = `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/ClientManager`;

    return this.http.get<any>(endpoint);
  }
  getclientManagerName(): Observable<any> {
    const endpoint = `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/Client-ManagerName`;

    return this.http.get<any>(endpoint);
  }

  postClientManager(
    employeeId: number,
    managerName: string,
    email: string,
    phone: number,
    department: string,
    location: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      empid: employeeId,
      managerName: managerName,
      email: email,
      phone: phone,
      department: department,
      manager_location: location,
    };
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/ClientManager',
      body,
      { headers }
    );
  }

  addCandidate(
    
    candidateName: string,
    email: string,
    phone: number,
    empid?: number,
    department?: string,
    location?: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      
      candidateName: candidateName,
      email: email,
      phone: phone,
      ...(empid !== undefined && { empid: empid }),
      ...(department !== undefined && { department: department }),
      ...(location !== undefined && { candidate_location: location })
    };
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/New-Candidate',
      body,
      { headers }
    );
  }

  updateCandidate(
    candidateName: string,
    email: string,
    phone: number,
    empid?: number,
    department?: string,
    location?: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      candidateName: candidateName,
      candidateEmail: email,
      candidatePhone: phone,
      ...(empid !== undefined && { empid: empid }),
      ...(department !== undefined && { department: department }),
      ...(location !== undefined && { candidate_location: location })
    };
    return this.http.put<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/update_CandidateDetails',
      body,
      { headers }
    );
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
    options: String[],
    chosenSkill: String,
    selecteddifficultyType: String,
    selectedAnswer: String[]
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      question: question,
      questionType: selectedquestionType,
      options: options,
      skills: chosenSkill,
      Difficulty_Level: selecteddifficultyType,
      answer: selectedAnswer,
    };
    console.log('Post Question Data', body);
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/questiondb',
      body,
      {
        headers,
      }
    );
  }

  //candidate list

  getCandidateStatus(): Observable<any> {
    const endpoint = `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/candidate`;
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

  getManagerdata_by_Email(managerEmail: string): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      candidateEmail: managerEmail,
    };
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/fetch_managerdetails',
      body,
      { headers }
    );
  }
}
