import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardService {
  constructor(private http: HttpClient) { }

  getData(): Observable<any[]> {
    return this.http.get<any[]>('./assets/json/candidates.json');
  }

  getDocuments(): Observable<any[]> {
    return this.http.get<any[]>('./assets/json/documents.json');
  }
}
