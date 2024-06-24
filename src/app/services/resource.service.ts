import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Candidates } from '../store/resource/resource.action';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) {}

getResourceData(): Observable<Candidates[]> {
    const endpoint = `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/TH-getUniqueCandidatesdata`;

    return this.http.get<Candidates[]>(endpoint);
}

addSingleCandidate(candidate : any) : Observable<Candidates>{
  console.log('add nsjhfgvgjlav' , candidate)
  return this.http.post<Candidates>(`${process.env.BASE_URL_DEV}/TH-postCandidates`,candidate)
}

deleteResource(candidateId: string[]): Observable<any> {
  console.log("pcrIds  .....................................", candidateId);
  const endpoint = `${process.env.BASE_URL_DEV}/resource`;

  const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    body: { candidateId: candidateId }
  };

  return this.http.request('delete', endpoint, httpOptions);
}

updateResource(candidate: Candidates): Observable<Candidates> {
  console.log('caaaaaannnnnn', candidate);
  return this.http.put<Candidates>(`${process.env.BASE_URL_DEV}/resource`, candidate);

}


addMultiResource(candidate: Candidates[]): Observable<Candidates[]> {

  console.log("from canddddddd service",candidate)
  return this.http.post<Candidates[]>(
    'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/resource',
    candidate,
  );
}


}
