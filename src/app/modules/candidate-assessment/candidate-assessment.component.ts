import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-candidate-assessment',
  templateUrl: './candidate-assessment.component.html',
  styleUrls: ['./candidate-assessment.component.scss'],
  providers: [MessageService]
})
export class CandidateAssessmentComponent implements AfterViewInit{

  visible: boolean = false;
  assessmentData: any=[{
    testName: 'Angular Full Stack for Junior developers',
    skills : ["AWS","Java"],
    cutoff : 75,
    duration: 10,
    validity : "24-JAN"
  },
  {
    testName: 'NodeJs Dev',
    skills : ["Node.Js","Java"],
    cutoff : 65,
    duration: 15,
    validity : "28-JAN"
  }];
  constructor(private messageService: MessageService) {}
  ngAfterViewInit(): void {
    console.log("onInit")
    this.show();
  }
 
    show() {
        this.messageService.add({ severity: 'info', detail: 'You have been assigned a new assessment on 23-Dec-2023' , sticky: true});
    }

    showAssessmentDialog(){
      this.visible = true;
    }

    cancelButton(){
      this.visible = false;
    }

    startAssessment(){
      
    }

}
