import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
})
export class NewScheduleComponent {
  items: MenuItem[] | undefined;
  tabs: { title: string, content: string }[] = [];
  Tdata !: any;

  constructor(private route:ActivatedRoute) { }
  ngOnInit() {
    this.route.params.subscribe(params=>{
      const scheduleName=params['param1']
      const manager=params['param2']
      const selectedSkill=params['param3']
      const cutOff=params['param4']
      const duration=params['param5']

      console.log("data recieved from schedule page ",scheduleName,manager,selectedSkill,cutOff,duration)

    })
    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Assessment', routerLink: 'dashboard' },
      { label: 'New Schedule', routerLink: 'new-schedule' },
    ];

    this.tabs = [
      { title: 'JavaScript', content: this.Tdata },
      { title: 'NodeJS', content: this.Tdata },
      { title: 'React', content: this.Tdata },
      { title: 'MongoDB', content: this.Tdata }
    ];

    this.Tdata = [
      "wbjbxw","w hwxh"
      //     {
    
      //   "question": "Which of the following is not a functional interface in Java 8?",
      //   "questionType": "Radio",
      //   "options": [
      //     "Consumer",
      //     "Supplier",
      //     "Runnable",
      //     "Comparator"
      //   ],
      //   "skills": "Java-8",
      //   "Difficulty_Level": "E",
      //   "answer": [
      //     "Comparator"
      //   ]
      // }

      // }
    ]
  }
}
