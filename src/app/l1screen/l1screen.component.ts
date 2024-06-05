import { L1ScreenService } from './../services/l1-screen.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table} from 'primeng/table'

@Component({
  selector: 'app-l1screen',
  templateUrl: './l1screen.component.html',
  styleUrls: ['./l1screen.component.scss']
})
export class L1screenComponent implements OnInit  {
  items: MenuItem[] | undefined;
  todayDate!: Date;
  date: Date | undefined;
  globalSearchValue!: string;
  l1Screen!:any

  selectedCurrentStatus!:string;
  currentStatus:any = [{name:"l1"},{name:"l2"},{name:"Rejected at Screening"},{name:"Rejected at test"}]
  panelMembers:any=[{names:"Indhu", value :"Indhu"},{names:"Vairavan",value :"Vairavan"},{names:"Suresh",value:"Suresh"},{names:"Alamelu",value:"Alamelu"}]
  interviewStatus:any=[{names:"Selected",value:"Selected"},{names:"Rejected",value:"Rejected"},{names:"Pending",value:"Pending"}]
  constructor( private L1ScreenService: L1ScreenService){


  }




ngOnInit(): void {
  this.getl1ScreenDetails()
  //this.changeStatus();
  this.items = [
    { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
     { label: 'L1SCREEN', routerLink: '/manage-managers' },
  ];
}


clear(table: Table) {
  table.clear();
  this.globalSearchValue = '';
}

isDisabled(l1:any):boolean{
    if(l1.testStatus=="Not Scheduled"){
      return true;
    }
    else{
      return false;
    }
}

// updateCheck(){
//   console.log("......................button",this.l1Screen)
// }


// changeStatus()
// {
//   for(let i=0;i<this.l1Screen.length;i++){
//   if(this.l1Screen[i].screeningDate&& this.l1Screen[i].testStatus=="Selected")
//     {
//       this.l1Screen[i].L1.l1Status=this.currentStatus[0].name;
//       console.log("sapna",this.l1Screen)
//     }

//     else if(this.l1Screen[i].screeningDate&&this.l1Screen[i].testStatus=="Not Scheduled"){
//       this.l1Screen[i].L1.l1Status=this.currentStatus[2].name
//     }
//   }
// }

getl1ScreenDetails() {
  this.L1ScreenService.getL1Details().subscribe((data) => {
    this.l1Screen=data

    console.log('Skill Set', this.l1Screen);
  });
}



}
