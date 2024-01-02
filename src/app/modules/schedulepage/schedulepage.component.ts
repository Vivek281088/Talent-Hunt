import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableService } from 'src/app/services/table.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { Router } from '@angular/router';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { AuthService } from 'src/app/Guard/auth.service';
import { CandidateAssessmentService } from 'src/app/services/candidate-assessment.service';
import { ReviewerService } from 'src/app/services/reviewer.service';
import { MessageService } from 'primeng/api';
import { lastValueFrom } from 'rxjs';
// import { CalendarModule } from 'primeng/calendar';
import { CalendarModule } from 'primeng/calendar';
// import { ManagernameService } from 'src/app/services/managername.service';
import { FormControl} from '@angular/forms';
// import { DatePipe } from '@angular/common';
import { MenuItem } from 'primeng/api';
import { Table } from 'primeng/table';
// import { DomSanitizer,SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'app-schedulepage',
  templateUrl: './schedulepage.component.html',
  styleUrls: ['./schedulepage.component.scss'],
})
export class SchedulepageComponent implements OnInit {
[x: string]: any;
items: MenuItem[] | undefined;
 
home: MenuItem | undefined;
selecteddates!:Date
  questionType: string[] = ['Radio', 'Multiple Choice', 'Text'];
  selectedDate!:any;
  fromDate!:any;
  toDate!:any;
  difficultyLevel: string[] = ['Easy', 'Medium', 'Hard'];
  formGroup!: FormGroup;
  value!:string;
  tables: any[] | undefined;
  cols!: Column[];
  selectedManager: string = '';
  managerOption: any[] = [];
  skillSet: any[] = [];
  selectedSkill: any[] = [];
  managerName: string = '';
  skill: String[] = [];
  filteredSkill: String[] = [];
  fskill: String[] = [];
  exdata: any[] = [];
  filterSkills: any;
  Skills:any[]=[];
  filterManager: any;
  filteredData: any[] = [];
  isCreate: boolean = false;
  isEdit: boolean = false;
  isMail: boolean = false;
  create: boolean = false;
  Tdata: any[] = [];
  isCreateClicked = false;
  dropdownOptions: any[] = [];
  FinalizedQuestions: any[] = [];
  Skill: any[] = []; //for edit
  selectedQuestions: any[] = [];
  cutoff!: number;
  durations!: number;
  email_Managername!: string;
  email_Status!: string;
  email_Filename!: string;
  candidateNames: any[] = [];
  selectedCandidates: any[] = [];
  candidateList: any[] = [];
  questions: any;
  filterPopupVisible: boolean = false;
  candidateNameOptions: any[] = []; // Replace with actual data
  statusOptions: any[] = [];
  names: string[] = [];
  status: string = '';
  CandidatefilteredData: any[] = [];
  view_Managername!: string;
  view_Filename!: string;
  editManagername!: string;
  editFilename!: any;
  result: string = '';
  score: number | null = null;
  candidatePassword: string = 'abc123';
  candidateConfirmPassword: string = 'abc123';
  name: boolean = true;
  finalizedEmail!: string;
  finalizedManagerEmail!: string;
  managerEmail!: string;
  column!: Column[];
  question!: string;
  selectedAnswer!: string;
  chosenSkill!: String;
  option1!: string;
  option2!: string;
  option3!: string;
  option4!: string;
  selectedType: boolean = false;
  selectedquestionType!: string;
  selecteddifficultyType!: string;
  candidateSkill!:any;
  selectedAnswers!: {
    a: string;
    b: string;
    c: string;
    d: string;
  };
  candidateId!: Date | null;

  todayDate !: string;
  scheduleName!:string; 
  manager!:string;
  selectedSkills!:string;
  cutOff!:number;
  duration!:number;
  viewQuestionSidebar: boolean=false;

 
  // reviewer
  totalQuestions!: number;
 
  correctQuestions!: number;
 
  textQuestions: any[] = [];
 
  id: string = '';
 
  visible: boolean = false;
 
  buttonColors: boolean[] = [];
 
  buttonColorsWrong: boolean[] = [];
 
  response: boolean = false;
  newScheduleVisible:boolean=false;
 
  reviewerStatus: string = 'Completed';
 
  dialogEmailStatus: string | null = null;
 
  roles: string = "user";
  showcardFlag:boolean=false
 
  // candidateForm !: FormGroup;
  constructor(
    private tableService: TableService,
    private managernameService: ManagernameService,
    private skillsdropdownservice: SkillsdropdownService,
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private candidateService: CandidateAssessmentService,
    // reviewer
    private messageService: MessageService,
 
    private reviewerService: ReviewerService
  ) {
   
  }
  ngOnInit() {
    this.items = [{ label: 'Schedules' }];
    
    this.todayDate=this.formattedDate(new Date());
    console.log("Date--------",this.todayDate)
 
    this.home = { icon:'pi pi-home' , routerLink: '/' , label:'Home'};
    this.formGroup = new FormGroup({
      date: new FormControl<Date | null>(null)
  });
 
 
    this.loadSkills();
   
 
    this.finalizedManagerEmail = localStorage.getItem('managerEmail')!;
    this.finalizedEmail = localStorage.getItem('Candidateemail')!;
 
    this.loadManagerNames();
    this.getSkillSet();
    this.existingData();
    this.loadCandidate();
    this.getCandidatename();
    this.cols = [
      { field: 'manager', header: 'Manager' },
      { field: 'file name', header: 'File name' },
      { field: 'actions', header: 'Actions' },
    ];
    this.column = [
      { field: 'email_Managername', header: 'Manager' },
 
      { field: 'candidateName', header: 'Candidate Name' },
 
      { field: 'email_Filename', header: 'File Name' },
 
      { field: 'email_Status', header: 'Status' },
 
      { field: 'score', header: 'Score' },
 
      { field: 'result', header: 'S/R' },
    ];
  }
  getFormattedSkills(skills: any): { skills: string[], remainingCount: number } {
    const maxLength = 8;
 
    let result: string[] = [];
    let totalLength = 0;
 
    for (const skill of skills) {
      if (totalLength + skill.length <= maxLength) {
        // Include the skill in the result
        result.push(skill);
        totalLength += skill.length;
      } else {
        // Stop adding skills if the limit is reached
        break;
      }
    }
 
    // Calculate the count of remaining skills
    const remainingCount = skills.length - result.length;
 
    return { skills: result, remainingCount: remainingCount };
  }
  remainaingSkills(skills:any ,count:number):string[]{
return skills.slice(-count);
  }
 
getsvgIcon():string{
  const homeicon='<svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.75 13.4168H6.35V9.33343H9.65V13.4168H12.25V7.0501L8 3.8501L3.75 7.0501V13.4168ZM3.75 14.1668C3.55 14.1668 3.375 14.0918 3.225 13.9418C3.075 13.7918 3 13.6168 3 13.4168V7.0501C3 6.92788 3.025 6.81399 3.075 6.70843C3.125 6.60288 3.2 6.51676 3.3 6.4501L7.55 3.2501C7.61667 3.19454 7.68889 3.15565 7.76667 3.13343C7.84444 3.11121 7.92222 3.1001 8 3.1001C8.08889 3.1001 8.16944 3.11121 8.24167 3.13343C8.31389 3.15565 8.38333 3.19454 8.45 3.2501L12.7 6.4501C12.8 6.51676 12.875 6.60288 12.925 6.70843C12.975 6.81399 13 6.92788 13 7.0501V13.4168C13 13.6168 12.925 13.7918 12.775 13.9418C12.625 14.0918 12.45 14.1668 12.25 14.1668H8.88333V10.0834H7.11667V14.1668H3.75Z" fill="black" fill-opacity="0.38"/></svg>'
 
  return this['sanitizer'].bypassSecurityTrustHtml(homeicon).toString();
 
 
}
  getCandidatename(): void {
    this.tableService.getExistingCandidate().subscribe((data) => {
      const uniqueEmails = new Set<string>();
      const uniqueCandidateNames: any[] = [];
      data.forEach(
        (candidate: { candidateName: string; candidateEmail: string }) => {
          if (!uniqueEmails.has(candidate.candidateEmail)) {
            uniqueEmails.add(candidate.candidateEmail);
            uniqueCandidateNames.push(candidate.candidateName);
          }
        }
      );
      // Assign the unique candidate names to your variable
      this.candidateNames = uniqueCandidateNames;
      console.log('candidate', data);
      console.log(this.candidateNames);
    });
  }
 
  onTabChange(event: any) {
    if (event.index === 1) {
      this.loadCandidate();
    }
  }
 
  loadCandidate() {
    const role = localStorage.getItem('userrole');
    console.log('role', role);
    if (role == 'user') {
      this.name = false;
      this.candidateService
        .getCandidatedata_by_Email(this.finalizedEmail)
        .subscribe((response) => {
          console.log('res', response);
          this.candidateList = response;
          console.log(
            'candidateListdata',
            this.candidateList
          );
          this.candidateName = response[0].candidateName;
          console.log('candidateName', this.candidateName);
        });
 
      // localStorage.removeItem('userrole');
    } else if (role == 'manager') {
      // localStorage.removeItem('userrole');
      console.log('manager email--', this.finalizedManagerEmail);
      this.managernameService
        .getManagerdata_by_Email(this.finalizedManagerEmail)
        .subscribe((response) => {
          console.log('res', response);
          this.managerEmail = response[0].Managername;
 
          // this.managernameService.setManagerName_Email(this.managerEmail);
 
          console.log('candidateList1gr4rg', this.managerEmail);
          // this.candidateName = response[0].candidateName;
        });
      this.managernameService.getCandidateStatus().subscribe((data) => {
        // console.log("arole",a)
        this.candidateList = data;
        console.log('loadDAta', data);
      });
      // localStorage.removeItem('userrole');
    }
 
    console.log('load data 1', this.candidateList);
    console.log('selected candidate', this.selectedCandidates);
    // Loop through selectedCandidates and store data for each candidate
    this.selectedCandidates.forEach((selectedCandidate) => {
      // Find the existing candidate data based on the candidateName
      const existingCandidate = this.candidateList.find(
        (candidate) => candidate.candidateName === selectedCandidate
      );
      console.log('matched candidate', existingCandidate);
 
      //rest data
      this.score = null;
      this.result = '';
      const date = Date.now();
      this.candidateId = new Date(date);
 
      //show success message
      // this.showEmailSubmitted();
     
      if (existingCandidate) {
        this.tableService
          .postExistingCandidateDetails(
           
            this.candidateId,
            this.email_Managername,
            existingCandidate.candidateName,
            existingCandidate.candidateEmail,
            existingCandidate.candidatePhone,
            this.email_Status,
            this.email_Filename,
            this.questions,
            this.score,
            this.result,
            this.cutoff,
            this.durations,
            existingCandidate.password,
            existingCandidate.confirmPassword,
            this.roles
          )
          .subscribe((data) => {
            console.log('Stored data for existing candidate:', data);
            //this.candidateName(data);
            this.candidateList.push(data);
           
          });
 
        setTimeout(() => {
          this.getCandidatename();
          this.cancelEmailPopup();
        }, 2000);
      }
    });
    this.showEmailSubmitted();
  }
 
  loadAssessmentData() {
    this.managernameService.getCandidateStatus().subscribe((data) => {
      // console.log("arole",a)
      this.candidateList = data;
      console.log('loadDAta', data);
    });
  }
  getSkillSet() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;
    });
  }
 
  showcard(){
this.showcardFlag=true;
  }
  onSearchClick(dt2 :Table) {
    dt2.clear();
    // date1!:Date;
    // // date1!:Date;
    // this.fromDate=this.datepipe.transform(this.selectedDate[0],'dd-MMM-yy');
    // this.toDate=this.datepipe.transform(this.selectedDate[1],'dd-MMM-yy');
    // console.log('date----------------->', this.selecteddates);
    // this.Skills.push(this.filterSkills)
    // this.fromDate=this.selectedDate[0];
    // this.toDate=this.selectedDate[1];
 
    this.skillsdropdownservice
      .filterManager(this.filterManager, this.filterSkills,this.fromDate,this.toDate)
      .subscribe((data) => {
        console.log('Api response', data);
        this.filteredData = data;
        this.Tdata = this.filteredData;
        console.log('filtered data', this.filteredData);
        console.log('Filter Skills:', this.filterSkills);
      });
  }
  existingData() {
    this.tableService.getExistingData().subscribe((data) => {
      console.log("table",data)
      this.Tdata = data;
    });
  }
 
  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe((data) => {
      this.managerOption = data;
      console.log("managernames------------>",this.managerOption)
    });
  }
  sendQuestions(data: any) {
    console.log('data', data);
 
    this.candidateService.setAssessmentData(data);
 
    this.router.navigate(['/assessment-display']);
  }
  dropFunction(rowData: any) {
    rowData.isCreate = true;
    console.log('Drop down selected', rowData);
    this.managernameService.setManagerName(this.selectedManager);
    console.log('manager', this.selectedManager);
    // this.tableService
    //   .postManagerList(this.selectedManager)
    //   .subscribe((data) => {
 
    //   });
  }
  cancelButton(){
    this.visible=false;
  }
  createButton(scheduleName:string,manager:string,selectedSkill:string,cutOff:number,duration:number){
    this.router.navigate(['new-schedule',scheduleName,manager,selectedSkill,cutOff,duration])
    // console.log("recieved",scheduleName,manager,selectedSkill,cutOff,duration)


  }
  addNewRow() {
    this.router.navigate(['/create'])
    // const newRow = {
    //   manager: '',
    //   fileName: '',
    //   isCreate: false,
    //   isEdit: false,
    //   isMail: false,
    // };
    // this.Tdata.unshift(newRow);
  }
 
  // background: #00000061;
 
  //Mail dialog
  displayEmailDialog = false;
  candidateName!: string;
  candidateEmail!: string;
  candidatePhone: number | null = null;
  // score: Number | null = null;
  // result !: string;
  openEmailDialog(Managername: string, fileName: string) {
    this.displayEmailDialog = true;
    console.log('Openemail');
    this.email_Managername = Managername;
    console.log('emanager', this.email_Managername);
    this.email_Filename = fileName;
    console.log('efile', this.email_Filename);
    this.email_Status = 'Not Started';
    console.log('ests', this.email_Status);
    this.tableService
      .getdataby_FileName(Managername, fileName)
      .subscribe((data) => {
        console.log('View Data', data);
        this.cutoff = data[0].cutoff;
        this.durations = data[0].durations;
        this.questions = data[0].questions;
        console.log('Quest', this.questions);
      });
  }
  cancelEmailPopup() {
    this.displayEmailDialog = false;
    this.selectedCandidates = [];
    this.resetForm();
    this.loadAssessmentData();
    this.getCandidatename();
  }
 
  storeCandidate() {
    //rest data
    this.score = null;
    this.result = '';
    console.log('score', this.score);
    console.log('result', this.result);
 
    //to load the candidate name
   
    const date = Date.now();
    this.candidateId = new Date(date);
 
    //show success message
   
    this.showEmailSubmitted();
    this.tableService
      .postCandidateDetails(
        this.candidateId,
        this.email_Managername,
        this.candidateName,
        this.candidateEmail,
        this.candidatePhone,
        this.email_Status,
        this.email_Filename,
        this.questions,
        this.score,
        this.result,
        this.cutoff,
        this.durations,
        this.candidatePassword,
        this.candidateConfirmPassword,
        this.roles,
        this.candidateSkill
      )
      .subscribe((response) => {
        console.log('stored', response);
        this.candidateList.push(response);
        //  
      });
 
   
   
 
    // Close the dialog
    setTimeout(() => {
      this.cancelEmailPopup();
    }, 2000);
  }
  resetForm() {
    this.candidateName = '';
    this.candidateEmail = '';
    this.candidatePhone = null;
    this.candidatePassword = '';
    this.candidateConfirmPassword = '';
  }
  sendEmail() {
    this.displayEmailDialog = false;
    // Reset the form data
  }
  //view icon
  onViewClick(ManagerName: string, fileName: string) {

    this.tableService
      .getdataby_FileName(ManagerName, fileName)
      .subscribe((data) => {
        console.log('View Data', data);
        this.view_Managername = ManagerName;
        this.view_Filename = fileName;
        this.FinalizedQuestions = data[0].questions;
       
        this.viewQuestionSidebar =true;
        console.log('questions :', this.FinalizedQuestions);
      });

  }
  getSelectedOptions(selected_Option: any,option: any){
    if(selected_Option.includes(option))
    {
      console.log("correct answer")
    return "correctAnswer";
    }
    else{
      return "wrongAnswer";
    }
    }
  getLabel(index: number): string {
    return String.fromCharCode(65 + index);
  }
 
  //clone icon
  cloneData: any = {};
  onCloneClick(data: any) {
    this.managernameService
      .getManagerdata_by_Email(this.finalizedManagerEmail)
      .subscribe((response) => {
        // if (response.length > 0) {
        //   const managerName = response[0].Managername;
        //   console.log('Manager Name:', managerName);
        //   console.log('Clone Data', data);
        //   this.cloneData = { ...data };
        //   this.cloneData.Managername = managerName;
        //   console.log('Clone manager', this.managerEmail);
 
        //   // Changing filename with version
        //   const skillName = data.Skill.sort();
        //   console.log('Skill name', skillName);
 
        //   this.skillsdropdownservice
        //     .getLatestVersion(this.managerEmail, skillName)
        //     .subscribe((latestVersion) => {
        //       console.log('lv:', latestVersion);
 
        //       const newVersion = latestVersion ? latestVersion + 1 : 1;
        //       const fileNameWithVersion = `${data.Skill.join(
        //         '_'
        //       )}_v${newVersion}`;
        //       console.log('Filename ---lv:', fileNameWithVersion);
        //       this.cloneData.fileName = fileNameWithVersion;
 
        //       this.Tdata.push(this.cloneData);
        //       console.log('Updated Clone Data', this.cloneData);
 
        //       this.skillsdropdownservice
        //         .postquestions_by_Manager(this.cloneData)
        //         .subscribe((response) => {
        //           console.log('output----->', response);
        //         });
        //     });
        // }
 
        const managerName = response[0].Managername;
        console.log('Manager Name:', managerName);
        console.log('Clone Data', data);
        this.cloneData = { ...data };
        this.cloneData.Managername = managerName;
 
        // Changing filename with version
        const skillName = data.Skill.sort();
        console.log('Skill name', skillName);
 
        this.skillsdropdownservice
          .getLatestVersion(managerName, skillName)
          .subscribe((latestVersion) => {
            console.log('lv:', latestVersion);
 
            const newVersion = latestVersion ? latestVersion + 1 : 1;
            const fileNameWithVersion = `${data.Skill.join(
              '_'
            )}_v${newVersion}`;
            console.log('Filename ---lv:', fileNameWithVersion);
            this.cloneData.fileName = fileNameWithVersion;
 
            const dataToSave = {
              Questions: data.questions,
              durations: data.durations,
              cutoff: data.cutoff,
              fileName: fileNameWithVersion,
              isCreate: false,
              isEdit: true,
              isMail: true,
              Managername: managerName,
              Skill: skillName,
 
            };
 
            this.Tdata.push(dataToSave);
            console.log('Updated Clone Data', dataToSave);
            this.skillsdropdownservice
              .postquestions(dataToSave)
              .subscribe((response) => {
                console.log('output----->', response);
              });
          });
      });
  }
 
  // async onCloneClick(data: any) {
  //   this.managernameService
  //     .getManagerdata_by_Email(this.finalizedManagerEmail)
  //     .subscribe((response) => {
  //       console.log('res', response);
  //       this.managerEmail = response[0].Managername;
  //     });
  //   console.log('Clone Data', data);
  //   this.cloneData = { ...data };
  //   this.cloneData.Managername = this.managerEmail;
  //   console.log('Clone manager', this.managerEmail);
 
  //   //Changing filename with version
  //   const skillName = this.cloneData.Skill.sort();
  //   console.log('Skill name', skillName);
 
  //   const latestVersion = await lastValueFrom(
  //     this.skillsdropdownservice.getLatestVersion(this.managerEmail, skillName)
  //   );
 
  //   const newVersion = latestVersion ? latestVersion + 1 : 1;
  //   const fileNameWithVersion = `${skillName.join('_')}_v${newVersion}`;
  //   console.log('lv:', latestVersion);
  //   console.log('Filename ---lv:', fileNameWithVersion);
  //   this.cloneData.fileName = fileNameWithVersion;
 
  //   this.Tdata.push(this.cloneData);
  //   console.log('Updated Clone Data', this.cloneData);
 
  //   this.skillsdropdownservice
  //     .postquestions_by_Manager(this.cloneData)
  //     .subscribe((response) => {
  //       console.log('output----->', response);
  //     });
  // }
  fileName!:string
  Managername!:string
  deleteQuestion(Managername: String,fileName:String){
    console.log("delete data",Managername,fileName)
    // this.Managername = Managername;
    // this.fileName=data.fileName
    // this.deleteSkill = data.skills;
    this.skillsdropdownservice
      .deletetabledata(Managername,fileName)
      .subscribe((response) => {
        console.log("respose from delete data from table",response)
        this.existingData();
      });
 
  }
  handleEditIconClick(ManagerName: string, fileName: string) {
    this.tableService
      .getdataby_FileName(ManagerName, fileName)
      .subscribe((data) => {
        console.log('View Data', data);
        this.Skill = data[0].Skill;
        this.selectedQuestions = data[0].questions;
        this.cutoff = data[0].cutoff;
        this.durations = data[0].durations;
        this.editManagername = ManagerName;
        this.editFilename = fileName;
        this.managernameService.setCutoff(this.cutoff);
        console.log('edit cutoff', this.cutoff);
        this.managernameService.setDuration(this.durations);
        this.skillsdropdownservice.setSkill(this.Skill);
        console.log('edit skill', this.Skill);
        console.log('edit questions', this.selectedQuestions);
        this.managernameService.setFinalizedQuestions(this.selectedQuestions);
        this.managernameService.setManagerName(this.editManagername);
        this.managernameService.setFileName(this.editFilename);
        this.router.navigate(['edit']);
      });
  }
 
  //Assessment page Filter
 
  candidateNames1!: string;
  candidateresult!: string;
  candidateListData: any[] = ['Selected', 'Not Selected'];
 
  filterCandidateAssessment() {
    this.skillsdropdownservice
      .filterCandidate(this.candidateNames1, this.candidateresult)
      .subscribe((data) => {
        this.candidateList = data;
        console.log('resultoutput', this.candidateList);
      });
  }
 
  // Reviewer
 
  markAsCorrect(index: number) {
    this.FinalizedQuestions[index].isCorrect = true;
 
    this.markInteracted(index);
 
    this.FinalizedQuestions[index].reviewerResponse = 'Correct';
 
    this.response = true;
 
    this.buttonColors[index] = true;
 
    this.buttonColorsWrong[index] = false;
 
    // Enable only the correct button
  }
 
  markAsIncorrect(index: number) {
    this.FinalizedQuestions[index].isCorrect = false;
 
    this.markInteracted(index);
 
    this.FinalizedQuestions[index].reviewerResponse = 'Incorrect';
 
    this.buttonColors[index] = false;
 
    this.buttonColorsWrong[index] = true;
  }
 
  textQuestion = Array(
    this.FinalizedQuestions.filter(
      (question) => question.questionType === 'Text'
    )
  );
 
  interaction = Array(this.FinalizedQuestions.length).fill(false);
 
  markInteracted(index: number) {
    console.log('index', index);
    this.interaction[index] = true;
  }
 
  checkInteraction(): boolean {
    console.log('interaction', this.interaction);
    return this.interaction.every((inter) => inter);
  }
 
  submitReview(candidate: any) {
    this.totalQuestions = this.FinalizedQuestions.length;
 
    this.correctQuestions = this.FinalizedQuestions.filter(
      (question) => question.reviewerResponse === 'Correct'
    ).length;
 
    this.score = (this.correctQuestions / this.totalQuestions) * 100;
 
    if (this.score > this.cutoff) {
      this.result = 'Selected';
    } else this.result = 'Not Selected';
 
    this.score.toFixed(2);
 
    console.log('Score :', this.score);
 
    console.log('Result :', this.result);
 
    console.log('Correct :', this.correctQuestions);
 
    // Check if any questions have been marked as correct or incorrect
 
    let questionsMarked = false;
 
    for (const question of this.FinalizedQuestions) {
      if (question.isCorrect !== undefined) {
        questionsMarked = true;
 
        break; // Exit the loop once a marked question is found
      }
    }
 
    if (!this.checkInteraction()) {
      console.log('Inside Check Interaction', this.interaction);
 
      this.showError();
    } else {
      const updateData = {
        id: this.id,
 
        score: this.score.toFixed(2),
 
        result: this.result,
 
        questions: this.FinalizedQuestions,
 
        email_Status: this.reviewerStatus,
      };
 
      this.reviewerService
 
        .updateScoreAndResult(updateData)
 
        .subscribe((response) => {
          console.log('Score and result updated successfully', response);
        });
 
      console.log('Inside Check Interaction', this.interaction);
 
      this.showSubmitted();
 
      this.getExistingTableData();
      setTimeout(() => {
        this.visible = false;
      }, 2000);
 
      this.getExistingTableData();
    }
  }
 
  getExistingTableData() {
    this.managernameService.getCandidateStatus().subscribe((data) => {
      this.candidateList = data;
 
      console.log('tableData', this.candidateList);
    });
  }
  showEmailSubmitted() {
    this.messageService.add({
       key: 'tr',
 
      severity: 'success',
 
      summary: 'Success',
 
      detail: 'Question Sent Successfully',
    });
  }
 
  showSubmitted() {
    this.messageService.add({
      severity: 'success',
 
      summary: 'Success',
 
      detail: 'Review Submitted Successfully',
    });
 
    console.log('updated', this.FinalizedQuestions);
  }
 
  reviewerBack() {
    this.visible = false;
 
    this.interaction = [];
 
    this.buttonColors = [];
 
    this.buttonColorsWrong = [];
  }
 
  showError() {
    {
      this.messageService.add({
        severity: 'error',
 
        summary: 'Error',
 
        detail: 'Please review all questions before submitting.',
      });
    }
  }
 
  showDialog(data: any) {
    console.log('name', data);
 
    this.dialogEmailStatus = data.email_Status;
 
    this.id = data.id;
 
    this.FinalizedQuestions = data.questions;
 
    console.log('fq------------', this.FinalizedQuestions);
 
    this.cutoff = data.cutoff;
 
    console.log('qd', this.FinalizedQuestions);
 
    console.log('length', this.FinalizedQuestions.length);
 
    this.textQuestions = this.FinalizedQuestions.filter(
      (question) => question.questionType === 'Text'
    );
    console.log('text-length', this.textQuestion.length);
 
    this.interaction = Array(this.FinalizedQuestions.length).fill(false);
    for (let i = 0; i < this.FinalizedQuestions.length; i++) {
      if (
        this.FinalizedQuestions[i].reviewerResponse === 'Correct' ||
        this.FinalizedQuestions[i].reviewerResponse === 'Incorrect'
      ) {
        this.interaction[i] = true;
      }
    }
 
    console.log('Interaction', this.interaction);
 
    console.log('Id', this.id);
 
    this.visible = true;
  }
 
  openquestiondialog() {
    this.visible = true;
  }
 
  // Loading skills for dropdown in add question
  loadSkills() {
    console.log('hi from Client');
 
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data.skill;
 
      // console.log(this.skillSet);
 
      // console.log('Users:' + JSON.stringify(this.selectedSkill));
    });
  }
  closequestiondialog() {}
 
  addquestion() {
    this.router.navigate(['questiondb']);
  }
 
  typeSelected() {}
 
  onAddQuestionClick() {
    this.router.navigate(['questiondb']);
  }
  newSchedule(){
    this.visible=true;
  }
  formattedDate(date: Date){
    const months: string[] = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const month : string =months[date.getMonth()];
    const day : number = date.getDate();
    const year : number =date.getFullYear();
    const formatDate :string=`${month} ${day}, ${year}`

    return formatDate;
  }
}
 
interface Column {
  field: string;
  header: string;
}
 
interface FilterSkill {
  id: number;
  skill: string;
  subskills: string[];
  __v: number;
}