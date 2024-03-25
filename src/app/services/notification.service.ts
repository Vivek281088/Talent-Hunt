import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { CNotification } from '../modules/new-schedule/new-schedule.component';
 
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private newNotificationSubject = new Subject<void>();
  constructor(private http: HttpClient) {}

  notifyNewNotification() {
    this.newNotificationSubject.next();
  }

  get newNotificationReceived() {
    return this.newNotificationSubject.asObservable();
  }

  postNotification(notification: CNotification): Observable<any> {
    console.log('notification service', notification);
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      sender : notification.sender,
      receiver : notification.receiver,
      content : notification.content
    };
    console.log("notification service",body);
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/notification',
      body,
      { headers }
    ).pipe(
      catchError((err : any) =>{
        console.log('err' , err)
        this.router.navigate(['/errorpage'], { queryParams: { message: err.message } });
        return of(null)
      })
    )
    }

    getNotification(receiver : any){
      console.log(receiver)
      const url1 ='https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/receivenotifi';
      const headers = new HttpHeaders()
      headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Content-Type', 'application/json');
    headers.append(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    headers.append(
      'Access-Control-Allow-Headers',
      'Content-Type,X-Amz-Date,X-Api-Key'
    );
    return this.http.post(url1, receiver, { headers: headers }).pipe(
      catchError((err : any) =>{
        console.log('err' , err)
        this.router.navigate(['/errorpage'], { queryParams: { message: err.message } });
        return of(null)
      })
    );
      
      
      
    }

  // Update Notification

  updateNotification(
    notificationId: string,
    receiverId: string
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = {
      notificationId: notificationId,
      receiverId: receiverId,
    };
    console.log('Notification test', body);
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/updatenotification',
      body,
      {
        headers,
      }
    );
  }


}
