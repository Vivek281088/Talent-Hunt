import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  sharedData: any;

  constructor(private http: HttpClient) {}

  private localstoragekey = 'sampledata';
  savedata(data: string[]): void {
    console.log('saved data-----------------', data);
    localStorage.setItem(this.localstoragekey, JSON.stringify(data));
  }
  getData(): string[] {
    console.log('get data-----------------', this.localstoragekey);
    const storedData = localStorage.getItem(this.localstoragekey);
    return storedData ? JSON.parse(storedData) : [];
  }
  getRecentAssessmentData(): Observable<any> {
    return this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/recentassessmentcard'
    );
  }
  getDashboardCount(): Observable<any> {
    return this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/customcards'
    );
  }
  private subscriptions: Subscription[] = [];

  unsubscribe(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
