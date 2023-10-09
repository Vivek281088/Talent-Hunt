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

  startTime!: Date;

  endTime!: Date;

  postData!: any;

  selectedOption: any[] = [];

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

    private cdr: ChangeDetectorRef,

    private router: Router
  ) {}

  ngOnInit() {
    //  this.route.queryParams.subscribe((params: { state: { rowData: any; }; }) => {

    //   if (params && params.state && params.state.rowData) {

    //     this.assessmentData = params.state.rowData;

    //     console.log("Data",this.assessmentData)

    //     // Use rowData as needed in this component

    //   }

    // });

    this.assessmentData = this.candidateAssessmentService.getAssessmentData();

    console.log('get Data', this.assessmentData);

    this.id = this.assessmentData._id;

    this.duration = this.assessmentData._duration;

    this.cutoff = this.assessmentData._cutoff;

    this.candidateName = this.assessmentData._candidateName;

    console.log('Id', this.id);

    this.messages2 = [
      { severity: 'warn', summary: 'Warning', detail: '5 mins more' },
    ];

    this.startTime = new Date();

    this.remainingTime = this.duration * 60; // Initialize remaining time

    this.updateTimer();

    this.FinalizedQuestions = this.assessmentData.questions;

    console.log('qd', this.FinalizedQuestions);
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

  submitAnswers() {
    this.endTime = new Date();

    this.selectedOption = this.FinalizedQuestions.map(
      (question) => question.selectedOption
    );

    this.postData = {
      candidateName: this.candidateName,

      questions: this.FinalizedQuestions,

      selectedOption: this.FinalizedQuestions.map(
        (question) => question.selectedOption
      ),

      startTime: this.startTime,

      endTime: this.endTime,

      cutoff: this.cutoff,

      duration: this.duration,
    };

    console.log('Final Data', this.postData);

    this.candidateAssessmentService

      .postCandiadte_assessment(
        this.candidateName,

        this.FinalizedQuestions,

        this.selectedOption,

        this.startTime,

        this.endTime,

        this.cutoff,

        this.duration
      )
      .subscribe((response) => {
        console.log('Final ', this.postData);

        console.log('Data', response);
      });

    const UpdateData = {
      _id: this.id,

      email_Status: this.updateStatus,
    };

    console.log('update', UpdateData);

    this.candidateAssessmentService
      .updateStatus(UpdateData)
      .subscribe((response) => {
        console.log('Status updated successfully', response);
      });

    this.router.navigate(['/candidateassessment']);
  }
}
