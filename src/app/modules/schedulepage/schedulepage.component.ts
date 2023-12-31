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
// import { ManagernameService } from 'src/app/services/managername.service';

@Component({
  selector: 'app-schedulepage',
  templateUrl: './schedulepage.component.html',
  styleUrls: ['./schedulepage.component.scss'],
})
export class SchedulepageComponent implements OnInit {

  questionType: string[] = ['Radio', 'Multiple Choice', 'Text'];

  difficultyLevel : string[] = ['Easy', 'Medium', 'Hard'];
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
  filterSkills: FilterSkill[] = [];
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
  duration!: number;
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
  candidatePassword: any="abc123";
  candidateConfirmPassword: any="abc123";
  name: boolean = true;
  finalizedEmail!: string;
  finalizedManagerEmail !:string;
  managerEmail !: string;
  column!: Column[];
  question !: string;
  selectedAnswer!: string;
  chosenSkill !: String;
  option1 !:string;
  option2 !:string;
  option3 !:string;
  option4 !:string;
  selectedType: boolean = false;
  selectedquestionType !: string;
  selecteddifficultyType !: string;
  selectedAnswers: {
    a: boolean;
    b: boolean;
    c: boolean;
    d: boolean;
  } = {
    a: false,
    b: false,
    c: false,
    d: false,
  };

  //visible: boolean = false;








  // Optionally, you can send the data to a service or perform any other actions here

  // Close the dialog


  //dialog box
 
  

  // reviewer
  totalQuestions!: number;

  correctQuestions!: number;

  textQuestions: any[] = [];

  id: string = '';

  visible: boolean = false;

  buttonColors: boolean[] = [];

  buttonColorsWrong: boolean[] = [];

  response: boolean = false;

  reviewerStatus: string = 'Completed';

  dialogEmailStatus: string | null = null;

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
  ) {}
  
  ngOnInit() {
    //this.auth.isLoggedIn=true;
    this.loadSkills();
    this.finalizedEmail =
      this.managernameService.getCandidateAssessment_Email();
    console.log('a', this.finalizedEmail);

    this.finalizedManagerEmail = this.managernameService.getManagerName();
    

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

  getCandidatename(): void {
    this.tableService.getExistingCandidate().subscribe((data) => {
      // Use a Set to store unique candidate email addresses
      const uniqueEmails = new Set<string>();
      // Use an array to store unique candidate names
      const uniqueCandidateNames: any[] = [];
      // Iterate through the data and filter duplicates based on email addresses
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
    console.log("role",role);
    if (role == 'user') {
      this.name = false;
      this.candidateService
        .getCandidatedata_by_Email(this.finalizedEmail)
        .subscribe((response) => {
          console.log('res', response);
          this.candidateList = response;
          console.log('candidateList', this.candidateList);
          this.candidateName = response[0].candidateName;
          console.log('candidateName', this.candidateName);
        });

      
        // localStorage.removeItem('userrole');
    } else if(role=="manager"){
      // localStorage.removeItem('userrole');
      this.managernameService
      .getManagerdata_by_Email(this.finalizedManagerEmail)
      .subscribe((response) => {
        console.log('res', response);
        this.managerEmail = response[0].Managername;
        this.managernameService.setManagerName_Email(this.managerEmail);
        
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

      //reset 
      this.score = null;
      this.result = '';
      if (existingCandidate) {
        this.tableService
          .postExistingCandidateDetails(
            this.email_Managername,
            existingCandidate.candidateName,
            existingCandidate.candidateEmail, // Get candidateEmail from existing data
            existingCandidate.candidatePhone,
            this.email_Status,
            this.email_Filename,
            this.questions,
            this.score,
            this.result,
            this.cutoff,
            this.duration,
            this.candidatePassword,
            this.candidateConfirmPassword
            // Get candidatePhone from existing data
          )
          .subscribe((data) => {
            console.log('Stored data for existing candidate:', data);
            //this.candidateName(data);
            this.candidateList.push(data);
          });
        this.getCandidatename();
      }
    });
  }
  getSkillSet() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skillSet = data;
    });
  }
  onSearchClick() {
    const skillToFilter =
      this.filterSkills.length > 0 ? this.filterSkills[0].skill : undefined;
    this.skillsdropdownservice
      .filterManager(this.filterManager?.Managername, skillToFilter)
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
      this.Tdata = data;
    });
  }
  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe((data) => {
      this.managerOption = data;
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
    this.tableService
      .postManagerList(this.selectedManager)
      .subscribe((data) => {
        this.managernameService.setManagerName(this.selectedManager);
        console.log('manager', this.selectedManager);
      });
  }
  addNewRow() {
    const newRow = {
      manager: '',
      fileName: '',
      isCreate: false,
      isEdit: false,
      isMail: false,
    };
    this.Tdata.unshift(newRow);
  }
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
        this.duration = data[0].duration;
        this.questions = data[0].questions;
        console.log('Quest', this.questions);
      });
  }
  cancelEmailPopup() {
    this.displayEmailDialog = false;
    this.selectedCandidates = [];
    this.resetForm();
  }

  storeCandidate() {

    //reset data
    this.score = null;
    this.result = '';
    console.log('score', this.score);
    console.log('result', this.result);
    this.tableService
      .postCandidateDetails(
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
        this.duration,
        this.candidatePassword,
        this.candidateConfirmPassword
      )
      .subscribe((response) => {
        console.log('stored', response);
        this.candidateList.push(response);
      });
    this.getExistingTableData
    this.getCandidatename();
    this.resetForm();
    // Close the dialog
    this.displayEmailDialog = false;
  }
  resetForm() {
    this.candidateName = '';
    this.candidateEmail = '';
    this.candidatePhone = null;
    this.candidatePassword = '';
    this.candidateConfirmPassword = '';

    // You might want to set this to a default value
    //    this.email_Status = '';
    //    this.email_Filename = '';
    //  this.questions = '';
    //   // Close the dialog
    //   this.displayEmailDialog = false;
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
        this.managernameService.setFinalizedQuestions(this.FinalizedQuestions);
        this.managernameService.setManagerName(this.view_Managername);
        this.managernameService.setFileName(this.view_Filename);
        this.router.navigate(['questiondisplay']);
        console.log('questions :', this.FinalizedQuestions);
      });
  }

  //clone icon
  cloneData: any = {};
 
  async onCloneClick(data: any) {
 
 
    this.managernameService
      .getManagerdata_by_Email(this.finalizedManagerEmail)
      .subscribe((response) => {
        console.log('res', response);
        this.managerEmail = response[0].Managername;
      });
    console.log("Clone Data", data);
    this.cloneData = { ...data };
    this.cloneData.Managername = this.managerEmail;
    console.log('Clone manager', this.managerEmail);
 
    //Changing filename with version
    const skillName = this.cloneData.Skill.sort()
    console.log('Skill name', skillName);
 
    const latestVersion = await lastValueFrom(
      this.skillsdropdownservice.getLatestVersion(
        this.managerEmail,
        skillName
      )
    );
 
    const newVersion = latestVersion ? latestVersion + 1 : 1;
    const fileNameWithVersion = `${skillName.join('_')}_v${newVersion}`;
    console.log('lv:', latestVersion);
    console.log('Filename ---lv:', fileNameWithVersion);
    this.cloneData.fileName = fileNameWithVersion;
 
    this.Tdata.push(this.cloneData);
    console.log('Updated Clone Data', this.cloneData);
 
    
    this.skillsdropdownservice
          .postquestions_by_Manager(this.cloneData)
          .subscribe((response) => {
            console.log('output----->', response)
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
        this.duration = data[0].duration;
        this.editManagername = ManagerName;
        this.editFilename = fileName;
        this.managernameService.setCutoff(this.cutoff);
        console.log('edit cutoff', this.cutoff);
        this.managernameService.setDuration(this.duration);
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
 
  interaction = Array(this.textQuestion.length).fill(false);

  markInteracted(index: number) {
    this.interaction[index] = true;
  }

  checkInteraction(): boolean {
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
        _id: this.id,
 
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

    this.id = data._id;

    this.FinalizedQuestions = data.questions;

    console.log('fq------------', this.FinalizedQuestions);

    this.cutoff = data.cutoff;

    console.log('qd', this.FinalizedQuestions);

    console.log('length', this.FinalizedQuestions.length);

    this.textQuestions = this.FinalizedQuestions.filter(
      (question) => question.questionType === 'Text'
    );
 
    this.interaction = Array(this.textQuestions.length).fill(false);

    console.log('Interaction', this.interaction);

    console.log('Id', this.id);

    this.visible = true;
  }

openquestiondialog(){
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
  closequestiondialog(){
    this.resetdialog();
  }

addquestion(){
  // console.log(this.question, this.selectedquestionType, this.option1, this.option2, this.option3, this.option4, this.chosenSkill, this.selecteddifficultyType,this.selectedAnswer)
  console.log("Selected", this.selectedAnswers)
  console.log("Hi", this.selectedAnswer)
  console.log("Hi", this.option1, this.option2, this.option3, this.option4,)
  console.log("Hi", this.selectedquestionType, this.chosenSkill)

  this.managernameService.postquestionstodb(
    this.question, 
    this.selectedquestionType, 
    this.option1, 
    this.option2, 
    this.option3, 
    this.option4, 
    this.chosenSkill, 
    this.selecteddifficultyType,
    this.selectedAnswer,
    this.selectedAnswers
    ).subscribe((data) => {
   console.log("hi", data)
  });
this.showSuccess();
}
showSuccess() {
  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Question Added Successfully' });
}

resetdialog() {
   this.question= ''; 
    this.selectedquestionType= ''; 
    this.option1= '';
    this.option2= '';
    this.option3= '';
    this.option4= '';
    this.chosenSkill= ''; 
    this.selecteddifficultyType= '';
    this.selectedAnswer= '';
    // this.selectedAnswers= '';

}
typeSelected(){
  
}

onAddQuestionClick(){
  this.router.navigate(['questiondb']);
}

}





interface Column {
  field: string;
  header: string;
}

interface FilterSkill {
  _id: number;
  skill: string;
  subskills: string[];
  __v: number;
}