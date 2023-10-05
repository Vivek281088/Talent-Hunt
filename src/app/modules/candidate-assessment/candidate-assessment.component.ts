
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { TableService } from 'src/app/services/table.service';

import { ManagernameService } from 'src/app/services/managername.service';

import { Router } from '@angular/router';

import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';



@Component({
  selector: 'app-candidate-assessment',
  templateUrl: './candidate-assessment.component.html',
  styleUrls: ['./candidate-assessment.component.scss']
})
export class CandidateAssessmentComponent   {

  candidateName: string = 'Aishwarya'; 
  assessmentFilename: string = 'JAVA_AWS_V1';

  cols!: Column[];

  candidateList: any[] = [];

   showCandidateEmail !: string;
  
  finalizedEmail !:string;


  constructor(private router: Router,
    private managernameService: ManagernameService ) {



  }

  ngOnInit(): void {
   this.finalizedEmail= this.managernameService.getCandidateAssessment_Email();
   console.log ( "hi",this.finalizedEmail);
  }

  startAssessment() {
    this.router.navigate(['/assessment-display']);
  }

}


interface Column {
  field: string;

  header: string;
}