import { Component ,ViewChild, ViewChildren,QueryList, ChangeDetectorRef} from '@angular/core';
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
import { ManagernameService } from 'src/app/services/managername.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-schedule',
  templateUrl: './new-schedule.component.html',
  styleUrls: ['./new-schedule.component.scss'],
})
export class NewScheduleComponent {
  [x: string]: any;
  items: MenuItem[] | undefined;
  tabs: { title: any; content: any }[] = [];
  Tdata!: any;
  selectedQuestion!: any;
  state$: Observable<object> | undefined;
  retrieved_schedulename!: string;
  retrieved_managername!: string;
  retrieved_selectedSkills!: any;
  retrieved_cutoff!: number;
  retrieved_duration!: number;
  // showCheckbox:boolean=false
  selected: boolean = false;
  data: any;
  scheduleName!: string | null;
  // scheduleName!:string
  manager!: String | null;
  selectedSkills!: any | null;
  cutOff!: string | number | null;
  duration!: string | number | null;
  skill!: string | null;
  questions = [];
  public selectedquestions: any[] = [];
  FinalizedQuestions: any[] = [];
  selectedQuestionCount!: number;
  viewQuestionSidebar: boolean=false;

  // @ViewChild('yourTable')yourTable:Table | undefined;

  @ViewChildren('tableCheckbox')
  tableCheckboxes!: QueryList<any>;

  // selectallItems(){

  //   this.tabs.forEach(item=>{
  //     // item.content.showCheckbox=true;
  //     item.content.selected=true;
  //   })
  // }

  constructor(
    private route: ActivatedRoute,
    private dataservice: DataService,
    private skillsdropdownservice: SkillsdropdownService,
    private newScheduleService: NewScheduleService,
    private ngzone: NgZone,
    private cdr: ChangeDetectorRef,
    private managernameService: ManagernameService,
    private router: Router
  ) {
    // this.data=this.dataservice.sharedData;
  }
  ngOnInit() {
    // console.log("se",this.selectedquestions)
    console.log('Selected Questions during ngOnInit:', this.selectedquestions);

    // Remove unselected questions from the selectedquestions array
    this.selectedquestions = this.selectedquestions.filter(
      (question) => question.Selected
    );

    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Assessment', routerLink: 'dashboard' },
      { label: 'New Schedule', routerLink: 'new-schedule' },
    ];
    // console.log("selected data",Selected)

    // console.log("data received",this.data)
    // const newScheduleData=this.newScheduleService.getNewScheduleData();

    this.scheduleName = localStorage.getItem('scheduleName');
    console.log('sname', this.scheduleName);
    this.manager = localStorage.getItem('manager');
    // const ss:any=localStorage.getItem(("selectedSkills"))
    // this.selectedSkills= JSON.parse(ss)
    this.selectedSkills = this.dataservice.getData();
    //  this.selectedSkills=JSON.parse(this.skill);
    console.log('ss', this.selectedSkills);
    this.cutOff = localStorage.getItem('cutoff');
    this.duration = localStorage.getItem('duration');

    // thisretrieved_schedulename=scheduleName

    // const manager=localStorage.getItem("manager")
    // this.retrieved_managername=newScheduleData.manager
    // const selectedSkills=localStorage.getItem("selectedSkills")
    //  this.retrieved_selectedSkills=newScheduleData.selectedSkills

    // const cutOff=localStorage.getItem("cutoff")
    // this.retrieved_cutoff=newScheduleData.cutOff
    // const duration=localStorage.getItem("duration")
    // this.retrieved_duration=newScheduleData.duration

    // console.log("received data",newScheduleData);
    this.skillsdropdownservice
      .postskillsList(this.selectedSkills)
      .subscribe((response) => {
        console.log('recieved response', response);
        // this.ngzone.run(() => {
        // Your code that triggers change
        // this.tabs.push(...transformedData);
        for (let i = 0; i < response.length; i++) {
          this.tabs.push({
            title: response[i].skills,
            content: response[i].data,
          });
        }
        console.log('Received response', this.tabs);
        // });

        console.log('recieved response1', this.tabs);
        this.cdr.detectChanges();
      });

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
  trackByFn(_index: any, item: { id: any }) {
    return item.id; // Use a unique identifier property of your items
  }

  toggleSelection(question: any): void {
    question.Selected = !question.Selected;
    console.log('loop entered');

    if (question.Selected) {
      this.selectedquestions.push(question);
      console.log('Selected Questions:', this.selectedquestions);
    } else {
      this.selectedquestions = this.selectedquestions.filter(
        (selected) => selected !== question
      );
      console.log('Selected Questions:', this.selectedquestions);
    }

    console.log('Selected Questions:', this.selectedquestions);
    // this.logSelectedQuestions();
  }
  count!: number;

  async saveSelected() {
    this.FinalizedQuestions = this.selectedquestions;
    console.log('selected', this.selectedquestions);
    console.log('Final', this.FinalizedQuestions);
    this.count = this.FinalizedQuestions.filter(
      (question) => question.selected
    ).length;
    console.log('count', this.count);

    this.managernameService.setFinalizedQuestions(this.FinalizedQuestions);

    try {
      const selectedSkillName = this.selectedSkills.sort();

      const dataToSave = {
        Questions: this.FinalizedQuestions,
        durations: this.duration,

        JobDescription: this.scheduleName,

        cutoff: this.cutOff,

        Managername: this.manager,
        Skill: selectedSkillName,
      };
      console.log('response', dataToSave);

      this.skillsdropdownservice
        .postquestions(dataToSave)
        .subscribe((response) => {
          console.log('Questions', response);
          this.router.navigate(['/dashboard']);
        });
    } catch (error) {
      console.error(error);
    }
  }

  selectAllQuestions(tab: any) {
    if (tab && tab.content) {
      tab.content.forEach((question: any) => {
        question.selection = true;
        this.selectedquestions.push(question);
      });
      this.selectedQuestion = tab.content;
    }
  }
  unselectAllQuestions(tab: any) {
    if (tab && tab.content) {
      tab.content.forEach((question: any) => {
        question.selection = false;
        this.selectedquestions = [];
      });
      this.selectedQuestion = [];
    }
  }

  cancelButton() {
    this.router.navigate(['/dashboard']);
  }
  getSelectedOptions(selected_Option: any, option: any) {
    if (selected_Option.includes(option)) {
      console.log('correct answer');
      return 'correctAnswer';
    } else {
      return 'wrongAnswer';
    }
  }
  getLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }
  handlePreviewIcon() {
    this.viewQuestionSidebar = true;
  }
}


 

