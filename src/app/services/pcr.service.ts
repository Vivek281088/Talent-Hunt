import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PCR } from '../store/pcr/pcr.action';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PcrService {


  constructor(private http : HttpClient) { }

  getPcr() : Observable<PCR[]>{
    return this.http.get<PCR[]>(`${process.env.BASE_URL_PRIVATE}/pcr`)
  }

  addpcr(pcr:PCR):Observable<PCR>{
    console.log("pcr service",pcr)
    return this.http.post<PCR>(`${process.env.BASE_URL_PRIVATE}/pcr`,pcr)
  }
  addMuiltPCR(pcr : PCR[]) : Observable<PCR[]>{
    return this.http.post<PCR[]>(`${process.env.BASE_URL_PRIVATE}/pcr`,pcr)
  }
  getIndividualPCR(id : string  | null) : Observable<PCR>{
    console.log("sdfvbsdfv",id)
    return this.http.get<PCR>(`${process.env.BASE_URL_PRIVATE}/pcr?id=${id}`)
  }
  getCandidate(id:string){
    return this.http.get<any>(`${process.env.BASE_URL_PRIVATE}/resource?id=${id}`)
  }
}
