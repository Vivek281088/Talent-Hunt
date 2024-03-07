import { Component } from '@angular/core';

import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'primeng/table';
import { ManagernameService } from 'src/app/services/managername.service';
import { NewScheduleService } from 'src/app/services/new-schedule.service';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss'],
  providers: [MessageService]
})
export class CandidateProfileComponent {
  items: MenuItem[] | undefined;
  todayDate!: string;
  editCandidateForm!: FormGroup;
  formSubmitted: boolean = false;

  //schedules
  Tdata: any[] = [];
  globalSearchValue!: string;
  viewQuestionSidebar : boolean=false;
  FinalizedQuestions !:any;

  //assessment
  candidateAssessmentData: any[] = [];
  candidateData : any;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private tableService: TableService,
    private managernameService : ManagernameService,
    private router: Router,
    private newScheduleService: NewScheduleService
  ) {
    this.editCandidateForm = this.fb.group({
      employeeId: [{value:'',disabled:true} ,[Validators.required]],
      candidateName: [{value:'',disabled:true} ,[Validators.required]],
      email: [{value:null,disabled:true}, [Validators.required, Validators.email]],
      phone: [{value:null,disabled:true} ,[Validators.required]],
      department: [{value:'',disabled:true} ],
      location: [{value:'',disabled:true}]
    });
  }

  ngOnInit(){

    this.getCandidateProfileData();
    this.todayDate = this.formattedDate(new Date());
    console.log('Date--------', this.todayDate);
  
    this.items = [
      { label: 'Home', routerLink: '/dashboard', icon: 'pi pi-home' },
      { label: 'Candidate', routerLink: '/manage-candidates' },
      { label: 'Candidate Profile', routerLink: '/candidateProfile' },
    ];

  }

  formattedDate(date: Date) {
    const months: string[] = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const month: string = months[date.getMonth()];
    const day: number = date.getDate();
    const year: number = date.getFullYear();
    const formatDate: string = `${month} ${day}, ${year}`;

    return formatDate;
  }
  cancelButton() {
    this.editCandidateForm.reset();
    this.editCandidateForm.markAsPristine();
    this.editCandidateForm.markAsUntouched();
    this.formSubmitted = false;
  }
  updateManager(){

}
closeManagerProfile() {
  this.router.navigate(['/manage-candidates']);
}

//schedules


getFormattedSkills(skills: any): {
  skills: string[];
  remainingCount: number;
} {
  const maxLength = 16;

  let result: string[] = [];
  let totalLength = 0;

  for (const skill of skills) {
    if (totalLength + skill.length <= maxLength) {
      result.push(skill);
      totalLength += skill.length;
    } else {
      break;
    }
  }
  const remainingCount = skills.length - result.length;

  return { skills: result, remainingCount: remainingCount };
}
remainaingSkills(skills: any, count: number): string[] {
  return skills.slice(-count);
}



//Assessment
getCandidateProfileData(){

  // this.candidateData = this.newScheduleService.getCandidateProfileData();
  // console.log('Get Candidate Data', this.candidateData);
 
  // Set values for the form controls
 this.editCandidateForm.setValue({
   employeeId: sessionStorage.getItem('CandiateProfileId'),
   candidateName: sessionStorage.getItem('CandiateProfileName'),
   email: sessionStorage.getItem('CandiateProfileEmail'),
   phone: sessionStorage.getItem('CandiateProfilePhone'),
   department: sessionStorage.getItem('CandiateProfileDepartment'),
   location: sessionStorage.getItem('CandiateProfileLocation'),
 });

  console.log('Form Values', this.editCandidateForm.value);
  console.log('Candidate Email--', this.editCandidateForm.value.email);


  this.managernameService
      .postCandidateEmail(this.editCandidateForm.value.email)
      .subscribe((response) => {
        console.log('Assessment Data---->', response);
        this.candidateAssessmentData = response.filter((data: { email_Filename: any; })=>(data.email_Filename!=null));
      });
}
clear(table: Table) {
  table.clear();
}
getResultClass(result: string): string {
  if (result == 'Shortlisted') {
    return 'Shortlisted';
  } else if (result == 'Rejected') {
    return 'Rejected';
  } else if (result == 'Awaiting Eval') {
    return 'Awaiting ';
  } else if (result == 'Cancelled') {
    return 'Cancelled';
  } else {
    return 'Scheduled';
  }
}

}
