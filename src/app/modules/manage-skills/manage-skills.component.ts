import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
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
  todayDate!: string;
  items: MenuItem[] | undefined;
  formModified: boolean = false;
  visible: boolean = false;
  scheduleName!: string;
  tabs: { title: any; content: any }[] = [];
  skills: any[] = [];
  previewSidebarVisible: boolean = false;
  questionPreviewvisible: boolean = false;
  singleQuestion: any;
  singleQuestionOption: any;
  singleQuestionAnswer: any;
  selectedquestions: any[] = [];
  updateQuestionForm:FormGroup


  constructor(
    private skillsdropdownservice: SkillsdropdownService,
    private router: Router,
    private managerService: ManagernameService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private fb:FormBuilder
  ) {
    // this.data=this.dataservice.sharedData;
    this.updateQuestionForm = this.fb.group({
      question: ['', [Validators.required]],
      questionType: ['', [Validators.required,]],
      difficulty: ['',[Validators.required,]],
      choices0: ['', Validators.required], 
      choices1: ['', Validators.required],       
      choices2: ['', Validators.required],     
        choices3: ['', Validators.required],
      answer: [null,[Validators.required]],
 
    });
  }

  ngOnInit() {
    sessionStorage.setItem('Component-Name', 'question_bank');
    this.todayDate = this.formattedDate(new Date());
    this.getSkillSet();
    this.items = [
      { label: 'Home', routerLink: '/dashboard', icon: 'pi pi-home' },
      { label: 'Questions', routerLink: '/manage-skills' },
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

  getSkillSet() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skills = data;
      this.postSkill();

      console.log('skillset', this.skills);
    });
  }

  postSkill() {
    console.log('skill inside post', this.skills);
    this.skillsdropdownservice
      .postskillsList(this.skills)
      .subscribe((response) => {
        console.log('recieved response', response);
        
        for (let i = 0; i < response.length; i++) {
          this.tabs.push({
            title: response[i].skills,
            content: response[i].data,
          });
        }
        console.log('tabs', this.tabs);
        this.cdr.detectChanges();
      });
  }
  onPreviewClick(data: any) {
    this.selectedquestions = data;
    this.previewSidebarVisible = true;
    console.log('inside the preview', this.selectedquestions);
  }
  questionPreview(questions: any) {
    this.questionPreviewvisible = true;
    this.singleQuestion = questions.question;
    this.singleQuestionOption = questions.options;
    this.singleQuestionAnswer = questions.answer;
  }

  getSelectedOptions(selected_Option: any, option: any) {
    if (selected_Option.includes(option)) {
      return 'correctAnswer';
    } else {
      return 'wrongAnswer';
    }
  }
  getLabel(index: number) {
    return String.fromCharCode(65 + index);
  }
  newQuestionAdd() {
    this.visible = true;
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
          console.log('Data---->', data);

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

  choices!: any;
  options!: any;
  Difficulty_Level!: any;
  id!: any;
  answer!: any;
  difficultyLevel: any = ['Easy', 'Medium', 'Hard'];

  questionType: any = ['Radio', 'Checkbox'];
  questionTypeSelected!: any;
  question!: string;
  isViewingQuestion: boolean = false;
  QuestionView: boolean = false;
  individualQuestionView(
    id: any,
    question: any,
    questionTypeSelected: any,
    choices: any,
    skills: any,
    Difficulty_Level: any,
    answer: any
  ) {
    this.QuestionView = true;
    this.id = id;
    this.question = question;
    this.questionTypeSelected = questionTypeSelected;
    // this.options=choices;
    this.choices = choices;

    this.Difficulty_Level =
      this.getBackendDifficultyLevelViceVersa(Difficulty_Level);
    this.skills = skills;
    this.answer = answer;

    console.log(
      'id------------->',
      id,
      skills,
      answer,
      this.Difficulty_Level,
      choices
    );
    this.updateQuestionForm.patchValue({
      question: question,
      questionType : questionTypeSelected,
      difficulty :this.getBackendDifficultyLevelViceVersa(Difficulty_Level),
      choices0 :choices[0],
      choices1:choices[1],
      choices2:choices[2],
      choices3:choices[3],
      answer:answer
     })
  }
  getBackendDifficultyLevelViceVersa(frontendValue: string): string {
    if (frontendValue === 'E') {
      return 'Easy';
    } else if (frontendValue === 'M') {
      return 'Medium';
    } else if (frontendValue === 'H') {
      return 'Hard';
    }
    return frontendValue;
  }
  getBackendDifficultyLevel(frontendValue: string): string {
    console.log('Diff', frontendValue);
    if (frontendValue === 'Easy') {
      return 'E';
    } else if (frontendValue === 'Medium') {
      return 'M';
    } else if (frontendValue === 'Hard') {
      return 'H';
    }
    return frontendValue;
  }

  updateQuestionView() {
   
    
    this.showUpdateMessage();
    console.log('dd=>>>>>>>>>>>>>>>>>>', this.difficultyLevel);
    this.difficultyLevel = this.getBackendDifficultyLevel(
      this.Difficulty_Level
    );
    this.skillsdropdownservice
      .updateQuestion(
        this.id,
        this.updateQuestionForm.get('question')?.value,
        this.updateQuestionForm.get('questionType')?.value,
       [ this.updateQuestionForm.get('choices0')?.value,
        this.updateQuestionForm.get('choices1')?.value,
        this.updateQuestionForm.get('choices2')?.value,
        this.updateQuestionForm.get('choices3')?.value,],
        this.skills,
        this.getBackendDifficultyLevel(
          this.updateQuestionForm.get('difficulty')?.value,
        ),
        this.updateQuestionForm.get('answer')?.value,
      )
      .subscribe((response) => {
        console.log('updateQuestionView response', response);
        setTimeout(() => {
          this.QuestionView = false;
         // window.location.reload();
          this.formModified = false;
        }, 1000);
      });
  }
  showUpdateMessage() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Question Updated Successfully',
    });
  }
  cancelQuestionView() {
    console.log("updateform",this.updateQuestionForm);
    this.QuestionView = false;
    this.formModified = false;
  }
  
  sidebarClose() {
    this.previewSidebarVisible = false;
  }
}
