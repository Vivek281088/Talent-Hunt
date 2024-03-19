import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { Router } from '@angular/router';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { AuthService } from 'src/app/Guard/auth.service';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';
import { ReviewerService } from 'src/app/services/reviewer.service';
 
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DataService } from 'src/app/services/data.service';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
import { debounceTime, forkJoin } from 'rxjs';
import { ThreeDigitDirective } from './directives/three-digit.directive';
import * as moment from 'moment-timezone';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
 
 
@Component({
  selector: 'app-schedulepage',
  templateUrl: './schedulepage.component.html',
  styleUrls: ['./schedulepage.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class SchedulepageComponent implements OnInit {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  skillSet: any[] = [];
  managerName: string = '';
  Tdata: any[] = [];
  FinalizedQuestions: any[] = [];
  Skill: any[] = []; //for edit
  selectedQuestions: any[] = [];
  cutoff!: number;
  durations!: number;
  email_Managername!: string;
  email_Status!: string;
  email_Filename!: string;
  candidateNames: any[] = [];
  selectedCandidates: any[] = [];
  candidateList: any[] = [];
  questions: any;
  editManagername!: string;
  editFilename!: any;
  result: string = '';
  score: number | null = null;
  candidatePassword: string = 'abc123';
  candidateConfirmPassword: string = 'abc123';
  managerEmail!: string;
  question!: string;
  candidateSkill!: any;
  position: string = 'center';
 
  candidateId!: Date | null;
 
  todayDate!: Date;
  scheduleName!: string;
  manager!: string;
  selectedSkills!: any[];
  cutOff!: number;
  duration!: number;
  viewQuestionSidebar: boolean = false;
  sendQuestionCardVisible: boolean = false;
  visible: boolean = false;
 
  roles: string = 'user';
  candidateData: any;
  managerData: any;
  globalSearchValue!: string;
  addnewScheduleForm!: FormGroup;
  formSubmitted: boolean = false;
  isScheduleInvalid: boolean = false;
 
  constructor(
    private tableService: TableService,
    private managernameService: ManagernameService,
    private skillsdropdownservice: SkillsdropdownService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private fb: FormBuilder,
    // reviewer
    private messageService: MessageService,
    private dataService: DataService,
    private newScheduleService: NewScheduleService
  ) {
    const nonWhitespaceRegExp: RegExp = new RegExp('\\S');
    this.addnewScheduleForm = this.fb.group({
      scheduleName: [
        '',
        [
          Validators.required,
          Validators.pattern(nonWhitespaceRegExp),
          this.maxLengthValidator(30),
          this.minLengthValidator(6),
        ],
      ],
      managerName: [
        '',
        [
          Validators.required,
          this.maxLengthValidator(30),
          this.minLengthValidator(6),
        ],
      ],
      skills: ['', [Validators.required]],
      // cutoff: [
      //   null,
      //   [Validators.required, Validators.max(100), Validators.min(1)],
      // ],
      // duration: [
      //   null,
      //   [
      //     Validators.required,
      //     Validators.max(180),
      //     Validators.min(30),
      //     Validators.pattern(nonWhitespaceRegExp),
      //   ],
      // ],
    });
    this.addnewScheduleForm
      .get('scheduleName')!
      .valueChanges.pipe(debounceTime(1500))
      .subscribe(() => {
        this.isScheduleInvalid =
          this.addnewScheduleForm.get('scheduleName')!.invalid;
      });
  }
  ngOnInit() {
    this.items = [{ label: 'Schedules', routerLink: '/dashboard' }];
    sessionStorage.setItem('Component-Name', 'assessment'); //for sidebar
 
    this.todayDate = new Date();
    // console.log('Date--------', this.todayDate);
 
    this.home = { icon: 'pi pi-home', routerLink: '/dashboard', label: 'Home' };
 
    this.loadSkills();
    this.loadManagerNames();
    this.existingData();
    this.getUniqueCandidatedata();
    this.getCandidatename();
  }
  maxLengthValidator(maxLength: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.length > maxLength) {
        return { maxLengthExceeded: true };
      }
      return null;
    };
  }
  minLengthValidator(minLength: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (control.value && control.value.length < minLength) {
        return { minLength: true };
      }
      return null;
    };
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
 
  getCandidatename(): void {
    this.tableService.getExistingCandidate().subscribe((data) => {
      const uniqueEmails = new Set<string>();
      const uniqueCandidateNames: any[] = [];
      data.forEach(
        (candidate: { candidateName: string; candidateEmail: string }) => {
          if (!uniqueEmails.has(candidate.candidateEmail)) {
            uniqueEmails.add(candidate.candidateEmail);
            uniqueCandidateNames.push(candidate.candidateName);
          }
        }
      );
      this.candidateNames = uniqueCandidateNames;
      console.log('candidate', this.candidateNames);
      console.log(this.candidateNames);
    });
  }
  onClearClick(dt2: Table) {
    this.globalSearchValue = '';
    dt2.clear();
  }
  existingData() {
    this.tableService.getExistingData().subscribe((data) => {
      console.log('table data ----------------', data);
      this.Tdata = data;
    });
  }
 
  loadManagerNames() {
    this.managernameService.getclientManagerData().subscribe((response) => {
      this.managerData = response;
      // .map(
      //   (manager: { managerName: string }) => manager.managerName
      // );
      console.log('Client Manager Details', response);
    });
  }
 
  cancelButton() {
    this.visible = false;
    this.formSubmitted = false;
    this.addnewScheduleForm.markAsPristine();
    this.addnewScheduleForm.markAsUntouched();
    this.addnewScheduleForm.reset();
 
    // this.resetData();
    console.log('Manager after cancel', this.manager);
  }
 
  createButton() {
    this.formSubmitted = true;
    if (this.addnewScheduleForm.valid) {
      const formData = this.addnewScheduleForm.value;
      console.log('Form Data:', formData);
 
      // this.sendData();
      console.log('sended');
      const dataToSend = {
        scheduleName: formData.scheduleName,
        manager: formData.managerName,
        selectedSkills: formData.skills,
       // cutOff: formData.cutoff,
        //duration: formData.duration,
      };
      this.newScheduleService.setNewScheduleData(dataToSend);
      sessionStorage.setItem('scheduleName', formData.scheduleName);
      sessionStorage.setItem('manager', formData.managerName);
      this.dataService.savedata(formData.skills);
      //sessionStorage.setItem('cutoff', formData.cutoff);
      //sessionStorage.setItem('duration', formData.duration);
      // const dataToSend={
      this.router.navigate(['/new-schedule']);
    }
  }
 
  closeSidebar() {
    this, (this.viewQuestionSidebar = false);
  }
  onViewClick(data: any) {
    this.viewQuestionSidebar = true;
    console.log('View Data', data);
    const observables = data.questions.map((questionId: string) =>
      this.newScheduleService.getIndividualQuestion(questionId)
    );
    forkJoin(observables).subscribe((responses: any) => {
      this.FinalizedQuestions = responses;
      console.log('Updated Total Question data--', this.FinalizedQuestions);
    });
 
    console.log('questions :', this.FinalizedQuestions);
  }
 
  getSelectedOptions(selected_Option: any, option: any) {
    if (option.includes(selected_Option)) {
      return 'correctAnswer';
    } else {
      return 'wrongAnswer';
    }
  }
  getLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }
 
  handleEditIconClick(data: any) {
    // debugger;
    console.log('getting edit ', data);
    this.Skill = data.Skill;
 
    this.selectedQuestions = data.questions;
    this.cutoff = data.cutoff;
    this.durations = data.durations;
    this.editManagername = data.Managername;
    this.editFilename = data.JobDescription;
    sessionStorage.setItem('scheduleName', data.JobDescription),
      sessionStorage.setItem('manager', data.Managername),
      sessionStorage.setItem('cutoff', data.cutoff),
      sessionStorage.setItem('duration', data.durations);
    sessionStorage.setItem('FinalizedQuestion', data.questions);
    sessionStorage.setItem('SelectedSkill', data.Skill);
    // this.managernameService.setCutoff(this.cutoff);
    console.log('edit cutoff', this.cutoff);
    // this.managernameService.setDuration(this.durations);
    // this.skillsdropdownservice.setSkill(this.Skill);
    console.log('edit skill', this.Skill);
    console.log('edit questions', this.selectedQuestions);
    this.managernameService.setFinalizedQuestions(this.selectedQuestions);
    this.managernameService.setManagerName(this.editManagername);
    this.managernameService.setFileName(this.editFilename);
    sessionStorage.setItem('scheduleName', this.editFilename);
    sessionStorage.setItem('boolean', 'true');
    sessionStorage.setItem('SaveOrEdit', 'Edit');
    sessionStorage.setItem('scheduleId', data.id);
    this.router.navigate(['new-schedule']);
  }
 
  showEmailSubmitted() {
    this.messageService.add({
      severity: 'success',
 
      summary: 'Success',
 
      detail: 'Invite Sent Successfully',
    });
  }
 
  openquestiondialog() {
    this.visible = true;
  }
 
  // Loading skills for dropdown in add question
  loadSkills() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;
      data.forEach((element: any) => {
        this.skillSet.push({ skill: element });
      });
      console.log('Skill Set', data);
    });
  }
 
  onSendQuestionClick(data: any) {
    this.sendQuestionCardVisible = true;
    this.getUniqueCandidatedata();
    console.log('Manager Table Data', data);
    this.email_Managername = data.Managername;
    this.email_Filename = data.JobDescription;
    this.cutoff = data.cutoff;
    this.durations = data.durations;
    this.questions = data.questions;
    this.Skill = data.Skill;
    console.log('Manager name---', this.email_Managername);
    console.log('File name---', this.email_Filename);
    this.email_Status = 'Not Started';
  }
 
  endTime!: string;
  inviteCandidate() {
    console.log('Selected Candidates', this.selectedCandidates);
 
    this.selectedCandidates.forEach((selectedCandidate) => {
      const existingCandidate = this.candidateData.find(
        (candidate: { candidateEmail: any }) =>
          candidate.candidateEmail === selectedCandidate.candidateEmail
      );
      console.log('matched candidate', existingCandidate);
 
      //rest data
      this.score = null;
      this.result = 'Awaiting Eval';
      const date = Date.now();
      this.candidateId = new Date(date);
const loginManagerid = sessionStorage.getItem('loginManagerId')
console.log('Login Manager id', loginManagerid)
      if (existingCandidate) {
        const currentutcdate = new Date();
        const istMoment = moment.utc(currentutcdate).tz('Asia/Kolkata');
        this.endTime = istMoment.format('YYYY-MM-DD HH:mm:ss.SSSSSS');
        this.tableService
          .postExistingCandidateDetails(
            this.candidateId,
            existingCandidate.empid,
            this.email_Managername,
            existingCandidate.candidateName,
            existingCandidate.candidateEmail,
            existingCandidate.candidatePhone,
            this.email_Status,
            this.email_Filename,
            this.questions,
            this.score,
            this.result,
            this.cutoff,
            this.durations,
            existingCandidate.password,
            existingCandidate.confirmPassword,
            this.roles,
            this.Skill,
            existingCandidate.department,
            existingCandidate.candidate_location,
            loginManagerid,
            this.endTime
          )
          .subscribe((data) => {
            console.log('Stored data for existing candidate:', data);
            this.candidateData.push(data);
          });
      }
    });
    setTimeout(() => {
      this.closeInviteDialog();
      this.showEmailSubmitted();
    }, 1000);
  }
 
  closeInviteDialog() {
    this.sendQuestionCardVisible = false;
    this.selectedCandidates = [];
  }
  getUniqueCandidatedata() {
    this.newScheduleService
      .getUniqueCandidateDetails()
      .subscribe((response) => {
        this.candidateData = response.filter(
          (candidate: any) => candidate !== null
        );
        console.log('Candidate Data---', this.candidateData);
      });
  }
  newSchedule() {
    this.visible = true;
    this.formSubmitted = false;
    this.addnewScheduleForm.markAsPristine();
    this.addnewScheduleForm.markAsUntouched();
    this.addnewScheduleForm.reset();
    sessionStorage.setItem('SaveOrEdit', 'Save');
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
 
  selectingCandidate() {
    console.log('Selected', this.selectedCandidates);
  }
  selectedDeleteSchedule: any;
  deleteSchedule() {
    console.log('Deleteting Schedule.....', this.selectedDeleteSchedule);
    for (let Schedule of this.selectedDeleteSchedule) {
      this.managernameService
        .deleteSchedule(Schedule.id)
        .subscribe((response) => {
          console.log('Deleted Candidate.....', Schedule.JobDescription);
        });
    }
 
    setTimeout(() => {
      // this.deleteMessage();
      this.existingData();
      this.selectedDeleteSchedule = [];
    }, 1500);
  }
 
  // deleteMessage() {
  //   this.messageService.add({
  //     severity: 'success',
  //     summary: 'Deleted',
  //     detail: 'Schedule Deleted successfully',
  //   });
  // }
 
  confirmPosition(position: string) {
    this.position = position;
 
    this.confirmationService.confirm({
      message: 'Do you want to delete the schedule?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted',
          detail: 'Schedule Deleted Successfully',
        });
        this.deleteSchedule();
      },
      key: 'positionDialog',
    });
  }
 
  toggleSelection(data: any) {
    if (!data || !data.id) {
      return;
    }
    data.selection = !data.selection;
 
    if (data.selection) {
      console.log('Selected schedule:', this.selectedDeleteSchedule);
    } else {
      this.selectedDeleteSchedule = this.selectedDeleteSchedule.filter(
        (selected: any) => selected.id !== data.id
      );
      console.log('Selected ----schedule :', this.selectedDeleteSchedule);
    }
  }
  selectAll() {
    console.log('Selected all Schedule:', this.selectedDeleteSchedule);
  }
}
 