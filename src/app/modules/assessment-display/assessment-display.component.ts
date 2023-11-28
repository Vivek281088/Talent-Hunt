import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-assessment-display',
  templateUrl: './assessment-display.component.html',
  styleUrls: ['./assessment-display.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class AssessmentDisplayComponent implements OnInit {
  // Initialize start and end times

  messages2: Message[] = [];

  position: string = 'center';
  FinalizedQuestions: any[] = [];

  duration!: number;

  cutoff!: number;

  checked: boolean = false;

  candidateName!: string;

  candidateEmail !: string;

  startTime!: Date;

  endTime!: Date;

  postData!: any;

  countCorrectQues!: number;

  result: string = '';

  score: number | null = null;

  updatedScore: number | null = null;

  CountTotalQuestions!: number;
  remainingTime: number = 0;
  remainingTimeString: string = '';
  route: any;
  assessmentData!: any;
  id!: any;
  updateStatus: string = 'Submitted';

  constructor(
    private managernameService: ManagernameService,

    private tableservice: TableService,

    private candidateAssessmentService: CandidateAssessmentService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private reviewerService: ReviewerService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.assessmentData = this.candidateAssessmentService.getAssessmentData();
    console.log('get Data', this.assessmentData);
    this.id = this.assessmentData.id;
    console.log('Id', this.id);
    this.duration = this.assessmentData.durations;
    console.log('dur--------------', this.duration);
    this.cutoff = this.assessmentData.cutoff;
    console.log('cut-------------', this.cutoff);
    this.candidateName = this.assessmentData.candidateName;
    console.log('can----------', this.candidateName);
    this.candidateEmail = this.assessmentData.candidateEmail;
    console.log('mail--------------', this.candidateEmail);
    this.messages2 = [
      { severity: 'warn', summary: 'Warning', detail: '5 mins more' },
    ];

    this.startTime = new Date();
    this.remainingTime = this.duration * 60; // Initialize remaining time

    this.updateTimer();

    this.FinalizedQuestions = this.assessmentData.questions;
    console.log('qd', this.FinalizedQuestions);

    for (let question of this.FinalizedQuestions) {
      question.selectedOption = [];
    }
    this.CountTotalQuestions = this.FinalizedQuestions.length;
    console.log('count total ques', this.CountTotalQuestions);
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
        clearInterval(timerInterval); // Stop the timer
        this.submitAnswers(); // Automatically submit the answers
      }
    }, 1000); // 1000 milliseconds = 1 second
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
          detail: 'Record deleted',
        });
        this.submitAnswers();
        console.log('Submitted');
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: 'error',
              summary: 'Rejected',
              detail: 'You have rejected',
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

  onCheckboxChange(question: any, option: any, event: any) {
    if (event) {
      // Add the selected option to the array
      question.selectedOption.push(option);
    } else {
      // Remove the deselected option from the array
      const index = question.selectedOption.indexOf(option);
      if (index !== -1) {
        question.selectedOption.splice(index, 1);
      }
    }
  }

  onRadioButtonChange(question: any, selectedOption: any) {
    // Set the selected option as an array with a single element
    question.selectedOption = [selectedOption];
  }

  reviewQuest() {
    this.countCorrectQues = 0;
    for (let question of this.FinalizedQuestions) {
      if (question.selectedOption.length === question.answer.length) {
        const correct = question.selectedOption.every((opt: any) =>
          question.answer.includes(opt)
        );
        if (correct) {
          console.log('Selected Option:', question.selectedOption);
          console.log('Answer:', question.answer);
          question.reviewerResponse = 'Correct';
          this.countCorrectQues++;
        } else {
          question.reviewerResponse = 'Incorrect';
        }
      } else {
        question.reviewerResponse = 'Incorrect'; // Number of options selected is different
      }
    }

    this.CountTotalQuestions = this.FinalizedQuestions.length;
    console.log('count total ques', this.CountTotalQuestions);
    console.log('Correct ques', this.countCorrectQues);
    this.score = (this.countCorrectQues / this.CountTotalQuestions) * 100;

    if (this.score > this.cutoff) {
      this.result = 'Selected';
    } else this.result = 'Not Selected';

    console.log('Score :', this.score);

    console.log('Result :', this.result);

    //Auto review update for reviewer

    const reviewData = {
      id: this.id,

      questions: this.FinalizedQuestions,

      score: this.score.toFixed(2),

      results: this.result,

      email_Status: 'Completed',

      candidateEmail : this.candidateEmail
    };

    console.log(reviewData);

    this.reviewerService
      .updateScoreAndResult(reviewData)
      .subscribe((response) => {
        console.log('Questions updated successfully', response);
      });
  }

  //If the questions doesn't contain any text quest
  updateEmailStatus(status: string) {
    //  this.countCorrectQues = 0;
    for (let question of this.FinalizedQuestions) {
      if (question.questionType === 'Text') {
        continue;
      } else {
        if (question.selectedOption.length === question.answer.length) {
          const correct = question.selectedOption.every((opt: any) =>
            question.answer.includes(opt)
          );
          if (correct) {
            console.log('Selected Option:', question.selectedOption);
            console.log('Answer:', question.answer);
            question.reviewerResponse = 'Correct';
            //  this.countCorrectQues++;
          } else {
            question.reviewerResponse = 'Incorrect';
          }
        } else {
          question.reviewerResponse = 'Incorrect'; // Number of options selected is different
        }
      }
    }
    // const UpdateData = {
    //   _id: this.id,
    //   email_Status: status,
    // };
    // console.log('update', UpdateData);

    // this.candidateAssessmentService
    //   .updateStatus(UpdateData)
    //   .subscribe((response) => {
    //     console.log('Status updated successfully', response);
    //   });

    //questions update for reviewer

    const updateData = {
      id: this.id,

      questions: this.FinalizedQuestions,

      email_Status: status,
    };

    console.log(updateData);

    this.reviewerService.updateQuestion(updateData).subscribe((response) => {
      console.log('Questions updated successfully', response);
    });
  }

  submitAnswers() {
    this.endTime = new Date();

    // Check if there are any "Text" type questions
    const hasTextQuestions = this.FinalizedQuestions.some(
      (question) => question.questionType === 'Text'
    );

    if (hasTextQuestions) {
      this.updateEmailStatus('Submitted');
    } else {
      this.reviewQuest();
    }

    // this.postData = {
    //   candidateName: this.candidateName,
    //   questions: this.FinalizedQuestions,

    //   startTime: this.startTime,
    //   endTime: this.endTime,
    //   cutoff: this.cutoff,
    //   durations: this.duration,
    // };
    // console.log('Final Data', this.postData);
    // this.candidateAssessmentService
    //   .postCandiadte_assessment(
    //     this.candidateName,
    //     this.FinalizedQuestions,
    //     this.startTime,
    //     this.endTime,
    //     this.cutoff,
    //     this.duration
    //   )
    //   .subscribe((response) => {
    //     console.log('Final ', this.postData);
    //     console.log('Data', response);
    //   });

    this.router.navigate(['/dashboard']);
  }
}
