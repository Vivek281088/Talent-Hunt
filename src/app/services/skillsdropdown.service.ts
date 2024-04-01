import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class SkillsdropdownService {
  private skillsUrl = 'http://localhost:9000/skill';
  private Skill: any[] = [];

  constructor(private http: HttpClient) {}

  getskillsList(): Observable<any> {
    return this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/skills'
    );
  }
  

  postSkill(Skill: string): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { skill: Skill };

    return this.http.post<any>(this.skillsUrl + '/skillnames', body, {
      headers,
    });
  }
  //question db
  postskillsList(Skills: string[]): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { skills: Skills };

    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/allquestions',
      body,
      {
        headers,
      }
    );
  }

  // filterManager(
  //   filterManager: string | undefined,
  //   filterSkills: string[] | undefined,
  //   fromDate: any,
  //   toDate: any
  // ): Observable<any> {
  //   const headers = new HttpHeaders({ 'content-Type': 'application/json' });

  //   const body = {
  //     Managername: filterManager,
  //     Skill: filterSkills,
  //     FromDate: fromDate,
  //     ToDate: toDate,
  //   };

  //   console.log('body', body);

  //   return this.http.post<any>(
  //     'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/question',
  //     body,
  //     { headers }
  //   );
  // }

  postOneSkill(Skill: string): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { skill: Skill };

    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/skills',
      body,
      {
        headers,
      }
    );
  }
  getUniqueSkills(): Observable<any> {
    return this.http.get<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/questiondbskills'
    );
  }

  //post questions,cuttoff,duration
  postNewSchedule(dataToSave: any): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = dataToSave;
    console.log('Service Body', body);
    return this.http.post<any>(
      //this.skillsUrl + '/questions',
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/add',
      body,
      { headers }
    );
  }
  editSchedule(
    id: any,
    managerName: string,
    JobDescription: string,
    questions: any[],
    cutOff: number,
    duration: number
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = {
      id: id,

      Managername: managerName,

      JobDescription: JobDescription,

      questions: questions,

      cutoff: cutOff,

      durations: duration,
    };

    console.log('data', body);

    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/edit_question',

      body,

      { headers }
    );
  }
  //post questions by manager
  postquestions_by_Manager(dataToSave: any): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = dataToSave;
    console.log('see here', body);
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/add',
      body,
      { headers }
    );
  }

  updatequestions(
    Managername: string,

    fileName: string,

    questions: any[],

    duration: number,

    cutoff: number
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const data = {
      Managername: Managername,

      fileName: fileName,

      questions: questions,

      cutoff: cutoff,

      durations: duration,
    };

    console.log('dt', data);

    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/editdata',

      data,

      { headers }
    );
  }

  //update questions in question db
  updateQuestion(
    id: any,
    question: any,
    questionType: any,
    options: any,
    skills: any,
    Difficulty_Level: any,
    answer: any
  ): Observable<any> {
    // console.log('body', data);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const data = {
      id: id,
      question: question,
      questionType: questionType,
      options: options,
      skills: skills,
      Difficulty_Level: Difficulty_Level,
      answer: answer,
    };

    // const body = {};
    console.log('received response', data);
    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/update_question',
      data,
      { headers }
    );
  }

  //delete questions in questionDb

  deleteQuestion(id: string, skills: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    const body = { id: id, skills: skills };

    return this.http.delete(
      `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/deletequestions`,
      {
        headers: headers,
        body: body,
      }
    );
  }
  // deletetabledata(Managername: String, fileName: String): Observable<any> {
  //   const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  //   const body = { Managername: Managername, fileName: fileName };
  //   console.log('delete data sevice', body);

  //   return this.http.post(
  //     `https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/delete_tabledata`,
  //     body,
  //     {
  //       headers,
  //     }
  //   );
  // }

  // Filter candidate name

  filterCandidate(
    candidateName: string | undefined,
    results: any
  ): Observable<any> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });

    const body = { candidateName, results };

    return this.http.post<any>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/filtercandidate',
      body,
      {
        headers,
      }
    );
  }

  // Function to get the latest version
  getLatestVersion(Managername: string, Skill: string[]): Observable<number> {
    const headers = new HttpHeaders({ 'content-Type': 'application/json' });
    const body = { Managername: Managername, Skill: Skill };

    return this.http.post<number>(
      'https://twunbrsoje.execute-api.ap-south-1.amazonaws.com/dev/fileVersion',
      body,
      {
        headers,
      }
    );
  }

  //Editicon

  getDash1Data(
    selectedSkill: string[],
    FinalizedQuestions: string[]
  ): Observable<any> {
    const queryParams = {
      selectedSkill: JSON.stringify(selectedSkill),
      selectedQuestions: JSON.stringify(FinalizedQuestions),
    };

    return this.http.get('/dash1', { params: queryParams });
  }

  setSkill(Skill: any[]): void {
    this.Skill = Skill;
  }

  getSkill(): any[] {
    return this.Skill;
  }
}
