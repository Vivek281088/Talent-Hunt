import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TableService } from 'src/app/services/table.service';
import { Table } from 'primeng/table';
import { ManagernameService } from 'src/app/services/managername.service';
import { NewScheduleService } from 'src/app/services/new-schedule.service';

@Component({
  selector: 'app-manager-profile',
  templateUrl: './manager-profile.component.html',
  styleUrls: ['./manager-profile.component.scss'],
  providers: [MessageService],
})
export class ManagerProfileComponent {
  items: MenuItem[] | undefined;
  todayDate!: string;
  editManagerForm!: FormGroup;
  formSubmitted: boolean = false;
  managerData: any;

  //schedules
  globalSearchValue!: string;
  viewQuestionSidebar: boolean = false;
  FinalizedQuestions!: any;
  scheduleData: any;

  //assessment
  candidateList: any[] = [];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private tableService: TableService,
    private managernameService: ManagernameService,
    private router: Router,
    private newScheduleService: NewScheduleService
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

  ngOnInit() {
    
    this.getManagerData();
    this.getCandidateData();
    this.todayDate = this.formattedDate(new Date());
    console.log('Date--------', this.todayDate);

    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Manager', routerLink: '/manage-managers' },
      { label: 'Manager Profile', routerLink: '/managerProfile' },
    ];
  }
  getManagerData() {
    this.managerData = this.newScheduleService.getManagerProfileData();
    console.log('Get manager Data', this.managerData);

    // Set values for the form controls
    this.editManagerForm.setValue({
      employeeId: this.managerData.empid,
      managerName: this.managerData.managerName,
      email: this.managerData.email,
      phone: this.managerData.phoneNo,
      department: this.managerData.department,
      location: this.managerData.managerLocation,
    });
    console.log('Form Values', this.editManagerForm.value);
    console.log('Manager Name', this.editManagerForm.value.managerName);


    this.managernameService
      .postManagerName(this.editManagerForm.value.managerName)
      .subscribe((response) => {
        console.log('ManagerData---->', response);
        this.scheduleData = response.result1;
        console.log('ManagerScheduleData---->', this.scheduleData);
      });
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
  updateManager() {}
  closeManagerProfile() {
    this.router.navigate(['/manage-managers']);
  }

  //schedules
  

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

  onViewClick(questions : any) {
    this.viewQuestionSidebar = true;
        this.FinalizedQuestions = questions
        console.log('View questions :', this.FinalizedQuestions);
      
  }
  getSelectedOptions(selected_Option: any, option: any) {
    console.log("Function Working")
    if (option.includes(selected_Option)) {
      console.log('correct answer');
      return 'correctAnswer';
    } else {
      return 'wrongAnswer';
    }
  }
  getLabel(index: number) {
    return String.fromCharCode(65 + index);
  }

  //Assessment
  getCandidateData() {
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
