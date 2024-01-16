import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { ManagernameService } from 'src/app/services/managername.service';

import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { AuthService } from 'src/app/Guard/auth.service';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';
import { ReviewerService } from 'src/app/services/reviewer.service';
//import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import * as Papa from 'papaparse';
import { saveAs } from 'file-saver';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
  MenuItem,
} from 'primeng/api';
import { Router } from '@angular/router';

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
  scheduleName!: string;
  todayDate!: string;
  FinalizedQuestions: any[] = [];
  viewQuestionSidebar: boolean = false;
  visible: boolean = false;

  constructor(
    private skillsdropdownservice: SkillsdropdownService,
    private router: Router,
    private managerService: ManagernameService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.todayDate = this.formattedDate(new Date());
    this.getUniqueSkill();
    console.log('Date--------', this.todayDate);

    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Skills', routerLink: '/manage-skills' },
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

  cancelButton() {
    this.visible = false;
    this.resetData();
  }

  resetData() {
    this.scheduleName = '';
  }

  AddButton() {
    console.log('sended');
    const dataToSend = {
      scheduleName: this.scheduleName,
    };

    this.router.navigate(['/new-schedule']);
  }

  newSchedule() {
    this.visible = true;
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

  getUniqueSkill() {
    this.skillsdropdownservice.getUniqueSkills().subscribe((data) => {
      this.skillUnique = data;
      this.keyValueArray = Object.entries(this.skillUnique);
      console.log('skillsunique', this.skillUnique);
      console.log('keyValueArray', this.keyValueArray);
    });
  }

  onViewClick(_skill: string) {
    this.viewQuestionSidebar = true;
    this.skillsdropdownservice
      .postskillsList([_skill])
      .subscribe((response) => {
        console.log('recieved response', response);
        this.FinalizedQuestions = response[0].data;
      });
  }
  storeSkill() {
    this.skillsdropdownservice
      .postOneSkill(this.scheduleName)
      .subscribe((response: any) => {
        console.log('recieved response1', response);
        this.visible = false;
        this.resetData();
      });
  }
  storeQuestion(data: any) {
    this.managerService
      .postquestionstodb(
        data.Question,
        data.questionType,
        data.options,
        data.skill,
        data.difficulty,
        data.answer
      )
      .subscribe((data) => {
        console.log('Stored Question', data);
      });
  }
  uploadCsv(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = () => {
        const csvData: string = reader.result as string;
        this.processCsvData(csvData);
      };

      reader.readAsText(file);
    }
  }
  processCsvData(csvData: string) {
    Papa.parse(csvData, {
      complete: (result: { data: any }) => {
        const csvRows = result.data.filter((row: { [row: string]: string }) =>
          Object.keys(row).some((key) => row[key] !== '')
        );

        if (csvRows.length === 0) {
          this.fileUploadErrorMessage();
          this.cancelButton();
          return;
        }
        console.log('CSV Data:', csvRows);

        for (let data of csvRows) {

          console.log("Data---->",data)

          const optionsArray = [];
          for (let i = 1; data['option-' + i]; i++) {
            optionsArray.push(data['option-' + i]);
          }
          console.log('Options Array', optionsArray);

          const answerArray = [];
          for (let i = 1; data['answer-' + i]; i++) {
            answerArray.push(data['answer-' + i]);
          }
          console.log('Answer Array--', answerArray);

          const questionData = {
            Question: data.Question,
            questionType: data.questionType,
            options: optionsArray,
            skill: data.skill,
            difficulty: data.difficulty,
            answer: answerArray,
          };

          console.log('Question Data--', questionData);

          this.storeQuestion(questionData);
        }

        setTimeout(() => {
          this.fileUploadMessage();
          this.cancelButton();
        }, 1000);
      },
      header: true,
    });
  }

  fileUploadMessage() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Question saved successfully',
    });
  }
  fileUploadErrorMessage() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'File is Empty',
    });
  }
  downloadQuestionsCsvTemplate() {
    let csvTemplate;
    csvTemplate = `Question,questionType,difficulty,option-1,option-2,option-3,option-4,answer-1,answer2,answer-3,answer-4,skill\n`;
    const blob = new Blob([csvTemplate], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'questions-template.csv');
  }
}
