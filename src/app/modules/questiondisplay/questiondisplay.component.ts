import { Component, OnInit } from '@angular/core';

import { ManagernameService } from 'src/app/services/managername.service';

import { TableService } from 'src/app/services/table.service';

@Component({
  selector: 'app-questiondisplay',

  templateUrl: './questiondisplay.component.html',

  styleUrls: ['./questiondisplay.component.scss'],
})
export class QuestiondisplayComponent implements OnInit {
  FinalizedQuestions: any[] = [];

  duration: number = 0;

  fileName: string = '';

  tableService: any;

  cutoff: number = 0;

  checked: boolean = false;

  Managername: any;

  constructor(
    private managernameService: ManagernameService,

    private tableservice: TableService
  ) {}

  ngOnInit() {
    this.FinalizedQuestions = this.managernameService.getFinalizedQuestions();

    this.Managername = this.managernameService.getManagerName();

    this.fileName = this.managernameService.getFileName();

    console.log('qd', this.FinalizedQuestions);

    this.duration = this.managernameService.getDuration();

    this.cutoff = this.managernameService.getCutoff();

    this.FinalizedQuestions.forEach((question) => {
      if (question.questionType === 'Checkbox') {
        question.selectedOption = question.answer.split(',');
      } else if (question.questionType === 'Radio') {
        question.selectedOption = question.answer;

        //  console.log(quetion.selectedOption)
      } else {
        question.selectedOption = null;
      }
    });

    console.log();
  }
}
