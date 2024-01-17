import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { Router } from '@angular/router';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { AuthService } from 'src/app/Guard/auth.service';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';
import { ReviewerService } from 'src/app/services/reviewer.service';
//import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ConfirmationService, MessageService, ConfirmEventType, MenuItem } from 'primeng/api';
@Component({
  selector: 'app-assessment-table',
  templateUrl: './assessment-table.component.html',
  styleUrls: ['./assessment-table.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AssessmentTableComponent {
  sidebarVisible2: boolean = false;

  [x: string]: any;
  questionType: string[] = ['Radio', 'Multiple Choice', 'Text'];

  status: string[] = [
    'Shortlisted',
    'Rejected',
    'Awaiting Eval',
    'Cancelled',
    'Scheduled',
  ];

  items: MenuItem[] | undefined;
  position: string = 'center';

  candidateNames: any[] = [];
  name: boolean = true;
  finalizedEmail!: string;
  candidateList: any[] = [];
  finalizedManagerEmail!: string;
  managerEmail!: string;
  selectedCandidates: any[] = [];
  score: number | null = null;
  result: string = '';
  candidateId!: Date | null;
  candidateNameOptions: any[] = [];
  candidateName: any[] = [];
  email_Managername!: string;
  view_Managername!: string;
  email_Status!: string;
  email_Filename!: string;
  questions: any;
  cutoff!: number;
  durations!: number;
  roles: string = 'user';
  skillSet: any[] = [];
  Skill: any;
  managerOption: any[] = [];
  overlayVisible = false;
  globalSearchValue !: string;

  toggle() {
    this.overlayVisible = !this.overlayVisible;
  }

  todayDate!: string;

  // candidateForm !: FormGroup;
  constructor(
    private tableService: TableService,
    private managernameService: ManagernameService,
    private skillsdropdownservice: SkillsdropdownService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private candidateService: CandidateAssessmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    // this.candidateForm = this.formBuilder.group({
    //   candidateName: ['', Validators.required],
    //   candidateEmail: ['', Validators.required,Validators.email],
    //   candidatePhone: [null]
    // });
  }

  ngOnInit() {
    //this.auth.isLoggedIn=true;

    //for candidate
    // this.finalizedEmail =
    //   this.managernameService.getCandidateAssessment_Email();
    // console.log('a', this.finalizedEmail);

    //for manager
    // this.finalizedManagerEmail = this.managernameService.getManagerName_Email();
    // console.log('manager-email--', this.finalizedManagerEmail);

    this.todayDate = this.formattedDate(new Date());
    console.log('Date--------', this.todayDate);
    this.loadManagerNames();
    this.getSkillSet();

    this.loadCandidateTableData();
    this.getCandidatename();

    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Assessment', routerLink: 'dashboard' },
    ];
  }

  // confirmPosition(position: string) {
  //   this.position = position;

  //   this.confirmationService.confirm({
  //       message: 'Do you want to cancel this invite?',
  //       header: 'Cancel Invite',
  //       icon: 'pi pi-info-circle',
  //       accept: () => {
  //           this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have cancelled the invite successfully' });
  //       },
  //       reject: (type: ConfirmEventType) => {
  //           switch (type) {
  //               case ConfirmEventType.REJECT:
  //                   this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
  //                   break;
  //               case ConfirmEventType.CANCEL:
  //                   this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
  //                   break;
  //           }
  //       },
  //       key: 'positionDialog'
  //   });
  // }

  getSelectedOptions(selected_Option: any, option: any) {
    if (selected_Option.includes(option)) {
      console.log('correct answer');
      return 'correctAnswer';
    } else {
      return 'wrongAnswer';
    }
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



  getFormattedSkills(skills: any): {
    skills: string[];
    remainingCount: number;
  } {
    const maxLength = 15;

    let result: string[] = [];
    let totalLength = 0;

    for (const skill of skills) {
      if (totalLength + skill.length <= maxLength) {
        // Include the skill in the result
        result.push(skill);
        totalLength += skill.length;
      } else {
        // Stop adding skills if the limit is reached
        break;
      }
    }

    // Calculate the count of remaining skills
    const remainingCount = skills.length - result.length;

    return { skills: result, remainingCount: remainingCount };
  }
  remainaingSkills(skills: any, count: number): string[] {
    return skills.slice(-count);
  }
  clear(table: Table) {
    table.clear();
  }

  getCandidatename(): void {
    this.tableService.getExistingCandidate().subscribe((data) => {
      // Use a Set to store unique candidate email addresses
      const uniqueEmails = new Set<string>();
      // Use an array to store unique candidate names
      const uniqueCandidateNames: any[] = [];
      // Iterate through the data and filter duplicates based on email addresses
      data.forEach(
        (candidate: { candidateName: string; candidateEmail: string }) => {
          if (!uniqueEmails.has(candidate.candidateEmail)) {
            uniqueEmails.add(candidate.candidateEmail);
            uniqueCandidateNames.push(candidate.candidateName);
          }
        }
      );
      // Assign the unique candidate names to your variable
      this.candidateNames = uniqueCandidateNames;
      console.log('candidate', data);
      console.log(this.candidateNames);
    });
  }

  loadCandidateTableData(){
    this.managernameService.getCandidateStatus().subscribe((data) => {
      this.candidateList = data;
      console.log('Candidate Data', data);
    });
  }

  loadAssessmentData() {
    this.managernameService.getCandidateStatus().subscribe((data) => {
      // console.log("arole",a)
      this.candidateList = data;
      console.log('sapna', data);
    });
  }
  getSkillSet() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;
      console.log('skillset', this.skillSet);
    });
  }

  loadManagerNames() {
    this.managernameService.getclientManagerName().subscribe((data) => {
      this.managerOption = data;
      console.log('sapna', data);
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
  confirmPosition(position: string) {
    this.position = position;

    this.confirmationService.confirm({
      message: 'Do you want to cancel this invite?',
      header: 'Cancel Invite',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have cancelled the invite successfully',
        });
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: 'warn',
              summary: 'Cancelled',
              detail: 'You have cancelled',
            });
            break;
        }
      },
      key: 'positionDialog',
    });
  }

  ////////////////////////view icon//////////////
}