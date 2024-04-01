import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { Button, ButtonModule } from 'primeng/button';
import { NewScheduleService } from 'src/app/services/new-schedule.service';

@Component({
  selector: 'app-question-preview',
  standalone: true,
  imports: [CommonModule,SidebarModule,ButtonModule],
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss']
})
export class QuestionPreviewComponent implements OnInit{
  @Input() previewQuestions !: string[];
  singleQuestion: any;
  totalQuestions: any;
  getQuestionService = inject(NewScheduleService);
  ngOnInit(): void {
   this.getQuestionService.getIndividualQuestion("").subscribe((data) => {
    this.totalQuestions = data;
   })
  }
  closeButton() {
    throw new Error('Method not implemented.');
    }
    getLabel(_t18: number) {
    throw new Error('Method not implemented.');
    }
    getSelectedOptions(arg0: any,_t17: any): string|string[]|Set<string>|{ [klass: string]: any; }|null|undefined {
    throw new Error('Method not implemented.');
    }
}
