

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


import { l1Details } from '../store/l1_screen/l1_screen.action';

@Injectable({
  providedIn: 'root',
})
export class L1ScreenService {


  constructor(private http: HttpClient) {}

  getl1Details() : Observable<l1Details[]>{
    return this.http.get<l1Details[]>(`${process.env.BASE_URL_DEV}/l1screen`)
  }


  getL1Details(): Observable<any> {
    return this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/l1screen'
    );
  }
  updateL1Details(l1Details:any):Observable<any>{
    return this.http.put<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/l1screen',
      l1Details,

    );

  }
}
