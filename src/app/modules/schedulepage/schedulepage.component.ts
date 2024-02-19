import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { Router } from '@angular/router';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { AuthService } from 'src/app/Guard/auth.service';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';
import { ReviewerService } from 'src/app/services/reviewer.service';
import { MessageService } from 'primeng/api';
import { FormControl } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { DataService } from 'src/app/services/data.service';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
import { forkJoin } from 'rxjs';
@Component({
  selector: 'app-schedulepage',
  templateUrl: './schedulepage.component.html',
  styleUrls: ['./schedulepage.component.scss'],
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
  view_Managername!: string;
  view_Filename!: string;
  editManagername!: string;
  editFilename!: any;
  result: string = '';
  score: number | null = null;
  candidatePassword: string = 'abc123';
  candidateConfirmPassword: string = 'abc123';
  managerEmail!: string;
  question!: string;
  candidateSkill!: any;

  candidateId!: Date | null;

  todayDate!: string;
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

  
  constructor(
    private tableService: TableService,
    private managernameService: ManagernameService,
    private skillsdropdownservice: SkillsdropdownService,
    private router: Router,
    private fb: FormBuilder,
    // reviewer
    private messageService: MessageService,
    private dataService: DataService,
    private newScheduleService: NewScheduleService
  ) {
    this.addnewScheduleForm = this.fb.group({
      scheduleName: ['', [Validators.required]],
      managerName: ['', [Validators.required]],
      skills: ['', [Validators.required]],
      cutoff: [
        null,
        [Validators.required, Validators.max(100), Validators.min(1)],
      ],
      duration: [null, [Validators.required]],
    });
  }
  ngOnInit() {
    this.items = [{ label: 'Schedules' }];
    sessionStorage.setItem('Component-Name', 'assessment'); //for sidebar

    this.todayDate = this.formattedDate(new Date());
    console.log('Date--------', this.todayDate);

    this.home = { icon: 'pi pi-home', routerLink: '/dashboard', label: 'Home' };

    this.loadSkills();
    this.loadManagerNames();
    this.existingData();
    this.getCandidatename();
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
      console.log('candidate', data);
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
      this.managerData = response.map(
        (manager: { managerName: string }) => manager.managerName
      );
      console.log('Client Manager Details', this.managerData);
    });
  }

  cancelButton() {
    console.log('gfgdfxcghcnghcycgh');
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
        cutOff: formData.cutoff,
        duration: formData.duration,
      };
      this.newScheduleService.setNewScheduleData(dataToSend);
      localStorage.setItem('scheduleName', formData.scheduleName);
      localStorage.setItem('manager', formData.managerName);
      this.dataService.savedata(formData.skills);
      localStorage.setItem('cutoff', formData.cutoff);
      localStorage.setItem('duration', formData.duration);
      // const dataToSend={
      this.router.navigate(['/new-schedule']);
    }
  }

  //Mail dialog

  candidateName!: string;
  candidateEmail!: string;
  candidatePhone: number | null = null;
  // cancelEmailPopup() {
  //   this.displayEmailDialog = false;
  //   this.selectedCandidates = [];
  //   this.resetForm();
  //   this.loadAssessmentData();
  //   this.getCandidatename();
  // }
  // resetForm() {
  //   this.candidateName = '';
  //   this.candidateEmail = '';
  //   this.candidatePhone = null;
  //   this.candidatePassword = '';
  //   this.candidateConfirmPassword = '';
  // }
  // sendEmail() {
  //   this.displayEmailDialog = false;
  //   // Reset the form data
  // }
  //view icon

  closeSidebar() {
    this, (this.viewQuestionSidebar = false);
  }
  onViewClick(ManagerName: string, JobDescription: string) {
    this.viewQuestionSidebar = true;

    this.tableService
      .getdataby_FileName(ManagerName, JobDescription)
      .subscribe((data) => {
        console.log('View Data', data);
        this.view_Managername = ManagerName;
        this.view_Filename = JobDescription;
        // this.FinalizedQuestions = data[0].questions;
        const observables = data[0].questions.map((questionId: string) =>
          this.newScheduleService.getIndividualQuestion(questionId)
        );
        forkJoin(observables).subscribe((responses: any) => {
          this.FinalizedQuestions = responses;
          console.log('Updated Total Question data--', this.FinalizedQuestions);
        });

        console.log('questions :', this.FinalizedQuestions);
      });
  }

  getSelectedOptions(selected_Option: any, option: any) {
    console.log('Function Working');
    if (option.includes(selected_Option)) {
      console.log('correct answer');
      return 'correctAnswer';
    } else {
      return 'wrongAnswer';
    }
  }
  getLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  handleEditIconClick(ManagerName: string, jobDescription: string) {
    // debugger;
    console.log('getting edit ', ManagerName, jobDescription);
    this.tableService
      .getdataby_FileName(ManagerName, jobDescription)
      .subscribe((data) => {
        console.log('View Data by edit', data);

        this.Skill = data[0].Skill;

        console.log(
          'skills in an array------------------------------------',
          this.Skill
        );

        this.selectedQuestions = data[0].questions;
        this.cutoff = data[0].cutoff;
        this.durations = data[0].durations;
        this.editManagername = ManagerName;
        this.editFilename = jobDescription;
        this.managernameService.setCutoff(this.cutoff);
        console.log('edit cutoff', this.cutoff);
        this.managernameService.setDuration(this.durations);
        this.skillsdropdownservice.setSkill(this.Skill);
        console.log('edit skill', this.Skill);
        console.log('edit questions', this.selectedQuestions);
        this.managernameService.setFinalizedQuestions(this.selectedQuestions);
        this.managernameService.setManagerName(this.editManagername);
        this.managernameService.setFileName(this.editFilename);
        localStorage.setItem('scheduleName', jobDescription);
        localStorage.setItem('boolean', 'true');

        this.router.navigate(['new-schedule']);
      });
  }

  showEmailSubmitted() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Invite Sent Successfully',
    });
  }

  showSubmitted() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Review Submitted Successfully',
    });

    console.log('updated', this.FinalizedQuestions);
  }

  openquestiondialog() {
    this.visible = true;
  }

  // Loading skills for dropdown in add question
  loadSkills() {

    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;
       console.log('Skill Set', data);
    });
  }

  addquestion() {
    this.router.navigate(['questiondb']);
  }

  onSendQuestionClick(managerName: string, jobdescription: string) {
    this.sendQuestionCardVisible = true;
    this.getUniqueCandidatedata();
    // this.managernameService.getCandidateStatus().subscribe((response) => {
    //   console.log('candidate name', response);
    //   this.candidateData = response;

    this.tableService
      .getdataby_FileName(managerName, jobdescription)
      .subscribe((data) => {
        console.log('Manager Table Data', data);
        this.email_Managername = data[0].Managername;
        this.email_Filename = data[0].JobDescription;
        this.cutoff = data[0].cutoff;
        this.durations = data[0].durations;
        this.questions = data[0].questions;
        this.Skill = data[0].Skill;
        console.log('Manager name---', this.email_Managername);
        console.log('File name---', this.email_Filename);
        this.email_Status = 'Not Started';
      });
  }

  inviteCandidate() {
    console.log('Manager name', this.email_Managername);
    console.log('File name', this.email_Filename);
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

      if (existingCandidate) {
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
            existingCandidate.candidate_location
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
        console.log('Candidate Data', this.candidateData);
      });
  }
  newSchedule() {
    this.visible = true;
    this.formSubmitted = false;
    this.addnewScheduleForm.markAsPristine();
    this.addnewScheduleForm.markAsUntouched();
    this.addnewScheduleForm.reset();
    console.log('Manager-----------', this.manager);
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
       this.deleteMessage();
       this.existingData();
       this.selectedDeleteSchedule = [];
     }, 1500);
  }

  deleteMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Deleted',
      detail: 'Schedule Deleted successfully',
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

// interface Column {
//   field: string;
//   header: string;
// }
