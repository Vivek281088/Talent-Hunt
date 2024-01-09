import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NewScheduleService {
  newScheduleData:any;

  constructor() { }

  setNewScheduleData(newScheduleData:any){
    this.newScheduleData=newScheduleData;

  }
  getNewScheduleData(){
    return this.newScheduleData;

  }
}
