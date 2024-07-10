import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { AggregatedData, MappingPCRCandidateData } from '../store/PCR-Mapping/pcr-mapping.action';

@Injectable({
  providedIn: 'root'
})
export class PcrMappingService {


  constructor(private http: HttpClient) {}

  getPCRMappedData(): Observable<AggregatedData[]> {
    const endpoint = `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/Th-PCR-Mapping`;

    return this.http.get<AggregatedData[]>(endpoint);
  }
  MapPCRData(data: any): Observable<MappingPCRCandidateData[]> {
    console.log("Service Body", data.mappingPcrCandidateData
  )
    const body = data.mappingPcrCandidateData
    console.log("Service -------", body)
    return this.http.post<MappingPCRCandidateData[]>(
      `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/Th-PCR-Mapping`,
      body,
    )
    .pipe(
      tap((responsedata) => {
        console.log('Mapped Successfully', responsedata);
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
  mapPcrAgile(data : any):Observable<any> {
    return this.http.post<any>('https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/Th-PCR-Mapping',data);

  }
  mailMappedData(data: any): Observable<any> {

    console.log("Service Body", data)

    return this.http.post<any>(
      `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/sendmailaftermapping`,
      data,
    )
    .pipe(
      tap((responsedata) => {
        console.log('Mapped Successfully', responsedata);
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
  deleteMappedData(data: string[]) :Observable<any>{
    console.log("Deleted Data  ", data);
    const endpoint = `${process.env.BASE_URL_DEV}/Th-PCR-Mapping`;
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body : data
    };
    return this.http.request('delete', endpoint, httpOptions);
  }

  getAllResource():Observable<any>{
    const endPoint = `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/resource`;
    return this.http.get<any>(endPoint);
  }
}
