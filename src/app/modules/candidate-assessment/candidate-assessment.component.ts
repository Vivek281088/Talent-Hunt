import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';
import { ManagernameService } from 'src/app/services/managername.service';

@Component({
  selector: 'app-candidate-assessment',
  templateUrl: './candidate-assessment.component.html',
  styleUrls: ['./candidate-assessment.component.scss'],
  providers: [MessageService],
})
export class CandidateAssessmentComponent implements AfterViewInit {
  visible: boolean = false;
  candidateEmail!: string | null;
  assessmentData: any;
  constructor(
    private messageService: MessageService,
    private managernameService: ManagernameService,
    private candidateAssessmentService: CandidateAssessmentService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.show();
    this.candidateEmail = localStorage.getItem('candidateEmail');
    console.log('Mail Id', this.candidateEmail);
    this.getAssessmentdatabyEmail();
  }

 
  getAssessmentdatabyEmail() {
    this.candidateAssessmentService
      .getCandidatedata_by_Email(this.candidateEmail)
      .subscribe((response) => {
        this.assessmentData = response.filter((data: { email_Filename: any; }) => data.email_Filename!=null);
        console.log('candidate data /////////', this.assessmentData);
        

        
      });
  }

  show() {
    this.messageService.add({
      severity: 'info',
      detail: 'You have been assigned a new assessment on 23-Dec-2023',
      sticky: true,
    });
  }

  showAssessmentDialog(data: any) {
    console.log("Assessment Data", data);
    //setting the data for assessment page
    this.candidateAssessmentService.setAssessmentData(data);
    this.visible = true;
  }

  cancelButton() {
        this.visible = false;

  }

  startAssessment() {
    this.router.navigate(['candidatequestion']);
  }

  
}
