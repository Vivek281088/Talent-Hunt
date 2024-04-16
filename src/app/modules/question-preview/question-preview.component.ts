import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import {  ButtonModule } from 'primeng/button';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
@Component({
  selector: 'app-question-preview',
  standalone: true,
  imports: [CommonModule,SidebarModule,ButtonModule],
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss']
})
export class QuestionPreviewComponent implements OnInit{
  @Input() showSidebar !:boolean;
  @Input() previewQuestions !: any;
  @Output() hidePreview : EventEmitter<boolean> = new EventEmitter<boolean>();
  singleQuestion: any;
  totalQuestions !:any
  getQuestionService = inject(NewScheduleService);
  ngOnInit(): void {
   this.getQuestionService.getIndividualQuestion(this.previewQuestions).subscribe((data) => {
    this.totalQuestions = data;
    console.log("total questions preview",this.totalQuestions)
   })
  }
  closeButton() {
    this.showSidebar = false;
    this.hidePreview.emit(false);
    }
    getLabel(index: number) {
      return String.fromCharCode(65 + index);
    }
    getSelectedOptions(question: any, option: any) {
      return question.questionType === "Radio" ? (question.answer === option ? 'correctAnswer' : 'wrongAnswer') : (question.answer.includes(option) ? 'correctAnswer' : 'wrongAnswer');
    }
}
