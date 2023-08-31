import { Component, OnInit } from '@angular/core';
import { SkillsdropdownService } from 'src/app/services/skillsdropdown.service';
import { ManagernameService } from 'src/app/services/managername.service';
import { Checkbox } from 'primeng/checkbox';


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
  }

}




// submitSelectedQuestions() {

//     const selectedQuestions = this.TotalQuestions.filter(question => question.selected);

//     console.log('Selected Questions:', selectedQuestions);

//     // Here you can implement logic to save the selected questions

//   }

