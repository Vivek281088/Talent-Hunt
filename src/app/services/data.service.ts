import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  sharedData: any;
  currentMessage = new BehaviorSubject( { });
  tempdata : any;


  constructor(private http: HttpClient) {}

  getSighupdata(){
    this.currentMessage.subscribe((data) => {
      console.log("get sighup messafge" , data)
      this.tempdata = data
    })
    return this.tempdata;
  }

  createQR(emailId:string):
  Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      emailId: emailId,
    };
    return this.http.post<any>(
      'https://jay29ofobe.execute-api.ap-south-1.amazonaws.com/dev/enablemfa',
      body,
      {
        headers,
      }
    );
  }


  postforgotpassword(
    emailId: string,
    password: string,
    confirmPassword: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      candidateEmail: emailId,
      password: password,
      confirmPassword: confirmPassword,
    };

    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/forgotpassword',
      body,
      {
        headers,
      }
    );
    // return this.http.post<any>(this.skillsUrl + '/forgotpassword', body, {
    //   headers,
    // });
  }



  changeMessage(message: any) {
    console.log("data fromsignup",message );

    this.currentMessage.next(message)
  }


  savedata(data: string[]): void {
    console.log('saved data-----------------', data);
    sessionStorage.setItem('sampledata', JSON.stringify(data));
  }
  getData(): string[] {
    console.log('get data-----------------');
    const storedData = sessionStorage.getItem('sampledata');
    return storedData ? JSON.parse(storedData) : [];
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
    );
    const recentScheduleData$ = this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/schedulenamecard'
    );

    const recentAssessmentInvites$ = this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/recentAssessmentInvite'
    );
    return forkJoin([
      recentAssessmentData$,
      recentAssessmentCompleted$,
      recentScheduleData$,
      recentAssessmentInvites$,
    ]);
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

  signupWithMFA(id: Date,
    Firstname: String,
    Lastname: String,
    emailId: string,
    phoneNumer: number | null,
    password: string,
    confirmpassword: string,
  token:string,
  secretKey:string
  ):Observable<any>
    {
      const headers = new HttpHeaders({ 'content-Type': 'application/json' });
      const body = {
        id: id,
        Firstname: Firstname,
        Lastname: Lastname,
        candidateEmail: emailId,
        phoneNumber: phoneNumer,
        password: password,
        confirmPassword: confirmpassword,
        roles: 'manager',
        token:token,
        secret:secretKey

      };
      console.log("signupwithmfa",body)
      return this.http.post<any>('https://jay29ofobe.execute-api.ap-south-1.amazonaws.com/dev/register',body,{headers}

      );
    }

    verifyMFA(emailid:string | null,token:string):Observable<any>{
      const headers = new HttpHeaders({ 'content-Type': 'application/json' });
      const body={
        emailId:emailid,
        token:token
      };
      return this.http.post<any>('https://jay29ofobe.execute-api.ap-south-1.amazonaws.com/dev/verifyotp',body,{headers});
    }

}
