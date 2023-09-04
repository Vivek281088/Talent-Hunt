import { Component, OnInit } from '@angular/core';
import { ManagernameService } from 'src/app/services/managername.service';

@Component({
  selector: 'app-questiondisplay',
  templateUrl: './questiondisplay.component.html',
  styleUrls: ['./questiondisplay.component.scss']
})
export class QuestiondisplayComponent implements OnInit{

  FinalizedQuestions: any[] = []
  
  duration: number = 0;

  cuttoff: number = 0;

  constructor(
    private managernameService: ManagernameService,
   
  
  ) {}

  ngOnInit() {
    
    this.FinalizedQuestions = this.managernameService.getFinalizedQuestions();
     this.duration = this.managernameService.getDuration();
  this.cuttoff = this.managernameService.getCuttoff();
   
  }

  //  onSaveClick() {
   
  //   const dataToSave = [
  //     this.FinalizedQuestions,
  //     { duration: this.duration },
  //     { cuttoff: this.cuttoff },
  //   ];

  //   console.log('Data to Save:', dataToSave);

  // }


}
