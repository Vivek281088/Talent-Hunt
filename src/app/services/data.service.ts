import { Injectable } from '@angular/core';
import { Observable, Subscription, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';

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
  getRecentAssessmentCompleted(): Observable<any> {
    return this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/RecentAssessmentCompleted'
    );
  }
  getDashboardData(): Observable<any[]> {
    const recentAssessmentData$ = this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/recentassessmentcard'
    ).pipe(
      catchError( (err : Error) => {
       console.log("error while dashboard" , err);
        return throwError(()=> Error('Dashboard Error', {cause : 'Could not able to load the Dashboard data'}))
      } 
      )
    )
    const recentAssessmentCompleted$ = this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/RecentAssessmentCompleted'
    )

    return forkJoin([recentAssessmentData$, recentAssessmentCompleted$]);
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
