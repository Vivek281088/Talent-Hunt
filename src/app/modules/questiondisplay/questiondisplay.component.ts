import { Component } from '@angular/core';
import { ManagernameService } from 'src/app/services/managername.service';

@Component({
  selector: 'app-questiondisplay',
  templateUrl: './questiondisplay.component.html',
  styleUrls: ['./questiondisplay.component.scss']
})
export class QuestiondisplayComponent {

  FinalizedQuestions : any[] =[]

  constructor(
    private managernameService: ManagernameService 
  ) {
    
  }

  ngOnInit() {
    
    this.FinalizedQuestions = this.managernameService.getFinalizedQuestions();
  }


}
