import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { ManagernameService } from 'src/app/services/managername.service';
import {HttpClient} from '@angular/common/http'
import { Skill} from './skills';

@Component({
  selector: 'app-dash1',
  templateUrl: './dash1.component.html',
  styleUrls: ['./dash1.component.scss']
  
})

export class Dash1Component implements OnInit {
  // manager!: Manager[];

  Skills: any = [];

  selectedManager: any;

  managerSet: any[] = [];

  skillSet: any[] = [];

  selectedSkill: any[] = [];

  TotalQuestions: any[] = [];

  
  ski: any [] = [];

  constructor(
    private skillsdropdownservice: SkillsdropdownService,
    private managernameService: ManagernameService
  

  ) {

  }

  ngOnInit() {
    this.reloadData();
    this.loadManagerNames();

  }

  reloadData() {

    console.log('hi from Client');

    this.skillsdropdownservice.getskillsList().subscribe(data => {
      this.skillSet = data;
  
      console.log(this.skillSet);

      console.log('Users:' + JSON.stringify(this.selectedSkill));

   

    });

   

  }

  loadManagerNames() {
    this.managernameService.getManagerNames().subscribe(data => {
      this.managerSet = data;
    });

  }
  submitForm() {
    console.log('Selected Manager:', this.selectedManager);
    console.log('Selected Skills:', this.selectedSkill); 
    
    
    for (let g of this.selectedSkill) {

    this.ski.push(g.skills)

  }

  this.skillsdropdownservice.postskillsList(this.ski).subscribe(response =>{

    console.log(response)

 

  });
  }

  //new
  // loadQuestionsForSkill() {
  //   this.TotalQuestions = [
  //     { question: "Explain about Java Programming", questionType: "Text", answer : " ", skill: "Java", sub_skill : "Java basics" },
  //     { question : "Which of the following are the advantages of AWS?", questionType: "Checkbox", options: ["Amazon web-based service","Amazon web-store service","Amazon web service","Amazon web-data service"], skill : "Aws"}
  //   ];
  // }
}

// submitSelectedQuestions() {

//     const selectedQuestions = this.TotalQuestions.filter(question => question.selected);

//     console.log('Selected Questions:', selectedQuestions);

//     // Here you can implement logic to save the selected questions

//   }

