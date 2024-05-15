import { Component, EventEmitter, Input, OnInit, Output, inject  } from '@angular/core';
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
import { NewScheduleService } from 'src/app/services/new-schedule.service';
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
 
  //sidebar
  singleQuestion: any;
  totalQuestions !:any
  getQuestionService = inject(NewScheduleService);
  @Input() showSidebar !:boolean;
  @Input() previewQuestions !: any;
  @Output() hidePreview : EventEmitter<boolean> = new EventEmitter<boolean>();
 
  toggle() {
    this.overlayVisible = !this.overlayVisible;
  }
 
  todayDate!: Date;
 
  // candidateForm !: FormGroup;
  constructor(
    private tableService: TableService,
    private managernameService: ManagernameService,
    private skillsdropdownservice: SkillsdropdownService,
 
  ) {
  }
 
  ngOnInit() {
 
    sessionStorage.setItem('Component-Name', 'assessment');
    this.todayDate = new Date();
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
        result.push(skill);
        totalLength += skill.length;
      } else {
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
    this.globalSearchValue = '';
  }
 
  getCandidatename(): void {
    this.tableService.getExistingCandidate().subscribe((data) => {
 
      const uniqueEmails = new Set<string>();
      const uniqueCandidateNames: any[] = [];
      data.forEach(
        (candidate: { candidateName: string; candidateEmail: string }) => {
          if (!uniqueEmails.has(candidate.candidateEmail)) {
            uniqueEmails.add(candidate.candidateEmail);
            uniqueCandidateNames.push({ candidateName: candidate.candidateName });
          }
        }
      );
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
 
 
  getSkillSet() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
    data.forEach((element: any) => {
        this.skillSet.push({ skill: element });
      });
      console.log('Skill Set', this.skillSet);
    });
  }
 
  loadManagerNames() {
    this.managernameService.getclientManagerData().subscribe((data) => {
      this.managerOption = data;
      console.log('Manager Data', data);
    });
  }
 
  candidateSelectedAnswer : any;
  previewCompletedTest(data: any){
    console.log("data",data);
    //sidebar
    this.previewQuestions = Object.keys(data.candidateResponse).sort();
    this.candidateSelectedAnswer = this.previewQuestions.map((key: string | number) => data.candidateResponse[key]);
    console.log("Questions",this.previewQuestions);
    this.getQuestionService.getIndividualQuestion(this.previewQuestions).subscribe((data) => {
      this.totalQuestions = data;
      console.log("total questions preview",this.totalQuestions)
      this.totalQuestions.forEach((question: { candidateResponse: any; },index: string | number)=>{
        question.candidateResponse=this.candidateSelectedAnswer[index]
       })
       console.log("Update total questions",this.totalQuestions)
       this.showSidebar = true;
     })
 
 
  }
 
  // sidebar
  closeButton() {
    this.showSidebar = false;
    this.hidePreview.emit(false);
    }
    getLabel(index: number) {
      return String.fromCharCode(65 + index);
    }
    getSelectedOptions(question: any, option: any) {
      if(question.questionType === "Radio"){
 
          if(question.candidateResponse === option && question.candidateResponse== question.answer) return 'correctAnswer'
          else if(question.candidateResponse === option && question.candidateResponse !== question.answer) return 'wrong'
          else {
            return 'wrongAnswer'
          }
 
      }
      else{
         if(question.candidateResponse.includes(option) && question.candidateResponse== question.answer) return 'correctAnswer';
         else if(question.candidateResponse.includes(option) && question.candidateResponse !== question.answer) return 'wrong';
         else {
          return 'wrongAnswer'
        }
      }
 
    } 
}
 