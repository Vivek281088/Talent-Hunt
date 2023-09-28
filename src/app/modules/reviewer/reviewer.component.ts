import { Component } from '@angular/core';

import { ManagernameService } from 'src/app/services/managername.service';

@Component({
  selector: 'app-reviewer',
  templateUrl: './reviewer.component.html',
  styleUrls: ['./reviewer.component.scss'],
})
export class ReviewerComponent {
  candidateList: any[] = [];

  column!: Column[];

  FinalizedQuestions: any[] = [];

  totalQuestions!: number;

  correctQuestions!: number;

  score!: number;

  result !: string;

  visible: boolean = false;

  constructor(private managernameService: ManagernameService) {}

  ngOnInit() {
    this.getExistingTableData();

    this.column = [
      { field: 'candidate', header: 'Candidate' },

      { field: 'status', header: 'Status' },

      { field: 'score', header: 'Score' },
    ];

    this.FinalizedQuestions = [
      {
        Difficulty_Level: 'E',

        answer: ['Comparator'],

        options: ['Consumer', 'Supplier', 'Runnable', 'Comparator'],

        question:
          'Which of the following is not a functional interface in Java 8?',

        questionType: 'Radio',

        selectedOption: ['Comparator'],

        skills: 'Java-8',
      },

      {
        Difficulty_Level: 'M',

        answer: ['Consumer'],

        options: ['Consumer', 'Charger', 'Adapter', 'Comparator'],

        question: 'Which of the following is a functional interface in Java 8?',

        questionType: 'Radio',

        selectedOption: ['Consumer'],

        skills: 'Java-8',
      },
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
  submitReview() {
    this.totalQuestions = this.FinalizedQuestions.length;
    this.correctQuestions = this.FinalizedQuestions.filter(
      (question) => question.isCorrect
    ).length;
    this.score = (this.correctQuestions / this.totalQuestions) * 100;

    if (this.score > 50) {
      this.result = "Selected";
    }
    else this.result= "Not Selected"

    this.score.toFixed(2);
  }
  showDialog() {
    this.visible = true;
  }
}

interface Column {
  field: string;

  header: string;
}
