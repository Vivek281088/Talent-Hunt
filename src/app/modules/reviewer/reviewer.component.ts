import { Component } from '@angular/core';

import { MessageService } from 'primeng/api';

import { TableService } from 'src/app/services/table.service';

import { ReviewerService } from 'src/app/services/reviewer.service';

import { ManagernameService } from 'src/app/services/managername.service';

@Component({
  selector: 'app-reviewer',

  templateUrl: './reviewer.component.html',

  styleUrls: ['./reviewer.component.scss'],

  providers: [MessageService],
})
export class ReviewerComponent {
  candidateList: any[] = [];

  column!: Column[];

  FinalizedQuestions: any[] = [];

  totalQuestions!: number;

  correctQuestions!: number;

  // inCorrectQuestions!: number;

  // count!: number;

  id: string = '';

  score: number | null = null;

  result!: string;

  visible: boolean = false;

  buttonColors: boolean[] = [];
  buttonColorsWrong : boolean[]=[]

  constructor(
    private messageService: MessageService,

    private reviewerService: ReviewerService,

    private managernameService: ManagernameService
  ) {}

  ngOnInit() {
    this.getExistingTableData();

    this.column = [
      { field: 'email_Managername', header: 'Manager' },

      { field: 'candidateName', header: 'Candidate Name' },

      { field: 'email_Filename', header: 'File Name' },

      { field: 'email_Status', header: 'Status' },

      { field: 'score', header: 'Score' },

      { field: 'result', header: 'S/R' },
    ];
  }

  getExistingTableData() {
    // this.reviewerService.getCandidatetable().subscribe((data) => {

    //   this.candidateList = data;

    //   console.log('tableData', this.candidateList);

    // });

    this.managernameService.getCandidateStatus().subscribe((data) => {
      this.candidateList = data;

      console.log('tableData', this.candidateList);
    });

    //get the question from another collection

    // this.reviewerService.getCandidatetable().subscribe((response) => {

    //   console.log('___________', response);

    //   this.FinalizedQuestions = response[0].questions;

    // });
  }

  markAsCorrect(index: number) {
    this.FinalizedQuestions[index].isCorrect = true;

    this.markInteracted(index);

    this.buttonColors[index] = true;
    this.buttonColorsWrong[index] = false;
  }

  markAsIncorrect(index: number) {
    this.FinalizedQuestions[index].isCorrect = false;

    this.markInteracted(index);

    this.buttonColors[index] = false;
    this.buttonColorsWrong[index] = true;
  }

  interaction = Array(this.FinalizedQuestions.length).fill(false);

  markInteracted(index: number) {
    this.interaction[index] = true;
  }

  checkInteraction(): boolean {
    return this.interaction.every((inter) => inter);
  }

  submitReview(candidate: any) {
    this.totalQuestions = this.FinalizedQuestions.length;

    this.correctQuestions = this.FinalizedQuestions.filter(
      (question) => question.isCorrect
    ).length;

    this.score = (this.correctQuestions / this.totalQuestions) * 100;

    if (this.score > 50) {
      this.result = 'Selected';
    } else this.result = 'Not Selected';

    this.score.toFixed(2);

    console.log('Score :', this.score);

    console.log('Result :', this.result);

    console.log('Correct :', this.correctQuestions);

    // Check if any questions have been marked as correct or incorrect

    let questionsMarked = false;

    for (const question of this.FinalizedQuestions) {
      if (question.isCorrect !== undefined) {
        questionsMarked = true;

        break; // Exit the loop once a marked question is found
      }
    }

    if (!this.checkInteraction()) {
      console.log('Inside Check Interaction', this.interaction);

      this.showError();
    } else {
      const updateData = {
        id: this.id,

        score: this.score.toFixed(2),

        result: this.result,
      };

      this.reviewerService

        .updateScoreAndResult(updateData)

        .subscribe((response) => {
          console.log('Score and result updated successfully', response);
        });

      console.log('Inside Check Interaction', this.interaction);

      this.showSubmitted();

      this.getExistingTableData();

      setTimeout(() => {
        this.visible = false;
      }, 2000);

      // this.FinalizedQuestions = [];
    }
  }

  showSubmitted() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Review Submitted Successfully',
    });
  }

  showError() {
    {
      this.messageService.add({
        severity: 'error',

        summary: 'Error',

        detail: 'Please review all questions before submitting.',
      });
    }
  }

  showDialog(data: any) {
    console.log('name', data);



    this.id = data.id;

    this.reviewerService

      .getTestResponse_by_testId(this.id)

      .subscribe((response) => {
        console.log('testresp', response);

        this.FinalizedQuestions = response.questions;
      });

    console.log('Id', this.id);

    console.log('qd', this.FinalizedQuestions);

    console.log('length', this.FinalizedQuestions.length);

    this.interaction = Array(this.FinalizedQuestions.length).fill(false);

    console.log('Interaction', this.interaction);

    this.visible = true;
  }
}

interface Column {
  field: string;

  header: string;
}
