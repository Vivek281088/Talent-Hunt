
import { ConfirmEventType, ConfirmationService, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Table} from 'primeng/table';
import { L1ScreenService } from 'src/app/services/l1-screen.service';
import { PcrCandidateActions } from 'src/app/store/PCR-Mapping/pcr-mapping.action';
import { Store } from '@ngrx/store';
import { getMappingData } from 'src/app/store/PCR-Mapping/pcr-mapping.selector';
import { Router } from '@angular/router';

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
  mappingData:any;


  selectedCurrentStatus!:string;
  currentStatus:any = [{name:"L1",value:"L1"},{name:"L2",value:"L2"},{name:"Rejected at Screening",value:"Rejected at Screening"},
    {name:"Rejected at Test",value:"Rejected at Test"},{name:"Mapped",value:"Mapped"},{name:"Onboarding",value:"Onboarding"}]
  panelMembers:any=[{names:"Indhu", value :"Indhu"},{names:"Vairavan",value :"Vairavan"},{names:"Suresh",value:"Suresh"},{names:"Alamelu",value:"Alamelu"}]
  interviewStatus:any=[{names:"Selected",value:"Selected"},{names:"Rejected",value:"Rejected"},{names:"Pending",value:"Pending"},];

  constructor(private L1ScreenService: L1ScreenService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private store:Store,
    private router : Router
  ){}




ngOnInit(): void {
  this.getPcrMappingData();
  //this.getl1ScreenDetails();
  this.items = [
    { label: 'Home', routerLink: '/login', icon: 'pi pi-home' },
     { label: 'L1SCREEN', routerLink: '/manage-managers' },
  ];
}


clear(table: Table) {
  table.clear();
  this.globalSearchValue = '';
}
getPcrMappingData() {
  this.store.dispatch(PcrCandidateActions.getPcrMappingData());
  this.store.select(getMappingData).subscribe((data) => {
    console.log('Client Manager Details From Store', data);
    this.mappingData = data;

      // this.mappingData = data.map((item: any) => { 
      //   if (!item.mappedData.L1) {
      //     item.mappedData.L1 = { l1Panel: [], l1InterviewDate: null, l1Status: '' };
      //   }
      //   if (item.mappedData.L1.l1InterviewDate) {
      //     item.mappedData.L1.l1InterviewDate = new Date(item.mappedData.L1.l1InterviewDate).toDateString();
      //   }
      //   // Initialize missing L2 properties
      //   if (!item.mappedData.L2) {
      //     item.mappedData.L2 = { l2Panel: [], l2InterviewDate: null, l2Status: '' };
      //   }
      //   if (item.mappedData.L2.l2InterviewDate) {
      //     item.mappedData.L2.l2InterviewDate = new Date(item.mappedData.L2.l2InterviewDate).toDateString();
      //   }
      //   // Initialize current bindings
      //   this.updateCurrentBindings(item);
      //   // Set initial values for currentPanel, currentInterviewDate, and currentLStatus if they're empty
      //   if (!item.mappedData.currentPanel) {
      //     item.mappedData.currentPanel = item.mappedData.currentStatus === 'L1' ? item.mappedData.L1.l1Panel : item.mappedData.L2.l2Panel;
      //   }
      //   if (!item.mappedData.currentInterviewDate) {
      //     item.mappedData.currentInterviewDate = item.mappedData.currentStatus === 'L1' ? item.mappedData.L1.l1InterviewDate : item.mappedData.L2.l2InterviewDate;
      //   }
      //   if (!item.mappedData.currentLStatus) {
      //     item.mappedData.currentLStatus = item.mappedData.currentStatus === 'L1' ? item.mappedData.L1.l1Status : item.mappedData.L2.l2Status;
      //   }

      //   return item;
      // });
      const sample = structuredClone(data);
      this.l1Screen = sample.map((item: any) => {
              if (!item.mappedData.L1) {
                item.mappedData.L1 = { l1Panel: [], l1InterviewDate: null, l1Status: '' };
              }
              if (item.mappedData.L1.l1InterviewDate) {
                console.log("dfnajnajkgn", item.mappedData.L1.l1InterviewDate)
                item.mappedData.L1.l1InterviewDate = new Date(item.mappedData.L1.l1InterviewDate);
              }
              if (!item.mappedData.L2) {
                item.mappedData.L2 = { l2Panel: [], l2InterviewDate: null, l2Status: '' };
              }
              if (item.mappedData.L2.l2InterviewDate) {
                item.mappedData.L2.l2InterviewDate = new Date(item.mappedData.L2.l2InterviewDate);
              }
              this.updateCurrentBindings(item);
              // Set initial values for currentPanel, currentInterviewDate, and currentLStatus if they're empty
              if (!item.currentPanel) {
                item.mappedData.currentPanel = item.mappedData.currentStatus === 'L1' ? item.mappedData.L1.l1Panel : item.mappedData.L2.l2Panel;
              }
              if (!item.mappedData.currentInterviewDate) {
                item.mappedData.currentInterviewDate = item.mappedData.currentStatus === 'L1' ? item.mappedData.L1.l1InterviewDate : item.mappedData.L2.l2InterviewDate;
              }
              if (!item.mappedData.currentLStatus) {
                item.mappedData.currentLStatus = item.mappedData.currentStatus === 'L1' ? item.mappedData.L1.l1Status : item.mappedData.L2.l2Status;
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
  if(l1.mappedData.currentStatus == "L1"){
    const L1 = {
      l1InterviewDate : l1.mappedData.currentInterviewDate,
      l1Panel : l1.mappedData.currentPanel,
      l1Status : l1.mappedData.currentLStatus
    }
     l1Details = {
      pcrId:l1.mappedData.pcrId,
      candidateId:l1.mappedData.candidateId,
      screeningDate:l1.mappedData.screeningDate,
      testStatus:l1.mappedData.testStatus,
      L1:L1 ,
      L2 : l1.mappedData.L2,
      currentStatus:l1.mappedData.currentStatus,
      uniqueId : l1.mappedData.uniqueId
    }
  }else if(l1.currentStatus == "L2"){
    const L2 = {
      l2InterviewDate : l1.mappedData.currentInterviewDate,
      l2Panel : l1.mappedData.currentPanel,
      l2Status : l1.mappedData.currentLStatus
    }
    l1Details = {
      pcrId:l1.mappedData.pcrId,
      candidateId:l1.mappedData.candidateId,
      screeningDate:l1.mappedData.screeningDate,
      testStatus:l1.mappedData.testStatus,
      L1:l1.mappedData.L1,
      L2 : L2,
      currentStatus:l1.mappedData.currentStatus,
      uniqueId : l1.mappedData.uniqueId
    }
  }else{
    l1Details = {
      pcrId:l1.mappedData.pcrId,
      candidateId:l1.mappedData.candidateId,
      screeningDate:l1.mappedData.screeningDate,
      testStatus:l1.mappedData.testStatus,
      L1:l1.mappedData.L1,
      L2 : l1.mappedData.L2,
      currentStatus:l1.mappedData.currentStatus,
      uniqueId : l1.mappedData.uniqueId
    }
  }
   this.L1ScreenService.updateL1Details(l1Details).subscribe((data:any)=>{
    console.log(data);
   })
}
onRowEditInit(product: any) {
  //this.clonedProducts[product.pcrId as string] = { ...product };
}

onRowEditSave(product: any) {
  console.log("lioasdkfnakjf", this.l1Screen)
}

onRowEditCancel(product: any, index: number) {

}
updateCurrentBindings(l1: any) {
  console.log("????????????????????????????????????????????",l1.mappedData)
  if (l1.mappedData.currentStatus === 'L1') {
    l1.mappedData.currentPanel = l1.mappedData.L1.l1Panel;
    l1.mappedData.currentInterviewDate = l1.mappedData.L1.l1InterviewDate;
    l1.mappedData.currentLStatus = l1.mappedData.L1.l1Status;
  } else if (l1.mappedData.currentStatus === 'L2') {
    l1.mappedData.currentPanel = l1.mappedData.L2.l2Panel;
    l1.mappedData.currentInterviewDate = l1.mappedData.L2.l2InterviewDate;
    l1.mappedData.currentLStatus = l1.mappedData.L2.l2Status;
  }else{
    l1.mappedData.currentPanel = "";
    l1.mappedData.currentInterviewDate = "";
    l1.mappedData.currentLStatus = "";
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
individualPCR(id: any) {
  sessionStorage.setItem("currentResourceId",id)
    this.router.navigate(['/mtalent/candidatedetails'])
  }
}
