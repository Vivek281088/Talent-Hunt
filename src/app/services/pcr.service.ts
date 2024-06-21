import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PCR } from '../store/pcr/pcr.action';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PcrDetails } from '../shared/interface/pcrdetails';
import { agileDetails } from '../store/Agile1/Agile1.action';


@Injectable({
  providedIn: 'root',
})
export class PcrService {
  constructor(private http: HttpClient) {}

  getPcr(): Observable<PCR[]> {
    return this.http.get<PCR[]>(`${process.env.BASE_URL_PRIVATE}/pcr`);
  }



  addpcr(pcr: PCR): Observable<PCR> {
    console.log('pcr service', pcr);
    return this.http.post<PCR>(`${process.env.BASE_URL_PRIVATE}/pcr`, pcr);
  }
  addMuiltPCR(pcr: PCR[]): Observable<PCR[]> {

    console.log("from pcr service",pcr)
    return this.http.post<PCR[]>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/addMultiPcrId',
      pcr,

    );
  }
  updatepcr(pcr: PCR): Observable<PCR> {
    return this.http.put<PCR>(`${process.env.BASE_URL_PRIVATE}/pcr`, pcr);
  }



  deletepcr(pcrIds: string[]): Observable<any> {
    console.log("pcrIds  .....................................", pcrIds);
    const endpoint = `${process.env.BASE_URL_PRIVATE}/pcr`;

    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      body: { pcrId: pcrIds }
    };

    return this.http.request('delete', endpoint, httpOptions);
  }



  getIndividualPCR(id: string | null): Observable<PcrDetails> {
    return this.http.get<PcrDetails>(
      `${process.env.BASE_URL_PRIVATE}/pcr?id=${id}`
    );
  }
  getCandidate(id: string | null) {
    return this.http.get<any>(
      `${process.env.BASE_URL_PRIVATE}/resource?id=${id}`
    );
  }
  getCandidatePcrMapping(id: string | null){
    return this.http.get<PcrDetails>(
      `${process.env.BASE_URL_PRIVATE}/emp-pcr?id=${id}`
    );
  }

  addAgile1Details(data : any){
    return this.http.post(`${process.env.BASE_URL_PRIVATE}/agile1`,data);
  }


  getAgile(): Observable<agileDetails[]> {
    return this.http.get<agileDetails[]>(`${process.env.BASE_URL_PRIVATE}/agile1`);
  }
}
