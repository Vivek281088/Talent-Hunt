import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { response } from 'express';
import { NgZone } from '@angular/core';
import { Observable, map } from 'rxjs';

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
  state$: Observable<object> | undefined;

  constructor(private route:ActivatedRoute,private dataservice:DataService,private skillsdropdownservice:SkillsdropdownService,
    private ngzone:NgZone) { }
  ngOnInit() {
//     this.state$ = this.route.paramMap
//     .pipe(map(() => window.history.state))

//  console.log("received",this.state$);
    this.dataservice.data$.subscribe(data =>{
      console.log("data received ",data)
      this.tabs = data
      console.log("tabs data",this.tabs)
      // this.title=data.title
    //   this.skillsdropdownservice.postskillsList(data.selectedSkills).subscribe(response =>{
    //     const output=response;
    //     console.log("respose based on skill",output)
    //     // this.createquestion(output)
    //     //this.Tdata=output[0].data;
    //     // console.log("reached tdata",this.Tdata)

    
    //     for(let i=0;i<output.length;i++){
    //        this.tabs.push(
    //       { title: output[i].skills, content: output[i].data },
    //        );
    
    //     }
    //     console.log("tabs",this.tabs)

    //   });
    })
    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Assessment', routerLink: 'dashboard' },
      { label: 'New Schedule', routerLink: 'new-schedule' },
    ];
    // this.Tdata = [{
    //   id : 1,
    //   question: "Which of the following is not a functional interface in Java 8?",
    //   questionType: "Single Answer",
    //   options: [
    //     "Consumer",
    //     "Supplier",
    //     "Runnable",
    //     "Comparator"
    //   ],
    //   skills: "Java-8",
    //   Difficulty_Level: "Intermediate",
    //   answer: [
    //     "Comparator"
    //   ]
    // },{
    //   id : 2,
    //   question: "Which is the new method introduced in the String class in Java 8?",
    //   questionType: "Multi Answer",
    //   options: [
    //     "Consumer",
    //     "Supplier",
    //     "Runnable",
    //     "Comparator"
    //   ],
    //   skills: "Java-8",
    //   Difficulty_Level: "Expert",
    //   answer: [
    //     "Comparator"
    //   ]
    // },{
    //   id : 3,
    //   question: "Which of the following is a valid lambda expression in Java 8?",
    //   questionType: "Multi Answer",
    //   options: [
    //     "Consumer",
    //     "Supplier",
    //     "Runnable",
    //     "Comparator"
    //   ],
    //   skills: "Java-8",
    //   Difficulty_Level: "Beginner",
    //   answer: [
    //     "Comparator"
    //   ]
    // },{
    //   id : 4,
    //   question: "Which of the following is not a functional interface in Java 8?",
    //   questionType: "Single Answer",
    //   options: [
    //     "Consumer",
    //     "Supplier",
    //     "Runnable",
    //     "Comparator"
    //   ],
    //   skills: "Java-8",
    //   Difficulty_Level: "Expert",
    //   answer: [
    //     "Comparator"
    //   ]
    // },{
    //   id : 5,
    //   question: "What is the output of the program?List<String> names = Arrays.asList('ABC', 'CAB', 'BCA')",
    //   questionType: "Multi Answer",
    //   options: [
    //     "Consumer",
    //     "Supplier",
    //     "Runnable",
    //     "Comparator"
    //   ],
    //   skills: "Java-8",
    //   Difficulty_Level: "Intermediate",
    //   answer: [
    //     "Comparator"
    //   ]
    // },{
    //   id : 6,
    //   question: "What is Java?",
    //   questionType: "Single Answer",
    //   options: [
    //     "Consumer",
    //     "Supplier",
    //     "Runnable",
    //     "Comparator"
    //   ],
    //   skills: "Java-8",
    //   Difficulty_Level: "Beginner",
    //   answer: [
    //     "Comparator"
    //   ]
    // }]

    // this.tabs = [
    //   { title: 'JavaScript', content: this.Tdata },
    //   { title: 'NodeJS', content: this.Tdata },
    //   { title: 'React', content: this.Tdata },
    //   { title: 'MongoDB', content: this.Tdata },
    // ];
  }
   
  }


  // createquestion(output:any){
  //   console.log("reached",output)
   
   

  // }

