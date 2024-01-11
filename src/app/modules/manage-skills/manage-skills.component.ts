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
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
  MenuItem,
} from 'primeng/api';

@Component({
  selector: 'app-manage-skills',
  templateUrl: './manage-skills.component.html',
  styleUrls: ['./manage-skills.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class ManageSkillsComponent {
  item: any[] = [];

  items: MenuItem[] | undefined;

  skillUnique: any[] = [];
  keyValueArray: any[] = [];

  skillSet: any[] = [];
  Skill: any;
  managerOption: any[] = [];
  overlayVisible = false;
  todayDate!: string;
  FinalizedQuestions: any[] = [];
  viewQuestionSidebar: boolean = false;

  // candidateForm !: FormGroup;
  constructor(private skillsdropdownservice: SkillsdropdownService) {
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
    // this.getUniqueSkill();
    console.log('Date--------', this.todayDate);

    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Assessment', routerLink: 'dashboard' },
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

  clear(table: Table) {
    table.clear();
  }

  onViewClick(_skill: string) {
    this.viewQuestionSidebar = true;
    this.skillsdropdownservice
      .postskillsList([_skill])
      .subscribe((response) => {
        console.log('recieved response', response);
        this.FinalizedQuestions = response[0].data;

        //this.cdr.detectChanges();
      });
  }

  getLabel(index: number): string {
    return String.fromCharCode(65 + index);
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

  // getUniqueSkill() {
  //   this.skillsdropdownservice.getUniqueSkills().subscribe((data) => {
  //     this.skillUnique = data;
  //     this.keyValueArray = Object.entries(this.skillUnique);
  //     console.log('skillsunique', this.skillUnique);
  //     console.log('keyValueArray', this.keyValueArray);
  //   });
  // }
}
