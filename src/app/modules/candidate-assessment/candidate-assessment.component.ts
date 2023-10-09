import { Component, OnInit } from '@angular/core';

import {  Router } from '@angular/router';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';


@Component({
  selector: 'app-candidate-assessment',
  templateUrl: './candidate-assessment.component.html',
  styleUrls: ['./candidate-assessment.component.scss'],
})
export class CandidateAssessmentComponent {
  candidateName: string = '';
  assessmentFilename: string = 'JAVA_AWS_V1';

  cols!: Column[];

  candidateList: any[] = [];

  showCandidateEmail!: string;

  finalizedEmail!: string;

  assessmentData!: any;

  constructor(
    private router: Router,
    private candidateService: CandidateAssessmentService
  ) {}

  ngOnInit(): void {
    this.finalizedEmail = 'barnibarnibarni@gmail.com';

    //  this.finalizedEmail= this.managernameService.getCandidateAssessment_Email();
    this.cols = [
      { field: 'email_Filename', header: 'File Name' },
      { field: 'email_Status', header: 'Status' },
    ];
    this.candidateService
      .getCandidatedata_by_Email(this.finalizedEmail)
      .subscribe((response) => {
        console.log('res', response);
        this.candidateList = response;
        console.log('candidateList', this.candidateList);
        this.candidateName = response[0].candidateName;
        console.log('candidateName', this.candidateName);
      });
  }

  startAssessment() {
    this.router.navigate(['/assessment-display']);
  }

  sendQuestions(data: any) {
    console.log('data', data);
    this.candidateService.setAssessmentData(data);

    this.router.navigate(['/assessment-display']);
  }
}

interface Column {
  field: string;

  header: string;
}
