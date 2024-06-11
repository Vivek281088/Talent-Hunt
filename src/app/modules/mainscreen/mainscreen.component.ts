
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
  clonedProducts: any = {};


  selectedCurrentStatus!:string;
  currentStatus:any = [{name:"L1",value:"L1"},{name:"L2",value:"L2"},{name:"Rejected at Screening",value:"Rejected at Screening"},
    {name:"Rejected at Test",value:"Rejected at Test"},{name:"Mapped",value:"Mapped"},{name:"Onboarding",value:"Onboarding"}]
  panelMembers:any=[{names:"Indhu", value :"Indhu"},{names:"Vairavan",value :"Vairavan"},{names:"Suresh",value:"Suresh"},{names:"Alamelu",value:"Alamelu"}]
  interviewStatus:any=[{names:"Selected",value:"Selected"},{names:"Rejected",value:"Rejected"},{names:"Pending",value:"Pending"},];

  constructor(private L1ScreenService: L1ScreenService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ){}




ngOnInit(): void {
  this.getl1ScreenDetails();
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
    if(l1.testStatus=="Rejected"||l1.testStatus=="Not Scheduled"){
      return true;
    }

    else{
      return false;
    }
}

getl1ScreenDetails() {
  // this.L1ScreenService.getL1Details().subscribe((data) => {
  //   this.l1Screen= data.map((data: any) => {
  //     if (data.L1 && data.L1.l1InterviewDate) {
  //       data.L1.l1InterviewDate = new Date(data.L1.l1InterviewDate);
  //     }
  //     return data;
  //   });
  //   console.log('llllllllllllllllllllllllll', this.l1Screen);
  // });
  this.L1ScreenService.getL1Details().subscribe((data) => {
    this.l1Screen = data.map((item: any) => {
      if (!item.L1) {
        item.L1 = { l1Panel: [], l1InterviewDate: null, l1Status: '' };
      }
      if (item.L1.l1InterviewDate) {
        item.L1.l1InterviewDate = new Date(item.L1.l1InterviewDate);
      }
      // Initialize missing L2 properties
      if (!item.L2) {
        item.L2 = { l2Panel: [], l2InterviewDate: null, l2Status: '' };
      }
      if (item.L2.l2InterviewDate) {
        item.L2.l2InterviewDate = new Date(item.L2.l2InterviewDate);
      }
      // Initialize current bindings
      this.updateCurrentBindings(item);
      // Set initial values for currentPanel, currentInterviewDate, and currentLStatus if they're empty
      if (!item.currentPanel) {
        item.currentPanel = item.currentStatus === 'L1' ? item.L1.l1Panel : item.L2.l2Panel;
      }
      if (!item.currentInterviewDate) {
        item.currentInterviewDate = item.currentStatus === 'L1' ? item.L1.l1InterviewDate : item.L2.l2InterviewDate;
      }
      if (!item.currentLStatus) {
        item.currentLStatus = item.currentStatus === 'L1' ? item.L1.l1Status : item.L2.l2Status;
      }
      
      return item;
    });
    console.log("l1 screennnnn..................", this.l1Screen)
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
   let l1Details = {}
  if(l1.currentStatus == "L1"){
    const L1 = {
      l1InterviewDate : l1.currentInterviewDate,
      l1Panel : l1.currentPanel,
      l1Status : l1.currentLStatus
    }
     l1Details = {
      pcrId:l1.pcrId,
      candidateId:l1.candidateId,
      screeningDate:l1.screeningDate,
      testStatus:l1.testStatus,
      L1:L1 ,
      L2 : l1.L2,
      currentStatus:l1.currentStatus,
      uniqueId : l1.uniqueId
    }
  }else if(l1.currentStatus == "L2"){
    const L2 = {
      l2InterviewDate : l1.currentInterviewDate,
      l2Panel : l1.currentPanel,
      l2Status : l1.currentLStatus
    }
    l1Details = {
      pcrId:l1.pcrId,
      candidateId:l1.candidateId,
      screeningDate:l1.screeningDate,
      testStatus:l1.testStatus,
      L1:l1.L1,
      L2 : L2,
      currentStatus:l1.currentStatus,
      uniqueId : l1.uniqueId
    }
  }else{
    l1Details = {
      pcrId:l1.pcrId,
      candidateId:l1.candidateId,
      screeningDate:l1.screeningDate,
      testStatus:l1.testStatus,
      L1:l1.L1,
      L2 : l1.L2,
      currentStatus:l1.currentStatus,
      uniqueId : l1.uniqueId
    }
  }
 
   this.L1ScreenService.updateL1Details(l1Details).subscribe((data:any)=>{
    console.log("dataaaaaaaaaaaaaaaaaaaaaaaaa",data)
   })
}
onRowEditInit(product: any) {
  this.clonedProducts[product.pcrId as string] = { ...product };
}

onRowEditSave(product: any) {
  console.log("lioasdkfnakjf", this.l1Screen)
}

onRowEditCancel(product: any, index: number) {

}
updateCurrentBindings(l1: any) {
  if (l1.currentStatus === 'L1') {
    l1.currentPanel = l1.L1.l1Panel;
    l1.currentInterviewDate = l1.L1.l1InterviewDate;
    l1.currentLStatus = l1.L1.l1Status;
  } else if (l1.currentStatus === 'L2') {
    l1.currentPanel = l1.L2.l2Panel;
    l1.currentInterviewDate = l1.L2.l2InterviewDate;
    l1.currentLStatus = l1.L2.l2Status;
  }
}
onStatusChange(l1: any) {
  // if (l1.currentStatus === 'L1') {
  //   l1.L2.l2Panel = [];
  //   l1.L2.l2InterviewDate = null;
  //   l1.L2.l2Status = '';
  // }
  this.updateCurrentBindings(l1);
}
}
