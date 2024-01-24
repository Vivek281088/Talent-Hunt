import {
  Component,
  ViewChild,
  ViewChildren,
  QueryList,
  ChangeDetectorRef,
} from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { NgZone } from '@angular/core';
import { Observable, map } from 'rxjs';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

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
  selectedquestions: any[] = [];
  FinalizedQuestions: any[] = [];
  selectedQuestionCount!: number;
  visible: boolean = false;
  questionPreviewvisible: boolean = false;
  previewSidebarVisible: boolean = false;
  visible1: boolean = false;
  ischecked: boolean = true;
  // slectedquestionforedit: any;
  TotalQuestions: any[] = [];
  managerOption: any[] = [];
  singleQuestion: any;
  singleQuestionOption: any;
  singleQuestionAnswer: any;
  QuestionView: boolean = false;
  question!: string;
  isEditSchedule: boolean = false;

  updateNewScheduleForm!: FormGroup;
  formSubmitted: boolean = false;
  formData: any;

  @ViewChildren('tableCheckbox')
  tableCheckboxes!: QueryList<any>;

  constructor(
    private route: ActivatedRoute,
    private dataservice: DataService,
    private skillsdropdownservice: SkillsdropdownService,
    private newScheduleService: NewScheduleService,
    private ngzone: NgZone,
    private cdr: ChangeDetectorRef,
    private managernameService: ManagernameService,
    private messageService: MessageService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.updateNewScheduleForm = this.fb.group({
      scheduleName: ['', [Validators.required]],
      managerName: ['', [Validators.required]],

      cutoff: [null, [Validators.required]],
      duration: [null, [Validators.required]],
    });
  }
  ngOnInit() {
    // console.log("se",this.selectedquestions);
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
      this.updateNewScheduleForm.patchValue({
        scheduleName: localStorage.getItem('scheduleName'),
        managerName: localStorage.getItem('manager'),

        cutoff: localStorage.getItem('cutoff'),
        duration: localStorage.getItem('duration'),
      });
      // this.scheduleName = localStorage.getItem('scheduleName');
      // console.log('sname', this.scheduleName);
      // this.manager = localStorage.getItem('manager');

      this.selectedSkills = this.dataservice.getData();

      console.log('ss', this.selectedSkills);
      // this.cutOff = localStorage.getItem('cutoff');
      // this.duration = localStorage.getItem('duration');
      this.skillsdropdownservice
        .postskillsList(this.selectedSkills)
        .subscribe((response) => {
          console.log('recieved response', response);

          for (let i = 0; i < response.length; i++) {
            this.tabs.push({
              title: response[i].skills,
              content: response[i].data,
            });
          }

          this.cdr.detectChanges();
        });
    } else {
      this.updateNewScheduleForm.patchValue({
        scheduleName: localStorage.getItem('scheduleName'),
        managerName: this.managernameService.getManagerName(),

        cutoff: this.managernameService.getCutoff(),
        duration: this.managernameService.getDuration(),
      });
      console.log('Edit Data------', this.updateNewScheduleForm.value);

      this.formData = this.updateNewScheduleForm.value;

      this.formData.scheduleName = localStorage.getItem('scheduleName');

      this.formData.managerName = this.managernameService.getManagerName();
      this.formData.cutoff = this.managernameService.getCutoff();
      this.formData.duration = this.managernameService.getDuration();

      this.selectedSkills = this.skillsdropdownservice.getSkill();
      this.selectedquestions = this.managernameService.getFinalizedQuestions();
      console.log('selected edit question', this.selectedquestions);

      // const observables = this.managernameService.getFinalizedQuestions()
      //   .map((questionId: string) =>
      //     this.newScheduleService.getIndividualQuestion(questionId)
      //   );
      // forkJoin(observables).subscribe((responses) => {

      //   this.totalSelectedQuestions = responses;
      //   console.log('Edit Question ---', this.totalSelectedQuestions);
      //   console.log('selected edit question', this.totalSelectedQuestions);
      // });

      this.skillsdropdownservice
        .postskillsList(this.selectedSkills)
        .subscribe((response) => {
          console.log('recieved response', response);
          for (let i = 0; i < response.length; i++) {
            for (let j = 0; j < response[i].data.length; j++)
              this.TotalQuestions.push(response[i].data[j]);

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
            this.selectedquestions
          );
          this.checkEditQuestions(this.TotalQuestions, this.selectedquestions);
          // var count = 0;
          // for (var res of response) {
          //   for (var data of res.data) {
          //     console.log(data.id);
          //     console.log(count++);
          //   }
          // }

          this.cdr.detectChanges();
          this.processTotalQuestions();
        });
    }
    localStorage.removeItem('boolean');
  }
  checkEditQuestions(Totalquestion: any, selectedQuestion: any) {
    for (let i = 0; i < Totalquestion.length; i++) {
      for (let j = 0; j < selectedQuestion.length; j++) {
        if (Totalquestion[i].id == selectedQuestion[j]) {
          Totalquestion[i].selection = true;
        }
      }
    }
  }
  trackByFn(_index: any, item: { id: any }) {
    return item.id;
  }

  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe((data) => {
      this.managerOption = data;
      console.log('managernames------------>', this.managerOption);
    });
  }

  toggleSelection(question: any): void {
    question.selection = !question.selection;
    console.log('loop entered');

    if (question.selection) {
      this.selectedquestions.push(question.id);
      console.log('Selected Questions:', this.selectedquestions);
    } else {
      this.selectedquestions = this.selectedquestions.filter(
        (selected) => selected !== question.id
      );
      console.log('Selected Questions:', this.selectedquestions);
    }

    // console.log('Selected Questions:', this.selectedquestions);
    // for (let i=0 ; i<this.selectedquestions.length ; i++){
    //   this.getQuestionsById(this.selectedquestions[i]);
    // }
  }
  count!: number;

  async saveSelected() {
    this.scheduleMessage();
    this.FinalizedQuestions = this.selectedquestions;
    console.log('selected', this.selectedquestions);
    console.log('Final', this.FinalizedQuestions);
    // this.count = this.FinalizedQuestions.filter(
    //   (question) => question.selected
    // ).length;
    // console.log('count', this.count);

    this.managernameService.setFinalizedQuestions(this.FinalizedQuestions);

    try {
      const selectedSkillName = this.selectedSkills.sort();

      // const date = Date.now();
      const dataToSave = {
        Questions: this.FinalizedQuestions,
        durations: this.updateNewScheduleForm.get('duration')?.value,

        JobDescription: this.updateNewScheduleForm.get('scheduleName')?.value,

        cutoff: this.updateNewScheduleForm.get('cutoff')?.value,

        Managername: this.updateNewScheduleForm.get('managerName')?.value,
        // id:date,
        Skill: selectedSkillName,
      };
      console.log('response', dataToSave);

      this.skillsdropdownservice
        .postNewSchedule(dataToSave)
        .subscribe((response) => {
          console.log('Questions', response);
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
        });
    } catch (error) {
      console.error(error);
    }
  }
  //  let increment=0;

  // selectAllQuestions(tab: any) {
  //   console.log("select all",this.selectedquestions)
  //   let increment=0
  //   if (tab && tab.content) {
  //     tab.content.forEach((question: any) => {
  //     //   question.selection = true;
  //     if(!question.selection){
  //       question.selection=true;
  //       increment++;

  //       this.selectedquestions.push(question);

  //     }
  //     else{
  //       if (question.selection) {
  //         question.selection = false;

  //         increment--;

  //         const index = this.selectedquestions.findIndex(
  //           (selectedQuestion) => selectedQuestion.id === question.id
  //         );

  //         if (index !== -1) {
  //           this.selectedquestions.splice(index, 1); // Remove the question from the selectedQuestions array
  //         }
  //       }

  //     }
  //     this.count+=increment;

  //     if(this.count<0){
  //       this.count=0
  //     }

  //     });
  //     this.selectedQuestion = tab.content;
  //     console.log(' tab content ', tab.content);
  //   }
  // }
  selectQuestions(tabs: any) {
    tabs.forEach((question: any) => {
      if (!question.selection) {
        question.selection = true;
        this.selectedquestions.push(question.id);
      }
    });
    console.log('select all Questions', this.selectedquestions);
  }

  unselectAllQuestions(questions: any) {
    const duplicateQuestions = this.selectedquestions;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].selection) {
        questions[i].selection = false;
      }
    }
    const questionIds = questions.map((item: { id: any }) => item.id);
    this.selectedquestions = duplicateQuestions.filter(
      (question) => !questionIds.includes(question)
    );
    console.log('un select all ', this.selectedquestions);
  }
  scheduleMessage() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Schedule saved Successfully',
    });
  }
  showUpdateMessage() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Question Updated Successfully',
    });
  }
  //
  processTotalQuestions() {
    // console.log("vara edit",this.slectedquestionforedit)
    this.count = this.selectedquestions.length;
    console.log('count----------------------->', this.count);

    if (!this.selectedquestions) {
      this.selectedquestions = [];
    }
    for (let sec of this.selectedquestions) {
      for (let i = 0; i < this.tabs.length; i++) {
        for (let j = 0; j < this.tabs[i].content.length; j++) {
          if (sec.id == this.tabs[i].content[j].id) {
            // console.log('match found');
            this.tabs[i].content[j].selection = true;
            if (!this.selectedquestions) {
              this.selectedquestions = [];
            }
            this.selectedquestions.push(this.tabs[i].content[j]);
            // console.log(
            //   'content after pushed===================',
            //   this.selectedQuestion
            // );
          }
        }
      }
    }
  }
  // questionType!:any
  choices!: any;
  options!: any;
  Difficulty_Level!: any;
  id!: any;
  answer!: any;
  skills!: any;
  difficultyLevel: any = ['Easy', 'Medium', 'Hard'];

  questionType: any = ['Radio', 'Checkbox', 'Text'];
  questionTypeSelected!: any;
  isViewingQuestion: boolean = false;

  individualQuestionView(
    id: any,
    question: any,
    questionTypeSelected: any,
    choices: any,
    skills: any,
    Difficulty_Level: any,
    answer: any
  ) {
    this.QuestionView = true;
    this.id = id;
    this.question = question;
    this.questionTypeSelected = questionTypeSelected;
    // this.options=choices;
    this.choices = choices;

    this.Difficulty_Level =
      this.getBackendDifficultyLevelViceVersa(Difficulty_Level);
    this.skills = skills;
    this.answer = answer;

    console.log(
      'id------------->',
      id,
      skills,
      answer,
      this.Difficulty_Level,
      choices
    );
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
  updateQuestionView() {
    this.showUpdateMessage();
    console.log('dd=>>>>>>>>>>>>>>>>>>', this.difficultyLevel);
    this.difficultyLevel = this.getBackendDifficultyLevel(
      this.Difficulty_Level
    );
    this.skillsdropdownservice
      .updateQuestion(
        this.id,
        this.question,
        this.questionTypeSelected,
        this.choices,
        this.skills,
        this.difficultyLevel,
        this.answer
      )
      .subscribe((response) => {
        console.log('updateQuestionView response', response);
        setTimeout(() => {
          this.QuestionView = false;
          window.location.reload();
        }, 1000);
      });
  }
  getQuestionsById(questionIdArray: any) {
    console.log('get id', questionIdArray);
    const observables = questionIdArray.map((questionId: string) =>
      this.newScheduleService.getIndividualQuestion(questionId)
    );
    forkJoin(observables).subscribe((responses: any) => {
      this.selectedquestions = responses;
      console.log('Updated Total Question data--', this.selectedquestions);
    });
  }
  cancelQuestionView() {
    this.QuestionView = false;
  }
  cancelButton() {
    this.visible = false;
    this.formSubmitted = false;
    this.updateNewScheduleForm.markAsPristine();
    this.updateNewScheduleForm.markAsUntouched();
    this.updateNewScheduleForm.reset();
    this.router.navigate(['/dashboard']);
  }

  editicon() {
    this.visible = true;
    this.isEditSchedule = true;
  }

  update(
    scheduleName: string | null,
    manager: String | null,
    cutOff: string | number | null,
    duration: string | number | null
  ) {
    this.formSubmitted = true;
    if (this.updateNewScheduleForm.valid) {
      const formData = this.updateNewScheduleForm.value;
      console.log('Form Data:', formData);
      formData.scheduleName = scheduleName;
      formData.managerName = manager;
      formData.cutOff = cutOff;
      formData.duration = duration;
      this.router.navigate(['new-schedule']);
      this.visible = false;
      console.log('hi');
    }
  }

  questionPreview(questions: any) {
    this.questionPreviewvisible = true;
    this.singleQuestion = questions.question;
    this.singleQuestionOption = questions.options;
    this.singleQuestionAnswer = questions.answer;
  }

  closeButton() {
    this.questionPreviewvisible = false;
    this.previewSidebarVisible = false;
  }

  totalSelectedQuestion: any;
  onPreviewClick() {
    this.previewSidebarVisible = true;

    const observables = this.selectedquestions.map((questionId: string) =>
      this.newScheduleService.getIndividualQuestion(questionId)
    );
    forkJoin(observables).subscribe((responses) => {
      this.totalSelectedQuestion = responses;
      console.log('Updated Total Question data--', this.totalSelectedQuestion);
    });
  }
  getSelectedOptions(selected_Option: any, option: any) {
    console.log('Function Working');
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
