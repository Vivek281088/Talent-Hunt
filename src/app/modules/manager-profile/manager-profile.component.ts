import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'primeng/table';
import { ManagernameService } from 'src/app/services/managername.service';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.scss'],
  providers: [MessageService]
})
export class ManagerProfileComponent {
  items: MenuItem[] | undefined;
  todayDate!: string;
  editManagerForm!: FormGroup;
  formSubmitted: boolean = false;

  //schedules
  Tdata: any[] = [];
  globalSearchValue!: string;
  viewQuestionSidebar : boolean=false;
  FinalizedQuestions !:any;

  //assessment
  candidateList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private tableService: TableService,
    private managernameService : ManagernameService
  ) {
    this.editManagerForm = this.fb.group({
      employeeId: [null, [Validators.required]],
      managerName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      department: ['', [Validators.required]],
      location: ['', [Validators.required]],
    });
  }

  ngOnInit(){

    this.existingData();
    this.getCandidateData();
    this.todayDate = this.formattedDate(new Date());
    console.log('Date--------', this.todayDate);
  
    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Manager', routerLink: '/manage-managers' },
      { label: 'Manager Profile', routerLink: '/managerProfile' },
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
    this.editManagerForm.reset();
    this.editManagerForm.markAsPristine();
    this.editManagerForm.markAsUntouched();
    this.formSubmitted = false;
  }
  updateManager(){

}

//schedules
existingData() {
  this.tableService.getExistingData().subscribe((data) => {
    console.log('table data ----------------', data);
    this.Tdata = data;
  });
}

onSearchClick(dt2: Table) {
  this.globalSearchValue = '';
  dt2.clear();
}

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

onViewClick(ManagerName: string, JobDescription: string) {
  this.viewQuestionSidebar = true;
 

  this.tableService
    .getdataby_FileName(ManagerName, JobDescription)
    .subscribe((data) => {
      console.log('View Data', data);
      // this.view_Managername = ManagerName;
      // this.view_Filename = JobDescription;
      this.FinalizedQuestions = data[0].questions;
      console.log('questions :', this.FinalizedQuestions);
    });
}

//Assessment
getCandidateData(){
  this.managernameService.getCandidateStatus().subscribe((data) => {
    this.candidateList = data;
    console.log('Candidate data ----------------', data);
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
