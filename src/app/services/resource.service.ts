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

deleteResource(candidates : {id:string}[]){
  // return this.http.delete(`${process.env.BASE_URL_PRIVATE}/resource`,candidates)

const endpoint = `${process.env.BASE_URL_PRIVATE}/resource`;
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  body: { candidateId: candidates }
};

return this.http.request('delete', endpoint, httpOptions);

}





}
