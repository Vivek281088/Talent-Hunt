import { Component, OnInit } from '@angular/core';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';

import { ManagernameService } from 'src/app/services/managername.service';

import { TableService } from 'src/app/services/table.service';
import { ConfirmationService, MessageService, ConfirmEventType } from 'primeng/api';
import { ChangeDetectorRef } from '@angular/core';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-assessment-display',
  templateUrl: './assessment-display.component.html',
  styleUrls: ['./assessment-display.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class AssessmentDisplayComponent implements OnInit {
  // Initialize start and end times

  

  messages2: Message[] =[];

  position: string = 'center';
  FinalizedQuestions: any[] = [];

  duration: number = 120;

  cutoff: number = 60;

  checked: boolean = false;

  candidateName: string = 'Sapna';

  startTime!: Date;

  endTime!: Date;

  postData !: any ;

  selectedOption : any[]= [];
  remainingTime: number=0;
  remainingTimeString: string = '';

  
  constructor(
    private managernameService: ManagernameService,

    private tableservice: TableService,

    private candidateAssessmentService : CandidateAssessmentService,
    private confirmationService: ConfirmationService, private messageService: MessageService   ,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {


   

  this.messages2 = [
      { severity: 'warn', summary: 'Warning', detail: '5 mins more' },
      
  ];


    this.startTime = new Date();
    this.remainingTime = this.duration * 60; // Initialize remaining time

    this.updateTimer(); 
    
    this.FinalizedQuestions = [
      {
        Difficulty_Level: 'E',

        answer: ['Comparator'],

        options: ['Consumer', 'Supplier', 'Runnable', 'Comparator'],

        question:
          'Which of the following is not a functional interface in Java 8?',

        questionType: 'Radio',

        skills: 'Java-8',

        selectedOption : []
      },

      {
        Difficulty_Level: 'M',

        answer: ['Consumer'],

        options: ['Consumer', 'Charger', 'Adapter', 'Comparator'],

        question: 'Which of the following is a functional interface in Java 8?',

        questionType: 'Radio',

        skills: 'Java-8',

        selectedOption : [],

      },
    ];

    console.log('qd', this.FinalizedQuestions);

    // this.duration = this.managernameService.getDuration();

    // this.cutoff = this.managernameService.getCutoff();

    // this.FinalizedQuestions.forEach((question) => {

    //   if (question.questionType === 'Checkbox') {

    //     question.selectedOption = question.answer.split(',');

    //   } else if (question.questionType === 'Radio') {

    //     question.selectedOption = question.answer;
    //   //  console.log(quetion.selectedOption)

    //   } else {

    //     question.selectedOption = null;

    //   }

    // });
    // console.log();
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
            this.remainingTimeString = `${Math.floor(this.remainingTime / 60)}m ${this.remainingTime % 60}s`;
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
            this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
            this.submitAnswers();
            console.log("Submitted")
        },
        reject: (type: ConfirmEventType) => {
            switch (type) {
                case ConfirmEventType.REJECT:
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
                    console.log("Rejected")
                    break;
                case ConfirmEventType.CANCEL:
                  console.log("Canceled")
                    this.messageService.add({ severity: 'warn', summary: 'Cancelled', detail: 'You have cancelled' });
                    break;
            }
        },
        key: 'positionDialog'
    });
}



  submitAnswers() {

    this.endTime = new Date();
    this.selectedOption = this.FinalizedQuestions.map((question) => question.selectedOption)
     this.postData = {
      candidateName: this.candidateName,
      questions: this.FinalizedQuestions,
      selectedOption: this.FinalizedQuestions.map((question) => question.selectedOption),
      startTime: this.startTime, 
    endTime: this.endTime,
    cutoff:this.cutoff,
    duration:this.duration
      
    }
    console.log("Final Data",this.postData);
    this.candidateAssessmentService
        .postCandiadte_assessment(
          this.candidateName, 
          this.FinalizedQuestions,
          this.selectedOption,
          this.startTime, 
          this.endTime,
          this.cutoff,
          this.duration
            ).subscribe((response) => {
          console.log("Final ",this.postData);
          console.log("Data",response);
        });
    
  }
}
