import { Component ,ViewChild, ViewChildren,QueryList} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { response } from 'express';
import { NgZone } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
import { Table } from 'primeng/table';
import { Checkbox } from 'primeng/checkbox';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
})
export class NewScheduleComponent {
  [x: string]: any;
  items: MenuItem[] | undefined;
  tabs: { title: string; content: any }[] = [];
  Tdata!: any;
  selectedQuestion!: any;
  state$: Observable<object> | undefined;
  retrieved_schedulename!:string
  retrieved_managername!:string
  retrieved_selectedSkills!:any
  retrieved_cutoff!:number
  retrieved_duration!:number
  // showCheckbox:boolean=false
  selected:boolean=false
  data:any
  // scheduleName!:string
  // manager!:String
  // selectedSkills!:any
  // cutOff!:number
  // duration!:number

// @ViewChild('yourTable')yourTable:Table | undefined;

  @ViewChildren('tableCheckbox')
  tableCheckboxes!: QueryList<any>;

  // selectallItems(){
    
  //   this.tabs.forEach(item=>{
  //     // item.content.showCheckbox=true;
  //     item.content.selected=true;
  //   })
  // }

  constructor(private route:ActivatedRoute,private dataservice:DataService,private skillsdropdownservice:SkillsdropdownService,
    private newScheduleService:NewScheduleService,) {
      // this.data=this.dataservice.sharedData;
     }
  ngOnInit() {

  
    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Assessment', routerLink: 'dashboard' },
      { label: 'New Schedule', routerLink: 'new-schedule' },
    ];

  
// console.log("data received",this.data)
    const newScheduleData=this.newScheduleService.getNewScheduleData();

    const scheduleName=localStorage.getItem("scheduleName")
    this.retrieved_schedulename=newScheduleData.scheduleName

    // const manager=localStorage.getItem("manager")
    this.retrieved_managername=newScheduleData.manager
    // const selectedSkills=localStorage.getItem("selectedSkills")
     this.retrieved_selectedSkills=newScheduleData.selectedSkills

    // const cutOff=localStorage.getItem("cutoff")
    this.retrieved_cutoff=newScheduleData.cutOff
    // const duration=localStorage.getItem("duration")
    this.retrieved_duration=newScheduleData.duration

    console.log("received data",newScheduleData);
    this.skillsdropdownservice.postskillsList(newScheduleData.selectedSkills).subscribe(response =>{
      console.log("recieved response",response);
      for(let i=0;i<response.length;i++){
        this.tabs .push(
          { title: response[i].skills, content: response[i].data }
        )         
        

      }
      console.log("recieved response1",this.tabs);
     
    })
 
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


 

