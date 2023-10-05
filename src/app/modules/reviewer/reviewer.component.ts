import { Component } from '@angular/core';
import { ManagernameService } from 'src/app/services/managername.service';
import { MessageService } from 'primeng/api';
import { TableService } from 'src/app/services/table.service';
import { ReviewerService } from 'src/app/services/reviewer.service';
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

  id: any;

  score: number | null = null;

  result!: string;

  visible: boolean = false;

  
  constructor(
    private managernameService: ManagernameService,
    private messageService: MessageService,
    private tableService: TableService,
    private reviewerService: ReviewerService
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
   this.markInteracted(index);
  }

  markAsIncorrect(index: number) {
    this.FinalizedQuestions[index].isCorrect = false;
    this.markInteracted(index);
  }

  interaction = Array(this.FinalizedQuestions.length).fill(false);
  
  markInteracted(index : number) {
    this.interaction[index] = true;
  }
  checkInteraction() : boolean {
    return this.interaction.every(inter => inter);
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
      console.log("Inside Check Interaction", this.interaction)
      
      this.showError();
    } else {
      const updateData = {
        _id: this.id,
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
    this.FinalizedQuestions = data.questions;
    this.id = data._id;
    console.log('Id', data._id);
    console.log('qd', this.FinalizedQuestions);
    console.log("length", this.FinalizedQuestions.length)
    this.interaction = Array(this.FinalizedQuestions.length).fill(false);
    console.log("Interaction" , this.interaction)
    this.visible = true;
  }
}

interface Column {
  field: string;

  header: string;
}
