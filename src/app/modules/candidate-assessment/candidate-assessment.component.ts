import { AfterViewInit, Component, OnInit, } from '@angular/core';
import { MessageService } from 'primeng/api';




@Component({
  selector: 'app-candidate-assessment',
  templateUrl: './candidate-assessment.component.html',
  styleUrls: ['./candidate-assessment.component.scss'],
  providers: [MessageService]
})
export class CandidateAssessmentComponent implements AfterViewInit{

  constructor(private messageService: MessageService) {}
  ngAfterViewInit(): void {
    console.log("onInit")
    this.show();
  }
 
    show() {
        this.messageService.add({ severity: 'info', detail: 'You have been assigned a new assessment on 23-Dec-2023' , sticky: true});
    }
}
