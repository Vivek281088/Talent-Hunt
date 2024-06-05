import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PcrMappingService {

  constructor(private http: HttpClient) {}

  getPCRMappedData(): Observable<any> {
    const endpoint = `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/Th-PCR-Mapping`;

    return this.http.get<any>(endpoint);
  }
  MapPCRData(data: any): Observable<any> {
    console.log("Service Body", data)
    const body = {
      pcrId: data.pcrId,
      candidateId: data.candidateId
    };
    console.log("Service -------", body)
    return this.http.post<any>(
      `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/Th-PCR-Mapping`,
      body,
    )
    .pipe(
      tap((responsedata) => {
        console.log('Mail updated successfully', responsedata);
      }),
      catchError((error) => {
        console.log('Inside Catch Error');
        if (error.status == 401) {
          console.log(error.status, 'error 1');
          return throwError(() => error);
        }
        return throwError(() => error);
      })
    );
  }
}
