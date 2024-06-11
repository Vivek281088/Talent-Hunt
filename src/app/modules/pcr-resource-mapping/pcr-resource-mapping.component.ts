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
  pcrData !: PCR[];
  candidateData = ["EXT011","2528625"]
  mappingData!: AggregatedData[];
  selectedMappedData!: AggregatedData[];
  mappingDialogVisible: boolean = false;
  selectedPcrId !: string;
  selectedCandidates =[];
  messages: Message[] =[];
  mailData : MailDetails[]=[];


  constructor(
    private MappingService: PcrMappingService,
    private readonly store: Store
  ) {}
  ngOnInit() {
    sessionStorage.setItem('Component-Name', 'user');
    this.getPcrMappingData();
    this.getPcrData();
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
  getPcrData(){
    this.store.dispatch(PcrActions.getPCR());
    this.store.select(getPcr).subscribe((data) => {
      console.log("Pcr Details",data);
      this.pcrData = data;
    })
  }
  getPcrMappingData() {
    this.store.dispatch(PcrCandidateActions.getPcrMappingData());
    this.store.select(getMappingData).subscribe((data) => {
      console.log('Client Manager Details From Store', data);
      this.mappingData = data;
    });
  }

  toggleSelection(data: any) {
    console.log(data);
    console.log('Selected Data ', this.selectedMappedData);
    const mapData = (data: any[]) => {
      return data.map(item => ({
        candidateName: item.candidateData.candidateName,
        emailId: item.candidateData.emailId,
        candidateId: item.candidateData.candidateId,
        pcrId: item.mappedData.pcrId
      }));
    };
    this.mailData = mapData(this.selectedMappedData);
    console.log('New Selected Data ', this.mailData);

  }
  toggleSelectAll(){
    const filteredSelection = this.selectedMappedData.filter(data => !data.mappedData.mailSend);
    console.log('Filetered Selected Data ', filteredSelection);
    const mapData = (data: any[]) => {
      return data.map(item => ({
        candidateName: item.candidateData.candidateName,
        emailId: item.candidateData.emailId,
        candidateId: item.candidateData.candidateId,
        pcrId: item.mappedData.pcrId
      }));
    };
    this.mailData = mapData(filteredSelection);
    console.log('New Selected Data ', this.mailData);
  }
  handleClick(event: Event, rowData: any): void {
    if (rowData.mappedData.mailSend) {
      event.stopPropagation();
      return;
    }
    this.toggleSelection(rowData);
  }
  cancelButton() {
    this.mappingDialogVisible = false;
    this.selectedCandidates=[];
    this.selectedPcrId =''
  }
  mappingPCR(){
    this.mappingDialogVisible = true
  }
  mapPCR(){
    const mappingPcrCandidateData  : MappingPCRCandidateData[]= this.selectedCandidates.map(id =>({
      pcrId: this.selectedPcrId,
      candidateId: id
    }));
    console.log("Mapping Data",mappingPcrCandidateData)
    this.store.dispatch(PcrCandidateActions.mapPCRAndCandidate({mappingPcrCandidateData}));
    this.getPcrMappingData();
    this.cancelButton();
  }
  selected(){
    console.log("Selected ----",this.selectedPcrId);
    console.log("Selected Candidate---", this.selectedCandidates)
    this.messages = this.selectedCandidates.map(candidateId => ({
      severity: 'info',
      detail: `Selected PCR ID: ${this.selectedPcrId}, Candidate ID: ${candidateId}`
    }));

  }

  sendEmail(){
    console.log("Email Sent ----",this.mailData);
    this.store.dispatch(PcrCandidateActions.mailMappedData({mailData : this.mailData}))
    this.mailData=[];
    this.selectedMappedData =[]
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
}

