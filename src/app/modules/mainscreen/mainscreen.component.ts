
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table} from 'primeng/table';
import { L1ScreenService } from 'src/app/services/l1-screen.service';

@Component({
  selector: 'app-mainscreen',
  templateUrl: './mainscreen.component.html',
  styleUrls: ['./mainscreen.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class MainscreenComponent implements OnInit {
  items: MenuItem[] | undefined;
  todayDate!: Date;
  date: Date | undefined;
  globalSearchValue!: string;
  l1Screen!:any;
  position: string = 'center';


  selectedCurrentStatus!:string;
  currentStatus:any = [{name:"L1",value:"L1"},{name:"L2",value:"L2"},{name:"Rejected at Screening",value:"Rejected at Screening"},{name:"Rejected at Test",value:"Rejected at Test"},{name:"Mapped",value:"Mapped"},{name:"Onboarding",value:"Onboarding"}]
  panelMembers:any=[{names:"Indhu", value :"Indhu"},{names:"Vairavan",value :"Vairavan"},{names:"Suresh",value:"Suresh"},{names:"Alamelu",value:"Alamelu"}]
  interviewStatus:any=[{names:"Selected",value:"Selected"},{names:"Rejected",value:"Rejected"},{names:"Pending",value:"Pending"}];

  constructor( private L1ScreenService: L1ScreenService,private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ){


  }




ngOnInit(): void {
  this.getl1ScreenDetails();

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
  //console.log("from disabled",l1)
    if(l1.testStatus=="Rejected"||l1.testStatus=="Not Scheduled"){
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
    this.l1Screen= data.map((candidate: any) => {
      if (candidate.L1 && candidate.L1.l1InterviewDate) {
        candidate.L1.l1InterviewDate = new Date(candidate.L1.l1InterviewDate);
      }
      return candidate;
    });

    console.log('llllllllllllllllllllllllll', this.l1Screen);
  });
}



confirmPosition(l1: any) {
  this.position = 'top';
  this.confirmationService.confirm({
    message: 'Are you Sure?Do you want to change your Interview Status?',
    header: 'Submit Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.addL1Details(l1);
      this.messageService.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Submitted',
      });



      console.log('Submitted');
    },
    reject: (type: ConfirmEventType) => {
      switch (type) {
        case ConfirmEventType.REJECT:

          console.log('Rejected');
          break;
        case ConfirmEventType.CANCEL:

          break;
      }
    },
    key: 'positionDialog',
  });
}
addL1Details(l1:any){
   const l1Details = {

     pcrId:l1.pcrId,
  candidateId:l1.candidateId,
  s:l1.screeningDate,
  testStatus:l1.testStatus,
  L1:l1.L1,
  currentStatus:l1.currentStatus,

   }
   this.L1ScreenService.updateL1Details(l1Details).subscribe((data:any)=>{
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa",data)

   })
}
onRowEditInit(product: any) {

}

onRowEditSave(product: any) {
  console.log(product)
  product.L1.l1InterviewDate =  product.L1.l1InterviewDate.toLocaleDateString()

}

onRowEditCancel(product: any, index: number) {

}

}
