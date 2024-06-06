import { HttpClient } from '@angular/common/http';
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
