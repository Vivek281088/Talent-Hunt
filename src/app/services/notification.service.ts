import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { CNotification } from '../modules/new-schedule/new-schedule.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor( private http: HttpClient) {

   }

   postNotification(notification : CNotification): Observable<any> {
    console.log("notification service" , notification)
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = {
      sender : notification.sender,
      receiver : notification.receiver,
      content : notification.content
    };
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/notification',
      body,
      { headers }
    );
    }

    getNotification(receiver : any){
      const url1 = `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/receiverNotifications`;
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
    return this.http.post(url1, receiver, { headers: headers }).pipe();
      
      
      
    }
}
