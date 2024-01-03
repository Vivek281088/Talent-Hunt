import { Component, OnInit } from '@angular/core';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { Router, ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dash1',
  templateUrl: './dash1.component.html',
  styleUrls: ['./dash1.component.scss'],
})
export class Dash1Component implements OnInit {
  // manager!: Manager[];
  rangeDates!: Date[];
  FromDate!: any;
  // toDate : Date = new Date()
  ToDate!: any;
  Skills: any = [];

  selectedManager: any;
  status: boolean = false;

  // TotalQuestions: any;

  TotalQuestions: { [key: string]: any[] } = {};

  managerSet: any[] = [];
  count!: number;

  skillSet: any[] = [];

  selectedSkill: any[] = [];

  selectedQuestions: any[] = [];

  ski: any[] = [];

  FinalizedQuestions: any[] = [];

  duration!: number;

  cutoff!: number;
  JobDescription!: string;

  FinalOutput: any[] = [];

  emptySkill: boolean = true;
  selectedManagername!: string;
  managerOption: any[] = [];
  //dataToSave: any[] = [];

  constructor(
    private skillsdropdownservice: SkillsdropdownService,
    private managernameService: ManagernameService,
    public router: Router,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private datepipe: DatePipe
  ) {}

  ngOnInit() {
    this.reloadData();
    this.loadManagerNames();
    this.loadClientManagerNames();
    this.selectedManager = this.managernameService.getManagerName();
    console.log('Selected Manager:', this.selectedManager);
  }

  reloadData() {
    console.log('hi from Client');

    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;

      console.log('Checking skillset',this.skillSet);

      // console.log('Users:' + JSON.stringify(this.selectedSkill));
    });
  }

  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe((data) => {
      this.managerSet = data;
    });
  }
  loadClientManagerNames() {
    this.managernameService.getclientManagerName().subscribe((data) => {
      console.log('cname', data);

      this.managerOption = data;
    });
  }
  dropFunction(rowData: any) {
    // rowData.isCreate = true;
    console.log('Drop down selected', rowData);
    this.managernameService.setManagerName(this.selectedManagername);
    console.log('manager', this.selectedManagername);
    // this.tableService
    //   .postManagerList(this.selectedManager)
    //   .subscribe((data) => {

    //   });
  }
  onDateSelect(event: any) {
    if (event.originalEvent && event.originalEvent.type === 'date') {
      this.FromDate = event.value[0];
      this.ToDate = event.value[1];
    }
    console.log('date is=------------------', this.FromDate, this.ToDate);
  }

  submitForm() {
    console.log('Selected Skills:', this.selectedSkill);

    // this.selectedQuestions = [];
    // this.ski = [];
    // for (let g of this.selectedSkill) {
    //   this.ski.push(g.skill);
    // }
    // console.log(this.ski);

    this.skillsdropdownservice
      .postskillsList(this.selectedSkill)
      .subscribe((response) => {
        console.log('response', response);
        console.log('Manager', this.selectedManagername);
        this.TotalQuestions = response;
      });

    if (this.selectedSkill.length > 0) {
      this.emptySkill = false;
    }
  }

  checkboxChanged(item: any) {
    if (item.selected) {
      this.selectedQuestions.push(item);
    } else {
      //removing question after unselecting
      const index = this.selectedQuestions.findIndex(
        (selectedQuestion) => selectedQuestion.id === item.id
      );
      if (index !== -1) {
        this.selectedQuestions.splice(index, 1);
      }
    }
    console.log('Checkbox changed', this.selectedQuestions);
  }

  async saveSelected() {
    this.FinalizedQuestions = this.selectedQuestions;
    console.log('selected', this.selectedQuestions);
    console.log('Final', this.FinalizedQuestions);
    this.count = this.FinalizedQuestions.filter(
      (question) => question.selected
    ).length;
    console.log('count', this.count);

    //set the Finalizedquestions,Duration,Cuttoff in the service

    this.managernameService.setFinalizedQuestions(this.FinalizedQuestions);
    // this.managernameService.setDuration(this.duration);
    // this.managernameService.setCuttoff(this.cuttoff);

    try {
      const selectedSkillName = this.selectedSkill.sort();

      const latestVersion = await lastValueFrom(
        this.skillsdropdownservice.getLatestVersion(
          this.selectedManagername,
          selectedSkillName
        )
      );

      console.log('latest-v', latestVersion);
      const newVersion = latestVersion ? latestVersion + 1 : 1;
      const fileNameWithVersion = `${selectedSkillName.join(
        '_'
      )}_v${newVersion}`;
      console.log('lv:', latestVersion);
      //save the data

      this.FromDate = this.datepipe.transform(this.rangeDates[0], 'dd-MMM-yy');
      this.ToDate = this.datepipe.transform(this.rangeDates[1], 'dd-MMM-yy');
      console.log('date to save------------------>', this.FromDate);

      const dataToSave = {
        Questions: this.FinalizedQuestions,
        durations: this.duration,
        FromDate: this.FromDate,
        ToDate: this.ToDate,
        JobDescription: this.JobDescription,
        No_Of_Candidate_Selected: 0,
        No_Of_Candidate_NotSelected: 0,
        No_Of_TimesSend: 0,
        No_Of_Completed: 0,

        Deleted: this.status,
        cutoff: this.cutoff,
        fileName: fileNameWithVersion,
        isCreate: false,
        isEdit: true,
        isMail: true,
        Managername: this.selectedManagername,
        Skill: selectedSkillName,
      };
      console.log('response', dataToSave);

      this.skillsdropdownservice
        .postquestions(dataToSave)
        .subscribe((response) => {
          console.log('Questions', response);
        });

      this.saveSuccess();
      setTimeout(() => {
        this.router.navigate(['dashboard']);
      }, 1000);
    } catch (error) {
      console.error(error);
    }
  }
  saveSuccess() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Question created Successfully',
    });
  }

  getDifficultyStyle(difficulty: string): any {
    if (difficulty === 'E') {
      return {
        color: 'green',
        display: 'inline-block',
        padding: '6px 12px',
      };
    } else if (difficulty === 'M') {
      return { color: 'yellow' };
    } else {
      return { color: 'red' };
    }
  }
  //@Input() parent:any;

  selectAllChanged(skillKey: string) {
    const skillQuestions = this.TotalQuestions[skillKey];

    const areAllSelected = this.areAllQuestionsSelected(skillKey);

    let increment = 0;

    for (let question of skillQuestions) {
      if (!areAllSelected) {
        if (!question.selected) {
          question.selected = true;

          increment++;

          this.selectedQuestions.push(question); // Add the question to the selectedQuestions array
        }
      } else {
        if (question.selected) {
          question.selected = false;

          increment--;

          const index = this.selectedQuestions.findIndex(
            (selectedQuestion) => selectedQuestion.id === question.id
          );

          if (index !== -1) {
            this.selectedQuestions.splice(index, 1); // Remove the question from the selectedQuestions array
          }
        }
      }
    }

    this.count += increment;

    // Ensure count is not negative

    if (this.count < 0) {
      this.count = 0;
    }
  }

  areAllQuestionsSelected(skillKey: string): boolean {
    const skillQuestions = this.TotalQuestions[skillKey];

    return skillQuestions.every((question) => question.selected);
  }
}
