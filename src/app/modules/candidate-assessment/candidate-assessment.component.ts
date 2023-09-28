
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

  candidateName: string = 'John Doe'; // Replace with the candidate's actual name

  constructor(private router: Router) {}

  startAssessment() {
    // Navigate to the assessment page when the "Continue" button is clicked
    this.router.navigate(['/assessment']);
  }

}






  