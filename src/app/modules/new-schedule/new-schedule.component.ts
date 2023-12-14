import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
})
export class NewScheduleComponent {
  items: MenuItem[] | undefined;
  tabs: { title: string, content: string }[] = [];
  Tdata !: any;

  constructor() {}
  ngOnInit() {
    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Assessment', routerLink: 'dashboard' },
      { label: 'New Schedule', routerLink: 'new-schedule' },
    ];

    this.tabs = [
      { title: 'JavaScript', content: 'Tab 1 Content' },
      { title: 'NodeJS', content: 'Tab 2 Content' },
      { title: 'React', content: 'Tab 3 Content' },
      { title: 'MongoDB', content: 'Tab 3 Content' }
  ];

  this.Tdata={
    
    "question": "Which of the following is not a functional interface in Java 8?",
    "questionType": "Radio",
    "options": [
      "Consumer",
      "Supplier",
      "Runnable",
      "Comparator"
    ],
    "skills": "Java-8",
    "Difficulty_Level": "E",
    "answer": [
      "Comparator"
    ]
  }

  }
}
