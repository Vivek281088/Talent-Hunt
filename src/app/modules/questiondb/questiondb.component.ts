import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { ManagernameService } from '../../services/managername.service';
import { response } from 'express';

@Component({
  selector: 'app-questiondb',
  templateUrl: './questiondb.component.html',
  styleUrls: ['./questiondb.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class QuestiondbComponent {
  skillSet: any[] = [];
  selectedSkill: any[] = [];
  totalQuestions: { [key: string]: any[] } = {};
  selectedQuestions: any[] = [];
  count!: number;
  showUpload: boolean = false;
  addQuestionVisible: boolean = false;
  isEditSubmit!: boolean;
  chosenSkill!: String;
  options: any[] = [];
  selectedType: boolean = false;
  selectedQuestionType!: string;
  selectedDifficultyType!: string;
  selectedAnswers!: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  question!: string;
  id: string = '';
  deleteSkill: string = '';
  selectedAnswer: any[] = [];
  difficultyLevel: string[] = ['Easy', 'Medium', 'Hard'];

  questionType: string[] = ['Radio', 'Checkbox', 'Text'];
  isViewingQuestion: boolean = false;

  constructor(
    private messageService: MessageService,
    private skillsdropdownservice: SkillsdropdownService,
    private managernameService: ManagernameService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.loadSkillsforDropDown();
  }

  //question display
  submitForm() {
    console.log('Selected Skills:', this.selectedSkill);

    this.skillsdropdownservice
      .postskillsList(this.selectedSkill)
      .subscribe((response) => {
        console.log('response', response);
        this.totalQuestions = response;
      });
  }
  areAllQuestionsSelected(skillKey: any): boolean {
    const skillQuestions = this.totalQuestions[skillKey];

    return skillQuestions.every((question) => question.selected);
  }

  updateQuestions() {
    const updateData = {
      id: this.id,
      question: this.question,
      questionType: this.selectedQuestionType,
      options: this.options,
      skills: this.chosenSkill,
      Difficulty_Level: this.getBackendDifficultyLevel(
        this.selectedDifficultyType
      ),
      answer: this.selectedAnswer,
    };
    console.log('before const data', updateData);
    this.skillsdropdownservice

      .updateQuestion(updateData)

      .subscribe((response) => {
        console.log('Question updated successfully', updateData);
      });
  }
  selectAllChanged(skillKey: any) {
    const skillQuestions = this.totalQuestions[skillKey];

    const areAllSelected = this.areAllQuestionsSelected(skillKey);

    let increment = 0;

    for (let question of skillQuestions) {
      if (!areAllSelected) {
        if (!question.selected) {
          question.selected = true;

          increment++;

          this.selectedQuestions.push(question); // Add the question to the selectedQuestions array
        }
      } else {
        if (question.selected) {
          question.selected = false;

          increment--;

          const index = this.selectedQuestions.findIndex(
            (selectedQuestion) => selectedQuestion.id === question.id
          );

          if (index !== -1) {
            this.selectedQuestions.splice(index, 1); // Remove the question from the selectedQuestions array
          }
        }
      }
    }

    this.count += increment;

    // Ensure count is not negative

    if (this.count < 0) {
      this.count = 0;
    }
  }

  addSkillVisible!: boolean;
  openDialog() {
    this.addQuestionVisible = true;
  }
  onAddQuestionClick(skill: any) {
    this.chosenSkill = skill;
    this.isEditSubmit = false;
    this.addQuestionVisible = true;
    this.isViewingQuestion = false;
  }
  closeDialog() {
    // this.isViewingQuestion = true;
    this.addQuestionVisible = false;
    this.addSkillVisible = false;
    this.resetData();
    this.loadSkillsforDropDown();
  }
  openSkillDialog() {
    this.addSkillVisible = true;
  }
  checkboxChanged(item: any) {
    if (item.selected) {
      this.selectedQuestions.push(item);
    } else {
      //removing question after unselecting
      const index = this.selectedQuestions.findIndex(
        (selectedQuestion) => selectedQuestion.id === item.id
      );
      if (index !== -1) {
        this.selectedQuestions.splice(index, 1);
      }
    }
  }
  newSkill: string = '';
  addSkill() {
    console.log('New Skill---', this.newSkill);
    this.showSkillSubmitted();
    this.skillsdropdownservice
      .postSkill(this.newSkill)
      .subscribe((response) => {
        console.log('Response', response);
      });

    setTimeout(() => {
      this.closeDialog();
    }, 2000);
  }
  resetData() {
    this.question = '';
    this.selectedQuestionType = '';
    this.options = [];
    this.chosenSkill = '';
    this.selectedDifficultyType = '';
    this.selectedAnswer = [];
  }

  showFileUpload() {
    this.showUpload = !this.showUpload;
    console.log('hi', this.showUpload);
  }

  onFileUpload() {
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
    // Handle the uploaded file here if needed
  }

  onFileRemove() {
    this.messageService.add({
      severity: 'warn',
      summary: 'File Removed',
      detail: '',
    });
    // Handle the removed file here if needed
  }

  loadSkillsforDropDown() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;
      console.log('Skills---', this.skillSet);
      console.log('data', data);
    });
  }

  onEditClick(data: any) {
    this.isViewingQuestion = false;
    this.isEditSubmit = true;
    this.openDialog();
    console.log('Edit Data', data);

    //set the value
    this.id = data.id;
    this.question = data.question;
    this.selectedQuestionType = data.questionType;
    this.options = data.options;
    this.chosenSkill = data.skills;
    this.selectedDifficultyType = this.getBackendDifficultyLevelViceVersa(
      data.Difficulty_Level
    );
    this.selectedAnswer = data.answer;

    console.log('1.', this.question);
    console.log('2.', this.selectedQuestionType);
    console.log('3.', this.options);
    console.log('4.', this.chosenSkill);
    console.log('5.', this.selectedDifficultyType);
    console.log('6.', this.selectedAnswer);
  }

  //view
  onViewClick(data: any) {
    this.isViewingQuestion = true;
    this.openDialog();

    //set the value
    this.id = data.id;
    this.question = data.question;
    this.selectedQuestionType = data.questionType;
    this.options = data.options;
    this.chosenSkill = data.skills;
    this.selectedDifficultyType = this.getBackendDifficultyLevelViceVersa(
      data.Difficulty_Level
    );
    this.selectedAnswer = data.answer;
  }
  //question add
  addQuestion() {
    if (this.isEditSubmit) {
      console.log('Inside If---------------->');
      this.showUpdated();
      this.updateQuestions();

      setTimeout(() => {
        this.closeDialog();
        this.submitForm(); //update the display of the table
        this.resetData();
      }, 1000);
    } else {
      console.log('Inside Else');
      const backendDifficultyLevel = this.getBackendDifficultyLevel(
        this.selectedDifficultyType
      );

      this.showSubmitted();
      this.managernameService
        .postquestionstodb(
          this.question,
          this.selectedQuestionType,
          this.options,
          this.chosenSkill,
          backendDifficultyLevel,
          this.selectedAnswer
        )
        .subscribe((data) => {
          console.log('hi', data);
        });

      setTimeout(() => {
        this.closeDialog();
        this.resetData();
        this.submitForm();
      }, 1000);
    }
  }

  //delete question
  deleteQuestion(data: any) {
    console.log('Delete Data', data);

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete this question?',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Deleted',
          detail: 'Question deleted Successfully',
        });
        this.confirmDelete(data);

        setTimeout(() => {
          this.submitForm();
        }, 1000);
      },
      reject: () => {},
    });
  }
  confirmDelete(data: any) {
    console.log('Delete Data', data);
    this.id = data.id;
    this.deleteSkill = data.skills;
    this.skillsdropdownservice
      .deleteQuestion(this.id, this.deleteSkill)
      .subscribe(() => {});
  }

  getBackendDifficultyLevel(frontendValue: string): string {
    console.log('Diff', frontendValue);
    if (frontendValue === 'Easy') {
      return 'E';
    } else if (frontendValue === 'Medium') {
      return 'M';
    } else if (frontendValue === 'Hard') {
      return 'H';
    }
    return frontendValue;
  }
  getBackendDifficultyLevelViceVersa(frontendValue: string): string {
    if (frontendValue === 'E') {
      return 'Easy';
    } else if (frontendValue === 'M') {
      return 'Medium';
    } else if (frontendValue === 'H') {
      return 'Hard';
    }
    return frontendValue;
  }

  showSubmitted() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Question Added Successfully',
    });
  }

  showSkillSubmitted() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Skill Added Successfully',
    });
  }

  showUpdated() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Question Updated Successfully',
    });
  }
}
