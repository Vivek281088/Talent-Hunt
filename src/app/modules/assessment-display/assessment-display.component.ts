import { Component, OnInit } from '@angular/core';

import { ManagernameService } from 'src/app/services/managername.service';

import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-assessment-display',
  templateUrl: './assessment-display.component.html',
  styleUrls: ['./assessment-display.component.scss'],
})
export class AssessmentDisplayComponent implements OnInit {
  // Initialize start and end times

  FinalizedQuestions: any[] = [];

  duration: number = 20;

  cutoff: number = 60;

  checked: boolean = false;

  candidateName: string = 'Sapna';

  startTime!: Date;
endTime!: Date;
  
  constructor(
    private managernameService: ManagernameService,

    private tableservice: TableService
  ) {}

  ngOnInit() {

    this.startTime = new Date();
    
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

        selectedOption : []
      },
    ];

    console.log('qd', this.FinalizedQuestions);

    this.duration = this.managernameService.getDuration();

    this.cutoff = this.managernameService.getCutoff();

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

  

  submitAnswers() {

    this.endTime = new Date();
    
    const postData = {
      candidateName: this.candidateName,
      questions: this.FinalizedQuestions,
      selectedOption: this.FinalizedQuestions.map((question) => question.selectedOption),
      startTime: this.startTime, // Store the start time
    endTime: this.endTime,
      
    };
    console.log("Final Data",postData);
    
  }
}
