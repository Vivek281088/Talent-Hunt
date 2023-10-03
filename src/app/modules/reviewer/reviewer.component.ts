import { Component } from '@angular/core';

import { ManagernameService } from 'src/app/services/managername.service';

import { MessageService } from 'primeng/api';
import { TableService } from 'src/app/services/table.service';
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

  score: number | null = null;

  result!: string;

  visible: boolean = false;


  constructor(
    private managernameService: ManagernameService,
    private messageService: MessageService,
    private tableService: TableService
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
    this.managernameService.getCandidateStatus().subscribe((data) => {
      this.candidateList = data;
      console.log('tableData', this.candidateList);
    });
  }

  markAsCorrect(index: number) {
    this.FinalizedQuestions[index].isCorrect = true;
  }

  markAsIncorrect(index: number) {
    this.FinalizedQuestions[index].isCorrect = false;
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

    this.showSubmitted();
    this.visible = false;
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
  showDialog(ManagerName: string, fileName: string) {
    this.tableService
      .getdataby_FileName(ManagerName, fileName)
      .subscribe((data) => {
        console.log('View Data', data);

        this.FinalizedQuestions = data[0].questions;
        console.log('questions :', this.FinalizedQuestions);
      });
    this.visible = true;
  }
}

interface Column {
  field: string;

  header: string;
}
