import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SkillsdropdownService {
  private skillsUrl = 'http://localhost:9000/skill';

  constructor(private http: HttpClient) {}

  getskillsList(): Observable<any> {
    return this.http.get<any>(this.skillsUrl + '/getskill');
  }

  postskillsList(Skills: string[]): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { selectedSkill: Skills };

    return this.http.post<any>(this.skillsUrl + '/questionfind', body, {
      headers,
    });
  }

  filterManager(
    filterManager: string,
    filterSkills: string[]
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { filterManager, filterSkills };

    console.log('body', body);

    return this.http.post<any>(this.skillsUrl + '/search', body, { headers });
  }

  // filterManager(
  //   managerName: string | undefined,
  //   skills: string[] | undefined
  // ): Observable<any> {
  //   const headers = new HttpHeaders({ 'content-Type': 'application/json' });
  //   const body = { managerName, skills };
  //   console.log('body', body);
  //   return this.http.post<any>(this.skillsUrl + '/search', body, { headers });
  // }

  //post questions,cuttoff,duration
  postquestions(dataToSave: any): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    //  const body = {
    //    Questions: ques.Questions,
    //    cutoff:ques.cuttoff,
    //    duration:ques.duration
    //   }
    //console.log("body:",body);

    // return this.http.post<any>(
    //   this.skillsUrl + '/questions',
    //   { ques: dataToSave },
    //   { headers }
    // );

    return this.http.post<any>(
      this.skillsUrl + '/questions',
      { ques: dataToSave },
      { headers }
    );
  }

  searchManager(
    filterManager: string,
    filterSkills: string[]
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = { filterManager, filterSkills };
    console.log('body', filterManager);
    return this.http.post<any>(this.skillsUrl + '/search', body, { headers });
  }

  // filterSkill(Skills:string[] , mname : string): Observable<any>{

  // const headers=new HttpHeaders({'content-Type':'application/json'});

  // const body={selectedSkill:Skills, selectedManager : mname}

  // return this.http.post<any>(this.skillsUrl+'/search',body,{headers})

  // }

  // Function to get the latest version
  getLatestVersion(Managername: string, Skill: string[]): Observable<number> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = { Managername, Skill };

    return this.http.post<number>(this.skillsUrl + '/latest-version', body, {
      headers,
    });
  }
}
