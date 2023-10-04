
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


  constructor(private router: Router) {



  }

  ngOnInit(): void {
    // this.cols = [
    //   { field: 'manager', header: 'Manager' },

    //   { field: 'file name', header: 'File name' },

    //   { field: 'actions', header: 'Actions' },
    // ];
    
  }

  startAssessment() {
    
    this.router.navigate(['/assessment-display']);
  }

}






interface Column {
  field: string;

  header: string;
}