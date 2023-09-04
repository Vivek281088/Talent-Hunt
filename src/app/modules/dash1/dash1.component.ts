import { Component, OnInit } from '@angular/core';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { ManagernameService } from 'src/app/services/managername.service';



@Component({
  selector: 'app-dash1',
  templateUrl: './dash1.component.html',
  styleUrls: ['./dash1.component.scss']
  
})

export class Dash1Component implements OnInit {
  // manager!: Manager[];

  Skills: any = [];

  selectedManager: any;

  TotalQuestions: any;

  managerSet: any[] = [];

  skillSet: any[] = [];

  selectedSkill: any[] = [];

  selectedQuestions: any[] = [];

  ski: any[] = [];

  FinalizedQuestions: any[] = [];

  duration: number = 0;

  cuttoff: number = 0;

  FinalOutput: any[] = [];

  //dataToSave: any[] = [];


  

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
  
      // console.log(this.skillSet);

      // console.log('Users:' + JSON.stringify(this.selectedSkill));

  
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
    
    this.selectedQuestions = [];
    this.ski = [];
    for (let g of this.selectedSkill) {

    this.ski.push(g.skill)

    }
    console.log(this.ski);
    
  this.skillsdropdownservice.postskillsList(this.ski).subscribe(response =>{

    console.log('response',response);
    this.TotalQuestions = response;
   });
  }

  checkboxChanged(item : any){
  if (item.selected) {
    this.selectedQuestions.push(item);
    }
  else {                                        //removing question after unselecting
    const index = this.selectedQuestions.findIndex(selectedQuestion =>
      selectedQuestion._id === item._id);
    if (index !== -1) {
      this.selectedQuestions.splice(index, 1);
    }
  }
  
  }
  
  
  saveSelected() {
    console.log('Selected Items : ', this.selectedQuestions);
    console.log('Selected Items Count : ', this.selectedQuestions.length);
    this.FinalizedQuestions = this.selectedQuestions;
    console.log('Finalized Items : ', this.FinalizedQuestions);
    console.log('CuttOff : ', this.cuttoff);
    console.log('Duration : ', this.duration);


    //set the Finalizedquestions,Duration,Cuttoff in the service

    this.managernameService.setFinalizedQuestions(this.FinalizedQuestions);
    this.managernameService.setDuration(this.duration);
    this.managernameService.setCuttoff(this.cuttoff);
    
    //save the data 
    const dataToSave = {
    Questions:this.FinalizedQuestions ,
      duration: this.duration ,
      cuttoff: this.cuttoff,
       //skills:this.selectedSkill,
  };

    console.log('Data to Save:', dataToSave);

     this.skillsdropdownservice.postquestions(dataToSave).subscribe(response =>{

    //console.log('Final Output :',response);
       //this.FinalOutput = response;
        console.log('Final Output :',response);
   });
  

  }
  
  

  getDifficultyStyle(difficulty: string): any {
  if (difficulty === 'E') {
    return { color: 'Lightgreen' };
  } else if (difficulty === 'M') {
    return { color: 'yellow' };
  } else {
    return { color: 'red' };
  }
}

}



