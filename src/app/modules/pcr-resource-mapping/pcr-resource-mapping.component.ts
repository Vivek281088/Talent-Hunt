import { Component } from '@angular/core';
import { MenuItem, Message } from 'primeng/api';
import { Table } from 'primeng/table';
import { Store } from '@ngrx/store';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PcrMappingService } from 'src/app/services/pcr-mapping.service';
import {
  AggregatedData,
  PcrCandidateActions,
  PcrData,
  CandidateData,
  MappingPCRCandidateData,
  MailDetails,
} from 'src/app/store/PCR-Mapping/pcr-mapping.action';
import { getMappingData } from 'src/app/store/PCR-Mapping/pcr-mapping.selector';
import { PCR, PcrActions } from 'src/app/store/pcr/pcr.action';
import { getPcr } from 'src/app/store/pcr/pcr.selector';
import { Router } from '@angular/router';
import { Schedule, ScheduleActions } from 'src/app/store/schedule/schedule.action';
import { getSchedules } from 'src/app/store/schedule/schedule.selector';

@Component({
  selector: 'app-pcr-resource-mapping',
  templateUrl: './pcr-resource-mapping.component.html',
  styleUrls: ['./pcr-resource-mapping.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class PcrResourceMappingComponent {
  items: MenuItem[] | undefined;
  todayDate!: Date;
  globalSearchValue!: string;
  pcrData!: PCR[];
  candidateData = [];
  mappingData!: AggregatedData[];
  mappingDialogVisible: boolean = false;
  selectedPcrId!: string;
  selectedCandidates = [];
  messages: Message[] = [];
  mailData!: MailDetails;
  pcrSelected: boolean = false;
  sendMailCardVisible: boolean = false;
  scheduledata !:any;
  selectedSchedule !: any;
  deleteData!: any;

  constructor(
    private MappingService: PcrMappingService,
    private readonly store: Store,
    private router: Router,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    sessionStorage.setItem('Component-Name', 'user');
    this.getPcrMappingData();
    this.getPcrData();
    this.getCandidateData();
    this.todayDate = new Date();
    console.log('Date--------', this.todayDate);

    this.items = [
      { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
      { label: 'PCR-Emp Mapping', routerLink: '/mtalent/pcr-mapping' },
    ];
  }

  clear(table: Table) {
    table.clear();
    this.globalSearchValue = '';
  }
  getPcrData() {
    this.store.dispatch(PcrActions.getPCR());
    this.store.select(getPcr).subscribe((data) => {
      console.log('Pcr Details', data);
      this.pcrData = data;
    });
  }
  getCandidateData() {
    this.MappingService.getAllResource().subscribe((data) => {
      this.candidateData = data.map(
        (item: { candidateId: string }) => item.candidateId
      );
      console.log('Candidate Data :', this.candidateData);
    });
  }
  getPcrMappingData() {
    this.store.dispatch(PcrCandidateActions.getPcrMappingData());
    this.store.select(getMappingData).subscribe((data) => {
      console.log('Client Manager Details From Store', data);
      this.mappingData = data;
    });
  }

  selectedDataforMail(data: any) {
    console.log('Selected Data ', data);
    const mapData = {
        candidateName: data.candidateData.candidateName,
        emailId: data.candidateData.emailId,
        candidateId: data.candidateData.candidateId,
        pcrId: data.mappedData.pcrId,
      }
      this.mailData = mapData;
    console.log('New Selected Data ', this.mailData);
    };



  // toggleSelectAll() {
  //   const filteredSelection = this.selectedMappedData.filter(
  //     (data) => !data.mappedData.mailSend
  //   );
  //   console.log('Filetered Selected Data ', filteredSelection);
  //   const mapData = (data: any[]) => {
  //     return data.map((item) => ({
  //       candidateName: item.candidateData.candidateName,
  //       emailId: item.candidateData.emailId,
  //       candidateId: item.candidateData.candidateId,
  //       pcrId: item.mappedData.pcrId,
  //     }));
  //   };
  //   this.mailData = mapData(filteredSelection);
  //   console.log('New Selected Data ', this.mailData);
  // }
  // handleClick(event: Event, rowData: any): void {
  //   if (rowData.mappedData.mailSend) {
  //     event.stopPropagation();
  //     return;
  //   }
  //   this.toggleSelection(rowData);
  // }
  cancelButton() {
    this.mappingDialogVisible = false;
    this.selectedCandidates = [];
    this.selectedPcrId = '';
    this.getCandidateData();
    this.pcrSelected = false;
  }
  mappingPCR() {
    this.mappingDialogVisible = true;
  }
  mapPCR() {
    const mappingPcrCandidateData: MappingPCRCandidateData[] =
      this.selectedCandidates.map((id) => ({
        pcrId: this.selectedPcrId,
        candidateId: id,
      }));
    console.log('Mapping Data', mappingPcrCandidateData);
    this.store.dispatch(
      PcrCandidateActions.mapPCRAndCandidate({ mappingPcrCandidateData })
    );
    this.getPcrMappingData();
    this.showPcrMapped();
    this.cancelButton();
  }
  selected() {
    console.log('Selected ----', this.selectedPcrId);
    console.log('Selected Candidate---', this.selectedCandidates);
    this.messages = this.selectedCandidates.map((candidateId) => ({
      severity: 'info',
      detail: `Selected PCR ID: ${this.selectedPcrId}, Candidate ID: ${candidateId}`,
    }));
  }

  sendEmail() {
    console.log('Email Sent ----', this.mailData);
    this.store.dispatch(
      PcrCandidateActions.mailMappedData({ mailData: this.mailData })
    );
    this.closeInviteDialog();
    this.showEmailSent();
  }
  getFormattedSkills(skills: any): {
    skills: string[];
    remainingCount: number;
  } {
    const maxLength = 16;

    let result: string[] = [];
    let totalLength = 0;

    for (const skill of skills) {
      if (totalLength + skill.length <= maxLength) {
        result.push(skill);
        totalLength += skill.length;
      } else {
        break;
      }
    }

    const remainingCount = skills.length - result.length;

    return { skills: result, remainingCount: remainingCount };
  }
  remainaingSkills(skills: any, count: number): string[] {
    return skills.slice(-count);
  }
  candidateFiltering() {
    this.pcrSelected = true;
    const filtrredCandidate = this.mappingData
      .filter((item) => item.mappedData.pcrId === this.selectedPcrId)
      .map((item) => item.candidateData.candidateId);
    console.log('Filtered Candidate--', filtrredCandidate);

    this.MappingService.getAllResource().subscribe((data) => {
      this.candidateData = data
        .map((item: { candidateId: string }) => item.candidateId)
        .filter((id: string) => !filtrredCandidate.includes(id));
      console.log('Candidate Data :', this.candidateData);
    });
  }
  showTooltip() {
    if (!this.pcrSelected) {
      this.messages = [{ severity: 'warn', detail: 'Please select a PCR' }];
    }
  }
  individualPCR(id: string) {
    sessionStorage.setItem('currentPCRid', id);
    this.router.navigate(['/mtalent/pcrdetails']);
  }
  individualResource(id: string) {
    console.log('candidate ids', id);
    sessionStorage.setItem('currentResourceId', id);
    this.router.navigate(['/mtalent/candidatedetails']);
  }
  openInviteDialog(event: Event,data : any){
    if (data.mappedData.mailSend) {
          event.stopPropagation();
          return;
        }
    this.selectedDataforMail(data);
    this.sendMailCardVisible = true;
    this.store.dispatch(ScheduleActions.getSchedule())
    this.store.select(getSchedules).subscribe(data =>{
      console.log("select state" , data)
      this.scheduledata = data
    });
  }
  closeInviteDialog() {
    this.sendMailCardVisible = false;

    //reset data
    this.selectedSchedule=''
    this.mailData={
      candidateName: '',
        emailId: '',
        candidateId: '',
        pcrId: '',
    }
  }

  scheduleSelected(){
    console.log(this.selectedSchedule )
  }
  showPcrMapped() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'PCR Mapped Successfully',
    });
  }
  showEmailSent() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Email Sent Successfully',
    });
  }
  showDeleted() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Data deleted Successfully',
    });
  }
  deleteMappedData(){
    console.log(this.deleteData)

    const deleteData = this.deleteData.map((data: { uniqueId: string; })=> data.uniqueId)
    console.log(deleteData);
    this.showDeleted()
    this.store.dispatch(PcrCandidateActions.deleteMappedData({deleteData}));
    this.deleteData=[];

  }
  toggleSelectAll(){
    console.log("Select all :",this.deleteData)
  }
  toggle(data: any){
console.log("Toggle :",this.deleteData)
  }
}
