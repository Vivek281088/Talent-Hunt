import { Component, ChangeDetectorRef, } from '@angular/core';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';

@Component({
  selector: 'app-manage-skills-questions',
  templateUrl: './manage-skills-questions.component.html',
  styleUrls: ['./manage-skills-questions.component.scss']
})
export class ManageSkillsQuestionsComponent {
  tabs: { title: any; content: any }[] = [];
  skills: any[] = [];
  previewSidebarVisible : boolean = false;
  questionPreviewvisible:boolean=false;
  singleQuestion: any;
  singleQuestionOption : any
  singleQuestionAnswer : any;
  selectedquestions: any[] = [];



  constructor(
    
    private skillsdropdownservice: SkillsdropdownService,
    
    private cdr: ChangeDetectorRef
    

  ) {
    // this.data=this.dataservice.sharedData;
  }


  ngOnInit()
  {
    this.getSkillSet();
    console.log("hi");
    

  }

  getSkillSet() {
    this.skillsdropdownservice.getskillsList().subscribe((data) => {
      this.skills = data;
      this.postSkill();
      
      console.log('skillset',this.skills);
    });
  }

  postSkill(){
    console.log("skill inside post",this.skills)
    this.skillsdropdownservice
    .postskillsList(this.skills)
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
console.log("tabs",this.tabs);

      this.cdr.detectChanges();
    });
  }
  onPreviewClick(data:any){
    this.selectedquestions=data;
    this.previewSidebarVisible = true;
    console.log("inside the preview",this.selectedquestions);
  
  
}
questionPreview(questions: any) {
  this.questionPreviewvisible = true;
  this.singleQuestion = questions.question;
  this.singleQuestionOption = questions.options
  this.singleQuestionAnswer = questions.answer;
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

// individualQuestionView(id:any,question:any,questionTypeSelected:any,choices:any,skills:any,Difficulty_Level:any,answer:any){
//   this.QuestionView=true
//   this.id=id
//   this.question=question
//   this.questionTypeSelected=questionTypeSelected
//   // this.options=choices;
//   this.choices=choices;
//   // this.choice1=choices[0]
//   // this.choice2=choices[1]
//   // this.choice3=choices[2]
//   // this.choice4=choices[3]
//   this.Difficulty_Level=this.getBackendDifficultyLevelViceVersa(
//     Difficulty_Level
//   );
//   this.skills=skills
//   this.answer=answer
 
//   console.log("id------------->",id,skills,answer,this.Difficulty_Level,choices)
  



// }
}
