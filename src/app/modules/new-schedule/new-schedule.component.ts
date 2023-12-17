import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
})
export class NewScheduleComponent {
  items: MenuItem[] | undefined;
  tabs: { title: string; content: any }[] = [];
  Tdata!: any;
  selectedQuestion!: any;

  constructor() {}
  ngOnInit() {
    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Assessment', routerLink: 'dashboard' },
      { label: 'New Schedule', routerLink: 'new-schedule' },
    ];
    this.Tdata = [{
      id : 1,
      question: "Which of the following is not a functional interface in Java 8?",
      questionType: "Single Answer",
      options: [
        "Consumer",
        "Supplier",
        "Runnable",
        "Comparator"
      ],
      skills: "Java-8",
      Difficulty_Level: "Intermediate",
      answer: [
        "Comparator"
      ]
    },{
      id : 2,
      question: "Which is the new method introduced in the String class in Java 8?",
      questionType: "Multi Answer",
      options: [
        "Consumer",
        "Supplier",
        "Runnable",
        "Comparator"
      ],
      skills: "Java-8",
      Difficulty_Level: "Expert",
      answer: [
        "Comparator"
      ]
    },{
      id : 3,
      question: "Which of the following is a valid lambda expression in Java 8?",
      questionType: "Multi Answer",
      options: [
        "Consumer",
        "Supplier",
        "Runnable",
        "Comparator"
      ],
      skills: "Java-8",
      Difficulty_Level: "Beginner",
      answer: [
        "Comparator"
      ]
    },{
      id : 4,
      question: "Which of the following is not a functional interface in Java 8?",
      questionType: "Single Answer",
      options: [
        "Consumer",
        "Supplier",
        "Runnable",
        "Comparator"
      ],
      skills: "Java-8",
      Difficulty_Level: "Expert",
      answer: [
        "Comparator"
      ]
    },{
      id : 5,
      question: "What is the output of the program?List<String> names = Arrays.asList('ABC', 'CAB', 'BCA')",
      questionType: "Multi Answer",
      options: [
        "Consumer",
        "Supplier",
        "Runnable",
        "Comparator"
      ],
      skills: "Java-8",
      Difficulty_Level: "Intermediate",
      answer: [
        "Comparator"
      ]
    },{
      id : 6,
      question: "What is Java?",
      questionType: "Single Answer",
      options: [
        "Consumer",
        "Supplier",
        "Runnable",
        "Comparator"
      ],
      skills: "Java-8",
      Difficulty_Level: "Beginner",
      answer: [
        "Comparator"
      ]
    }]

    this.tabs = [
      { title: 'JavaScript', content: this.Tdata },
      { title: 'NodeJS', content: this.Tdata },
      { title: 'React', content: this.Tdata },
      { title: 'MongoDB', content: this.Tdata },
    ];

   
  }

  // createTdataInstance() {
  //   return {
  //     question:
  //       'Which of the following is not a functional interface in Java 8?',
  //     questionType: 'Radio',
  //     options: ['Consumer', 'Supplier', 'Runnable', 'Comparator'],
  //     skills: 'Java-8',
  //     Difficulty_Level: 'E',
  //     answer: ['Comparator'],
  //   };
  // }
}
