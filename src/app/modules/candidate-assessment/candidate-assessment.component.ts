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
  // assessmentData: any = [
  //   {
  //     testName: 'Angular Full Stack for Junior developers',
  //     skills: ['AWS', 'Java'],
  //     cutoff: 75,
  //     duration: 10,
  //     validity: '24-JAN',
  //   },
  //   {
  //     testName: 'NodeJs Dev',
  //     skills: ['Node.Js', 'Java'],
  //     cutoff: 65,
  //     duration: 15,
  //     validity: '28-JAN',
  //   },
  // ];
  constructor(
    private messageService: MessageService,
    private managernameService: ManagernameService,
    private candidateAssessmentService: CandidateAssessmentService,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.show();
    this.candidateEmail = sessionStorage.getItem("candidateEmail")
     // this.managernameService.getCandidateAssessment_Email();
      console.log("candidate Email ==========================="  , this.candidateEmail);
    console.log('Mail Id', this.candidateEmail);
    // localStorage.setItem('Candidateemail', this.candidateEmail);
    // this.candidateEmail = localStorage.getItem("Candidateemail");
    this.getAssessmentdatabyEmail();
  }

  getAssessmentdatabyEmail() {
    this.candidateAssessmentService
      .getCandidatedata_by_Email(this.candidateEmail)
      .subscribe((response) => {
        this.assessmentData = response;
        console.log('candidate data', this.assessmentData);

        
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
