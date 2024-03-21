import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
import { Observable } from 'rxjs';

import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
  MenuItem,
} from 'primeng/api';
import { Router } from '@angular/router';
import { optionValodator } from './optionvalidator';

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
  visible: boolean = false;
  scheduleName!: string;
  tabs: { title: any; content: any }[] = [];
  skills: any[] = [];
  previewSidebarVisible: boolean = false;
  questionPreviewvisible: boolean = false;
  formModified: boolean = false;
  singleQuestion: any;
  singleQuestionOption: any;
  singleQuestionAnswer: any;
  selectedquestions: any[] = [];
  updateQuestionForm: FormGroup;
  checkboxControl!: FormControl;
  headers = [
    'question',
    'questionType',
    'difficulty',
    'option1',
    'option2',
    'option3',
    'option4',
    'answer1',
    'answer2',
    'answer3',
    'answer4',
    'skill',
  ];
  exampleData = [
    [
      'How many types of cloud computing are there?',
      'Radio',
      'E',
      'Option 1',
      'Option 2',
      'Option 3',
      'Option 4',
      'Answer 1',
      '',
      '',
      '',
      'AWS',
    ],
    [
      'What is Angular?',
      'Checkbox',
      'M',
      'Option A',
      'Option B',
      'Option C',
      'Option D',
      '',
      '',
      '',
      '',
      'Web Development',
    ],
  ];

  constructor(
    private skillsdropdownservice: SkillsdropdownService,
    private router: Router,
    private managerService: ManagernameService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    // this.data=this.dataservice.sharedData;
    this.updateQuestionForm = this.fb.group({
      question: ['', [Validators.required, Validators.minLength(7)]],
      questionType: ['', [Validators.required]],
      difficulty: ['', [Validators.required]],
      choices0: ['', Validators.required, optionValodator()],
      choices1: ['', Validators.required, optionValodator()],
      choices2: ['', Validators.required, optionValodator()],
      choices3: ['', Validators.required, optionValodator()],
      answer: ['', Validators.required],
    });
    this.checkboxControl = this.fb.control([]);
  }

  ngOnInit() {
    sessionStorage.setItem('Component-Name', 'question_bank');
    this.todayDate = this.formattedDate(new Date());
    this.getSkillSet();
    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
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
    //this.scheduleName = '';
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
    if (option.includes(selected_Option)) {
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
    const value = this.processCsv(file);
    value.subscribe((data) => {
      console.log(data);
    });

    // if (file) {
    //   const reader: FileReader = new FileReader();
    //   reader.onload = () => {
    //      const csvData: string = reader.result as string;
    //     // this.processCsvData(csvData);
    //     const results: any[] = [];

    // // const lines = csvData.split('\n');
    // // lines.forEach((line:any) => {
    // //   const data = line.split(',');
    // //   const question = data[0]?.trim() || '';
    // //   const questionType = data[1]?.trim() || '';
    // //   const difficulty = data[2]?.trim() || '';
    // //   const options = [data[3]?.trim() || '', data[4]?.trim() || '', data[5]?.trim() || '', data[6]?.trim() || ''];

    // //   let answers: any[] = [];
    // //   if (questionType === 'Radio') {
    // //     const answer = data[7]?.trim() || '';
    // //     if (answer !== '') {
    // //       answers = answer;
    // //     }
    // //   } else {
    // //     answers = [
    // //       data[7]?.trim() || '',
    // //       data[8]?.trim() || '',
    // //       data[9]?.trim() || '',
    // //       data[10]?.trim() || ''
    // //     ];
    // //     answers = answers.filter(answer => answer !== '');
    // //   }

    // //   const skill = data[11]?.trim() || '';

    // //   if (question !== '' && questionType !== '') {
    // //     results.push({
    // //       question,
    // //       questionType,
    // //       difficulty,
    // //       options,
    // //       answers,
    // //       skill: skill.replace(/\r$/, '')
    // //     });
    // //   }
    // // });

    // results.shift();
    // console.log(results);
    //   };

    //   reader.readAsText(file);
    // }
  }
  downloadTemplate() {
    const csvContent = Papa.unparse({
      fields: this.headers,
      data: this.exampleData,
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'template.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  processCsv(file: File): Observable<any[]> {
    return new Observable<any[]>((observer) => {
      const results: any[] = [];

      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        Papa.parse(fileContent, {
          header: false,
          skipEmptyLines: true,
          complete: (result) => {
            result.data.forEach((row: any) => {
              const questionType = row[1]?.trim() || '';
              let answers: any;
              if (questionType === 'Radio') {
                const answer = row[7]?.trim() || '';
                if (answer !== '') {
                  answers = answer;
                }
              } else {
                answers = row
                  .slice(7, 11)
                  .filter((answer: string) => answer.trim() !== '');
              }
              console.log('Row', row);
              results.push({
                question: row[0]?.trim() || '',
                questionType,
                difficulty: row[2]?.trim() || '',
                options: [
                  row[3]?.trim() || '',
                  row[4]?.trim() || '',
                  row[5]?.trim() || '',
                  row[6]?.trim() || '',
                ],
                answers,
                skill: row[11]?.trim().replace(/\r$/, '') || '',
              });
            });

            // When parsing is finished, emit the results array
            observer.next(results);
            observer.complete();
          },
          error: (error: any) => {
            // If an error occurs during parsing, emit the error
            observer.error(error);
          },
        });
      };

      reader.readAsText(file);
    });
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
    console.log('difficulty level', Difficulty_Level, this.Difficulty_Level);

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
      questionType: questionTypeSelected,
      difficulty: this.Difficulty_Level,
      choices0: choices[0],
      choices1: choices[1],
      choices2: choices[2],
      choices3: choices[3],
      answer: this.answer,
    });
    if (questionTypeSelected == 'Checkbox') {
      console.log(' selected question', questionTypeSelected);
      this.checkboxControl.patchValue(answer);
    }
  }
  resetAnswers(value: any) {
    console.log('inside rest values', value);
    // if(value == "Checkbox"){
    //   console.log("Checkbox",this.updateQuestionForm.get('answer'))
    //   this.checkboxControl = this.fb.control([]);
    // }else{
    //   console.log("answer",this.updateQuestionForm.get('answer'))
    //   this.updateQuestionForm.get('answer')?.reset();
    // }

    // this.updateQuestionForm.get('answer')?.patchValue(null);
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
    const qType = this.updateQuestionForm.get('questionType')?.value;
    let answer;
    if (qType === 'Checkbox') {
      answer = this.checkboxControl.value;
    } else {
      answer = this.updateQuestionForm.get('answer')?.value;
    }
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
        [
          this.updateQuestionForm.get('choices0')?.value,
          this.updateQuestionForm.get('choices1')?.value,
          this.updateQuestionForm.get('choices2')?.value,
          this.updateQuestionForm.get('choices3')?.value,
        ],
        this.skills,
        this.getBackendDifficultyLevel(
          this.updateQuestionForm.get('difficulty')?.value
        ),
        answer
      )
      .subscribe((response) => {
        console.log('updateQuestionView response', response);
        setTimeout(() => {
          this.QuestionView = false;
          window.location.reload();
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
    console.log('value', this.checkboxControl.value);
    console.log(' check box from', this.checkboxControl);
    console.log('updateform', this.updateQuestionForm);
    //this.checkboxControl.reset();
    // this.updateQuestionForm.reset();
    // this.checkboxControl.reset()
    this.QuestionView = false;
  }

  sidebarClose() {
    this.previewSidebarVisible = false;
  }
}
