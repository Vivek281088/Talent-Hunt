import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';
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
  visible: boolean = false;
  questionPreviewvisible: boolean = false;
  previewSidebarVisible : boolean = false;
  visible1: boolean = false;
  ischecked: boolean = true;
  slectedquestionforedit: any;
  TotalQuestions: any[] = [];
  managerOption: any[] = [];
  singleQuestion: any;
  singleQuestionOption : any
  singleQuestionAnswer : any;
 

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

    this.loadManagerNames();

    this.items = [
      { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
      { label: 'Assessment', routerLink: 'dashboard' },
      { label: 'New Schedule', routerLink: 'new-schedule' },
    ];

    const a = localStorage.getItem('boolean');
    if (a == null) {
      this.scheduleName = localStorage.getItem('scheduleName');
      console.log('sname', this.scheduleName);
      this.manager = localStorage.getItem('manager');

      this.selectedSkills = this.dataservice.getData();

      console.log('ss', this.selectedSkills);
      this.cutOff = localStorage.getItem('cutoff');
      this.duration = localStorage.getItem('duration');
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

          this.cdr.detectChanges();
        });
    } else {
      this.scheduleName = localStorage.getItem('scheduleName');
      this.manager = this.managernameService.getManagerName();
      this.cutOff = this.managernameService.getCutoff();
      this.duration = this.managernameService.getDuration();
      this.selectedSkills = this.skillsdropdownservice.getSkill();
      this.slectedquestionforedit =
        this.managernameService.getFinalizedQuestions();
      this.skillsdropdownservice
        .postskillsList(this.selectedSkills)
        .subscribe((response) => {
          console.log('recieved response', response);
          // this.ngzone.run(() => {
          // Your code that triggers change
          // this.tabs.push(...transformedData);
          for (var i = 0; i < response.length; i++) {
            // console.log("received id--------------------------",response.data[i].id)
            this.TotalQuestions.push(response[i].data);

            this.tabs.push({
              title: response[i].skills,
              content: response[i].data,
            });
          }
          console.log(
            'Total question--------------------------->',
            this.TotalQuestions
          );
          console.log(
            'selected ques----------------------------------',
            this.slectedquestionforedit
          );
          var count = 0;
          for (var res of response) {
            for (var data of res.data) {
              console.log(data.id);
              console.log(count++);
            }
          }

          this.cdr.detectChanges();
          this.processTotalQuestions();
        });
    }
    localStorage.removeItem('boolean');


  }
  trackByFn(_index: any, item: { id: any }) {
    return item.id; // Use a unique identifier property of your items
  }

  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe((data) => {
      this.managerOption = data;
      console.log('managernames------------>', this.managerOption);
    });
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

      // const date = Date.now();
      const dataToSave = {
        Questions: this.FinalizedQuestions,
        durations: this.duration,

        JobDescription: this.scheduleName,

        cutoff: this.cutOff,

        Managername: this.manager,
        // id:date,
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
      console.log(' tab content ', tab.content);
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
  //
  processTotalQuestions() {
    // console.log("vara edit",this.slectedquestionforedit)
    this.count = this.slectedquestionforedit.length;
    console.log('count----------------------->', this.count);

    // // this.slectedquestionforedit.forEach((finalizedQuestion: any) =>
    // for(let a=0;a<this.count;a++)
    //  {
    //   console.log("first lop--------------------------",this.TotalQuestions)
    //   for (let key of this.TotalQuestions) {
    //     console.log("key--------------------",key)
    //     if (this.TotalQuestions.hasOwnProperty(key)) {
    //       const skillQuestions = this.TotalQuestions[key];
    //       console.log("toa")

    //       for (let i = 0; i < skillQuestions.length; i++) {
    //         if (skillQuestions[i].id === this.slectedquestionforedit[a].id) {
    //           console.log('Matched question', skillQuestions[i].id);

    //           skillQuestions[i].selected = true;

    //           break;
    //         }
    //       }
    //     }
    //   }
    // };
    // for(let i=0;i<this.TotalQuestions.length;i++){
    //   for(let j=0;j<this.TotalQuestions[i].length;j++){
    //     for(let k=0;k<this.slectedquestionforedit.length;k++){
    //       if(this.TotalQuestions[i][j].id===this.slectedquestionforedit[k].id){
    //         console.log("match found")
    //         this.TotalQuestions[i][j].selection=true
    //         console.log("total after match",this.TotalQuestions[i][j])
    //       }
    //     }
    //   }
    // }

    if (!this.selectedquestions) {
      this.selectedquestions = [];
    }
    for (let sec of this.slectedquestionforedit) {
      for (let i = 0; i < this.tabs.length; i++) {
        console.log('tabs value', this.tabs[i].content);
        for (let j = 0; j < this.tabs[i].content.length; j++) {
          if (sec.id == this.tabs[i].content[j].id) {
            console.log('match found');
            this.tabs[i].content[j].selection = true;
            if (!this.selectedquestions) {
              this.selectedquestions = [];
            }
            this.selectedquestions.push(this.tabs[i].content[j]);
            console.log(
              'content after pushed===================',
              this.selectedQuestion
            );
          }
        }
      }
    }
  }

  cancelButton() {
    this.router.navigate(['/dashboard']);
    // scheduleName manager cutoff duration
    // localStorage.removeItem("scheduleName")
    // localStorage.removeItem("manager")
    // localStorage.removeItem("cutoff")
    // localStorage.removeItem("duration")
  }

  editicon() {
    this.visible = true;
  }
  update(
    scheduleName: string | null,
    manager: String | null,
    cutOff: string | number | null,
    duration: string | number | null
  ) {
    this.scheduleName = scheduleName;
    this.manager = manager;
    this.cutOff = cutOff;
    this.duration = duration;
    this.router.navigate(['new-schedule']);
    this.visible = false;
    console.log('hi');
  }

  questionPreview(questions: any) {
    this.questionPreviewvisible = true;
    this.singleQuestion = questions.question;
    this.singleQuestionOption = questions.options
    this.singleQuestionAnswer = questions.answer;
  }

  closeButton() {
    this.questionPreviewvisible = false;
  }

  onPreviewClick(){
    
      this.previewSidebarVisible = true;
    
    
  }
  getSelectedOptions(selected_Option: any, option: any) {
    console.log("Function Working")
    if (option.includes(selected_Option)) {
      console.log('correct answer');
      return 'correctAnswer';
    } else {
      return 'wrongAnswer';
    }
  }
  getLabel(index: number) {
    return String.fromCharCode(65 + index);
  }
}
