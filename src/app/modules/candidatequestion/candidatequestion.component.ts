import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';

import { ManagernameService } from 'src/app/services/managername.service';

import { TableService } from 'src/app/services/table.service';
import {
  ConfirmationService,
  MessageService,
  ConfirmEventType,
} from 'primeng/api';
import { ChangeDetectorRef } from '@angular/core';
import { Message } from 'primeng/api';
import { Router } from '@angular/router';
import { ReviewerService } from 'src/app/services/reviewer.service';
import { Toast } from 'ngx-toastr';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
import { forkJoin } from 'rxjs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-candidatequestion',
  templateUrl: './candidatequestion.component.html',
  styleUrls: ['./candidatequestion.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class CandidatequestionComponent implements OnInit, AfterViewInit {
  @HostListener('window:focus', ['$event'])
  onFocus(event: FocusEvent): void {
    // Tab is in focus
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: FocusEvent): void {
    // Tab is blurred (inactive)

    console.warn('Warning: Please do not switch tabs during the test.');
  }

  position: string = 'center';
  remainingTime: number = 0;
  remainingTimeString: string = '';
  selectedOptions1: any = [];
  first: number = 0;

  rows: number = 1;

  page: number = 0;
  pageCount: number = 0;
  candidateName!: string;
  code!: string;
  selectedBox: number[] = [];
  //selectedBox: number |null=null;

  selectedOptions: boolean[] = [];
  isCheckbox: boolean = true;

  // In your component class
  questionSelectedOptions: { [questionId: number]: number | null } = {};
  startTime!: Date;
  duration!: number;

  assessmentData: any;
  totalQuestions!: number;
  assessmentQuestions: any;
  previewOptions: any;
  endTime!: Date;
  countCorrectQues!: number;
  CountTotalQuestions!: number;
  score!: number;
  result: string = '';
  cutoff!: number;
  fileName!: string;
  id: any = '2024-01-04T06:04:10.746Z';
  candidateEmail: string = 'sapna@gmail.com';

  constructor(
    private managernameService: ManagernameService,

    private tableservice: TableService,

    private candidateAssessmentService: CandidateAssessmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private reviewerService: ReviewerService,
    private candidateService: CandidateAssessmentService,
    private cdr: ChangeDetectorRef,

    private router: Router,
    private newScheduleService : NewScheduleService,
  ) {}
  ngAfterViewInit(): void {
    this.totalQuestions = this.previewOptions.length;

    // Update session storage after the view has been initialized
    this.updateSessionStorage();
  }

  // In your component class
  ngOnInit(): void {
    const storedOptions = sessionStorage.getItem('selectedOptions');
    if (storedOptions) {
      this.selectedOptions1 = JSON.parse(storedOptions);
      console.log('Selected Option', this.selectedOptions1);
    }

    this.startTime = new Date();

    this.updateTimer();

    //get the assessment data
    this.assessmentData = this.candidateAssessmentService.getAssessmentData();
    // this.assessmentData = {
    //   Skill: ['GraphQL', 'Nodejs'],
    //   candidateEmail: 'kabilan@gmail.com',
    //   candidateName: 'Kabilan',
    //   candidatePhone: 9090909090,
    //   confirmPassword: 'abc123',
    //   cutoff: '45',
    //   durations: '200',
    //   email_Filename: 'Angular Training',
    //   email_Managername: 'Mathanraj',
    //   email_Status: 'Not Started',
    //   id: '2024-01-04T13:41:35.740Y',
    //   password: 'abc123',
    //   questions: [
    //     {
    //       Difficulty_Level: 'H',
    //       Selected: true,
    //       answer: 'Answer',
    //       id: '1699593363385',
    //       options: ['word', 'Para', 'Line', 'Text'],
    //       question:
    //         'This tab lists all connected branches, select a branch to view build details.',
    //       questionType: 'Radio',
    //       skills: 'GraphQL',
    //     },
    //     {
    //       Difficulty_Level: 'M',
    //       Selected: true,
    //       answer: ['useMutation'],
    //       id: '2',
    //       options: [
    //         'useMutation',
    //         'useSubscription',
    //         'useQuery',
    //         'none of the options',
    //       ],
    //       question:
    //         'Which of the following GraphQL’s hooks should be used to update data on server?',
    //       questionType: 'Radio',
    //       skills: 'GraphQL',
    //     },
    //     {
    //       Difficulty_Level: 'H',
    //       answer: ['Use gzip compression'],
    //       id: '246789012345',
    //       options: [
    //         'Do logging correctly',
    //         "Don't use synchronous functions",
    //         'Handle exceptions properly',
    //         'Use gzip compression',
    //       ],
    //       question:
    //         "What should you do in your code to improve your application's performance?",
    //       questionType: 'Radio',
    //       selection: true,
    //       skills: 'Nodejs',
    //     },

    //     {
    //       Difficulty_Level: 'M',
    //       answer: ['fsread'],
    //       id: '1',
    //       options: ['HTTPS', 'dgram', 'fsread', 'zlib'],
    //       question:
    //         'Which of the below modules is not a built-in module in Node.js',
    //       questionType: 'Radio',
    //       selection: true,
    //       skills: 'Nodejs',
    //     },
    //     {
    //       Difficulty_Level: 'H',
    //       answer: ['GruntJs'],
    //       id: '2467890123',
    //       options: ['Express.js', 'GruntJs', 'NPM', 'None of the above'],
    //       question:
    //         'Which of the following tool is used to automate various tasks in a Node.js application?',
    //       questionType: 'Radio',
    //       selection: true,
    //       skills: 'Nodejs',
    //     },
    //     {
    //       Difficulty_Level: 'E',
    //       answer: ['Third Party'],
    //       id: '2467890',
    //       options: ['Global', 'Third Party', 'core', 'local'],
    //       question: 'Http module falls under which type of module?',
    //       questionType: 'Radio',
    //       selection: true,
    //       skills: 'Nodejs',
    //     },
    //   ],
    //   results: 'Awaiting Eval',
    //   roles: 'user',
    //   score: null,
    // };

    console.log('Assessment Data', this.assessmentData);
    this.previewOptions = this.assessmentData.questions;
    this.duration = this.assessmentData.durations;
    this.fileName = this.assessmentData.email_Filename;

    this.cutoff = this.assessmentData.cutoff;
    console.log('cutoff--->', this.cutoff);
    this.id = this.assessmentData.id;
    console.log('Id--->', this.id);
    this.candidateEmail = this.assessmentData.candidateEmail;
    console.log('Email-->', this.candidateEmail);

     this.getQuestionsById(this.previewOptions);
    this.remainingTime = this.duration * 60;
    console.log('Assessment Questions', this.previewOptions);
    this.selectedOptions1 = this.previewOptions.map(() => []);
    this.totalQuestions = this.previewOptions.length;
    console.log('Count Total Quest-', this.totalQuestions);
    this.updateSessionStorage();
  }
  
  getQuestionsById(previewOptions: any) {
    console.log('get id', previewOptions);
    const observables = previewOptions.map((questionId: string) =>
      this.newScheduleService.getIndividualQuestion(questionId)
    );
    forkJoin(observables).subscribe((responses) => {
      this.previewOptions = responses;
      console.log('Updated Total Question data--', this.previewOptions);
    });
  }
  selectOption(option: string, pageIndex: number, optionIndex: number) {
    console.log('Selected Option', this.previewOptions);
    console.log('asdjbvahbvhabvahbvahbvhv', option, pageIndex, optionIndex);

    if (this.previewOptions[pageIndex]?.questionType === 'checkbox') {
      console.log('checkbox inside');
      // Toggle checkbox option
      const isSelected = this.selectedOptions1[pageIndex].includes(option);
      if (isSelected) {
        this.selectedOptions1[pageIndex] = this.selectedOptions1[
          pageIndex
        ].filter((selected: any) => selected !== option);
      } else {
        console.log('inside else');
        console.log('page index ????', pageIndex);
        console.log('else option', option);
        this.selectedOptions1[pageIndex].push(option);
      }
    } else {
      // Radio option (single selection)
      this.selectedOptions1[pageIndex] = option;
    }

    // Update session storage
  }

  updateSessionStorage() {
    // Store the selected options in session storage
    sessionStorage.setItem(
      'selectedOptions',
      JSON.stringify(this.selectedOptions1)
    );
  }

  toggleColor(boxNumber: number, page: number) {
    if (
      this.selectedBox[page] !== null &&
      this.selectedBox[page] === boxNumber
    ) {
      this.selectedBox[page] = -1;
    } else {
      this.selectedBox[page] = boxNumber;
    }
  }

  updateTimer() {
    const timerInterval = setInterval(() => {
      if (this.remainingTime > 0) {
        this.remainingTime--;

        if (this.remainingTime >= 60) {
          const hours = Math.floor(this.remainingTime / 3600);
          const minutes = Math.floor((this.remainingTime % 3600) / 60);
          this.remainingTimeString = `${hours}h ${minutes}m`;
        } else {
          this.remainingTimeString = `${Math.floor(this.remainingTime / 60)}m ${
            this.remainingTime % 60
          }s`;
        }
        this.cdr.detectChanges();
      } else {
        console.log('remaining', this.remainingTime);
        clearInterval(timerInterval); // Stop the timer
        this.submitAnswers(); // Automatically submit the answers
      }
    }, 1000); // 1000 milliseconds = 1 second
  }

  exit() {
    this.router.navigate(['/login']);
  }
  prev() {
    console.log('prev', 'previous function called');
    if (this.first >= this.rows) {
      this.page -= 1;
      this.first -= this.rows;
      debugger;
    }
  }

  next() {
    {
      console.log('next', 'nextfunction called');
      this.page += 1;

      this.first += 1;
    }
  }
  submitAnswers() {
    console.log('submit function');

    this.endTime = new Date();
    this.reviewQuestion();
    this.router.navigate(['/candidatehome']);
  }
  reviewQuestion() {
    this.countCorrectQues = 0;

    for (let i = 0; i < this.selectedOptions1.length; i++) {
      this.previewOptions[i].selectedOption = this.selectedOptions1[i];
    }
    console.log('preview Options after selected option', this.previewOptions);

    console.log('Updated Question', this.previewOptions);

    for (let question of this.previewOptions) {
      let correct;
      if ((question.questionType = 'Radio')) {
        correct = question.answer.includes(question.selectedOption);
        console.log('correct ', correct);
      } else if ((question.questionType = 'Checkbox')) {
        correct = question.selectedOption.every((opt: any) =>
          question.answer.includes(opt)
        );
        console.log('correct ', correct);
      }
      if (correct) {
        console.log('Selected Option:', question.selectedOption);
        console.log('Answer:', question.answer);
        question.reviewerResponse = 'Correct';
        this.countCorrectQues++;
      } else {
        question.reviewerResponse = 'Incorrect';
      }
    }
    this.CountTotalQuestions = this.previewOptions.length;
    console.log('count total ques', this.CountTotalQuestions);
    console.log('Correct ques', this.countCorrectQues);
    this.score = (this.countCorrectQues / this.CountTotalQuestions) * 100;

    if (this.score > this.cutoff) {
      this.result = 'Shortlisted';
    } else this.result = 'Rejected';

    console.log('Cutoff :', this.cutoff);
    console.log('Score :', this.score);

    console.log('Result :', this.result);

    //Auto review update for reviewer

    const reviewData = {
      id: this.id,

      questions: this.previewOptions,

      score: this.score.toFixed(2),

      results: this.result,

      email_Status: 'Completed',

      candidateEmail: this.candidateEmail,
    };

    console.log(reviewData);

    this.reviewerService
      .updateScoreAndResult(reviewData)
      .subscribe((response) => {
        console.log('Questions updated successfully', response);
      });
  }

  formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const hoursDisplay = hours > 0 ? hours + 'h ' : '';
    const minutesDisplay = minutes > 0 ? minutes + 'm ' : '';
    const secondsDisplay = remainingSeconds + 's';

    return hoursDisplay + minutesDisplay + secondsDisplay;
  }
  confirmPosition(position: string) {
    this.position = position;

    this.confirmationService.confirm({
      message: 'Do you want to submit your answers?',
      header: 'Submit Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Submitted',
        });
        this.submitAnswers();
        
        Swal.fire({
          title: 'Submitted Successfully!',
          text: 'You have submitted the test succesfully!',
          icon: 'success',
          allowOutsideClick: false,
        }).then((result: { isConfirmed: any; }) => {
          if (result.isConfirmed) {
            this.router.navigate(['/candidatehome']);
          }
        });

        console.log('Submitted');
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Cancel',
              detail: 'You have Cancelled',
            });
            console.log('Rejected');
            break;
          case ConfirmEventType.CANCEL:
            console.log('Canceled');
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

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.page = event.page;
    this.pageCount = event.pageCount;
    console.log('selected Option', this.selectedOptions1);
  }

  showQuestion(questionId: number) {
    if (!this.questionSelectedOptions[questionId]) {
      this.questionSelectedOptions[questionId] = null;
    }
  }

  getLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }

  getCodeLines(code: string): string[] {
    return code.split('\n');
  }

  getSelectedOptions(selected_Option: any, option: any) {
    if (selected_Option.includes(option)) {
      console.log('correct answer');
      return 'correctAnswer';
    } else {
      return 'wrongAnswer';
    }
  }
}