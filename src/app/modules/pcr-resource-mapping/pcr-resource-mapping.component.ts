import { Component } from '@angular/core';
import { ConfirmEventType, MenuItem, Message } from 'primeng/api';
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
import {
  Schedule,
  ScheduleActions,
} from 'src/app/store/schedule/schedule.action';
import { getSchedules } from 'src/app/store/schedule/schedule.selector';
import { L1ScreenService } from 'src/app/services/l1-screen.service';

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
  selectedAgileId!: string;
  selectedCandidates = [];
  messages: Message[] = [];
  mailData!: MailDetails;
  pcrSelected: boolean = false;
  sendMailCardVisible: boolean = false;
  scheduledata!: any;
  selectedSchedule!: any;
  deleteData!: any;
  agileData = ["AGL002"];
  currentStatus: any = [
    { name: 'Screen Pending', value: 'Screen Pending' },
    { name: 'Screen Reject', value: 'Screen Reject' },
    { name: 'Test Scheduled', value: 'Test Scheduled' },
    { name: 'Test Pass', value: 'Test Pass' },
    { name: 'Test Fail', value: 'Test Fail' },
    { name: 'L1 TBS', value: 'L1 TBS' },
    { name: 'L1 Scheduled', value: 'L1 Scheduled' },
    { name: 'L1 Select', value: 'L1 Select' },
    { name: 'L1 Reject', value: 'L1 Reject' },
    { name: 'L2 TBS', value: 'L2 TBS' },
    { name: 'L2 Scheduled', value: 'L2 Scheduled' },
    { name: 'L2 Select', value: 'L2 Select' },
    { name: 'L2 Reject', value: 'L2 Reject' },
    { name: 'Client TBS', value: 'Client TBS' },
    { name: 'Client Scheduled', value: 'Client Scheduled' },
    { name: 'Client Select', value: 'Client Select' },
    { name: 'Client Reject', value: 'Client Reject' },
    { name: 'L2', value: 'L2' },
    { name: 'Client Feedback Awaited', value: 'Client Feedback Awaited' },
    { name: 'Not Available', value: 'Not Available' },
    { name: 'BGV Failure', value: 'BGV Failure' },
    { name: 'Onboarding', value: 'Onboarding' },
    { name: 'Offered', value: 'Offered' },
    { name: 'Offer Reject', value: 'Offer Reject' },
    { name: 'Joined', value: 'Joined' },
  ];
  panelMembers: any = [
    { names: 'Indhu', value: 'Indhu' },
    { names: 'Vairavan', value: 'Vairavan' },
    { names: 'Suresh', value: 'Suresh' },
    { names: 'Alamelu', value: 'Alamelu' },
  ];

  constructor(
    private MappingService: PcrMappingService,
    private readonly store: Store,
    private router: Router,
    private messageService: MessageService,
    private L1ScreenService: L1ScreenService,
    private confirmationService: ConfirmationService
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
  l1Screen!: any;
  getPcrMappingData() {
    this.store.dispatch(PcrCandidateActions.getPcrMappingData());
    this.store.select(getMappingData).subscribe((data) => {
      console.log('Client Manager Details From Store', data);

      this.mappingData = data;

      const sample = structuredClone(data);
      this.l1Screen = sample.map((item: any) => {
        if (!item.mappedData.L1) {
          item.mappedData.L1 = { l1Panel: [], l1InterviewDate: null };
        }
        if (item.mappedData.L1.l1InterviewDate) {
          console.log('dfnajnajkgn', item.mappedData.L1.l1InterviewDate);
          item.mappedData.L1.l1InterviewDate = new Date(
            item.mappedData.L1.l1InterviewDate
          );
        }
        if (!item.mappedData.L2) {
          item.mappedData.L2 = { l2Panel: [], l2InterviewDate: null };
        }
        if (item.mappedData.L2.l2InterviewDate) {
          item.mappedData.L2.l2InterviewDate = new Date(
            item.mappedData.L2.l2InterviewDate
          );
        }
        this.updateCurrentBindings(item);
        // Set initial values for currentPanel, currentInterviewDate, and currentLStatus if they're empty
        if (!item.currentPanel) {
          item.mappedData.currentPanel =
            item.mappedData.currentStatus == 'L1 TBS' ||
            item.mappedData.currentStatus == 'L1 Scheduled' ||
            item.mappedData.currentStatus == 'L1 Select' ||
            item.mappedData.currentStatus == 'L1 Reject'
              ? item.mappedData.L1.l1Panel
              : item.mappedData.L2.l2Panel;
        }
        if (!item.mappedData.currentInterviewDate) {
          item.mappedData.currentInterviewDate =
            item.mappedData.currentStatus == 'L1 TBS' ||
            item.mappedData.currentStatus == 'L1 Scheduled' ||
            item.mappedData.currentStatus == 'L1 Select' ||
            item.mappedData.currentStatus == 'L1 Reject'
              ? item.mappedData.L1.l1InterviewDate
              : item.mappedData.L2.l2InterviewDate;
        }
        return item;
      });
      console.log('l1 screennnnn..................', this.l1Screen);
    });
  }

  selectedDataforMail(data: any) {
    console.log('Selected Data ', data);
    const mapData = {
      uniqueId: data.mappedData.uniqueId,
      candidateName: data.candidateData.candidateName,
      emailId: data.candidateData.emailId,
      candidateId: data.candidateData.candidateId,
      pcrId: data.mappedData.pcrId,
    };
    this.mailData = mapData;
    console.log('New Selected Data ', this.mailData);
  }

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
      console.log(data)
      this.candidateData = data
        .map((item: { candidateId: string; candidateName: string; }) => ({ID: item.candidateId+" - "+item.candidateName}))
        .filter((id: string) => !filtrredCandidate.includes(id));
      console.log('Candidate Data :', this.candidateData);
    });
  }
  agileChange(){
    this.pcrSelected = true;
    console.log(this.selectedAgileId)
  }
  showTooltip() {
    if (!this.pcrSelected) {
      this.messages = [{ severity: 'warn', detail: 'Please select a PCR' }];
    }
  }
  // individualPCR(id: string) {
  //   sessionStorage.setItem('currentPCRid', id);
  //   this.router.navigate(['/mtalent/pcrdetails']);
  // }
  // individualResource(id: string) {
  //   console.log('candidate ids', id);
  //   sessionStorage.setItem('currentResourceId', id);
  //   this.router.navigate(['/mtalent/candidatedetails']);
  // }
  openInviteDialog(event: Event, data: any) {
    if (data.mappedData.mailSend) {
      event.stopPropagation();
      return;
    }
    this.selectedDataforMail(data);
    this.sendMailCardVisible = true;
    this.store.dispatch(ScheduleActions.getSchedule());
    this.store.select(getSchedules).subscribe((data) => {
      console.log('select state', data);
      this.scheduledata = data;
    });
  }
  closeInviteDialog() {
    this.sendMailCardVisible = false;

    //reset data
    this.selectedSchedule = '';
    this.mailData = {
      candidateName: '',
      emailId: '',
      candidateId: '',
      pcrId: '',
    };
  }

  scheduleSelected() {
    console.log(this.selectedSchedule);
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
  deleteMappedData() {
    console.log(this.deleteData);

    const deleteData = this.deleteData.map(
      (data: { mappedData: { uniqueId: string } }) => data.mappedData.uniqueId
    );
    console.log(deleteData);
    this.showDeleted();
    this.store.dispatch(PcrCandidateActions.deleteMappedData({ deleteData }));
    this.deleteData = [];
  }
  toggleSelectAll() {
    console.log('Select all :', this.deleteData);
  }
  toggle(data: any) {
    console.log('Toggle :', this.deleteData);
  }
  updateCurrentBindings(l1: any) {
    console.log('????????????????????????????????????????????', l1.mappedData);
    if (
      l1.mappedData.currentStatus == 'L1 TBS' ||
      l1.mappedData.currentStatus == 'L1 Scheduled' ||
      l1.mappedData.currentStatus == 'L1 Select' ||
      l1.mappedData.currentStatus == 'L1 Reject'
    ) {
      l1.mappedData.currentPanel = l1.mappedData.L1.l1Panel;
      l1.mappedData.currentInterviewDate = l1.mappedData.L1.l1InterviewDate;
    } else if (
      l1.mappedData.currentStatus == 'L2 TBS' ||
      l1.mappedData.currentStatus == 'L2 Scheduled' ||
      l1.mappedData.currentStatus == 'L2 Select' ||
      l1.mappedData.currentStatus == 'L2 Reject'
    ) {
      l1.mappedData.currentPanel = l1.mappedData.L2.l2Panel;
      l1.mappedData.currentInterviewDate = l1.mappedData.L2.l2InterviewDate;
    } else {
      l1.mappedData.currentPanel = '';
      l1.mappedData.currentInterviewDate = '';
    }
  }
  onStatusChange(data: any) {
    this.updateCurrentBindings(data);
  }
  onRowEditInit(product: any) {
    //this.clonedProducts[product.pcrId as string] = { ...product };
  }

  onRowEditSave(product: any) {
    console.log('lioasdkfnakjf', this.mappingData);
  }

  onRowEditCancel(product: any, index: number) {}
  position: string = 'center';
  confirmPosition(l1: any) {
    console.log('save--', l1);
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
  addL1Details(l1: any) {
    let l1Details = {};
    if (
      l1.mappedData.currentStatus == 'L1 TBS' ||
      l1.mappedData.currentStatus == 'L1 Scheduled' ||
      l1.mappedData.currentStatus == 'L1 Select' ||
      l1.mappedData.currentStatus == 'L1 Reject'
    ) {
      const L1 = {
        l1InterviewDate: l1.mappedData.currentInterviewDate,
        l1Panel: l1.mappedData.currentPanel,
      };
      l1Details = {
        pcrId: l1.mappedData.pcrId,
        candidateId: l1.mappedData.candidateId,
        screeningDate: l1.mappedData.screeningDate,
        testStatus: l1.mappedData.testStatus,
        L1: L1,
        L2: l1.mappedData.L2,
        currentStatus: l1.mappedData.currentStatus,
        uniqueId: l1.mappedData.uniqueId,
        deleted: l1.mappedData.deleted,
      };
    } else if (
      l1.mappedData.currentStatus == 'L2 TBS' ||
      l1.mappedData.currentStatus == 'L2 Scheduled' ||
      l1.mappedData.currentStatus == 'L2 Select' ||
      l1.mappedData.currentStatus == 'L2 Reject'
    ) {
      const L2 = {
        l2InterviewDate: l1.mappedData.currentInterviewDate,
        l2Panel: l1.mappedData.currentPanel,
      };
      l1Details = {
        pcrId: l1.mappedData.pcrId,
        candidateId: l1.mappedData.candidateId,
        screeningDate: l1.mappedData.screeningDate,
        testStatus: l1.mappedData.testStatus,
        L1: l1.mappedData.L1,
        L2: L2,
        currentStatus: l1.mappedData.currentStatus,
        uniqueId: l1.mappedData.uniqueId,
        deleted: l1.mappedData.deleted,
      };
    } else {
      l1Details = {
        pcrId: l1.mappedData.pcrId,
        candidateId: l1.mappedData.candidateId,
        screeningDate: l1.mappedData.screeningDate,
        testStatus: l1.mappedData.testStatus,
        L1: l1.mappedData.L1,
        L2: l1.mappedData.L2,
        currentStatus: l1.mappedData.currentStatus,
        uniqueId: l1.mappedData.uniqueId,
        deleted: l1.mappedData.deleted,
      };
    }
    console.log(l1Details);
    this.L1ScreenService.updateL1Details(l1Details).subscribe((data: any) => {
      console.log(data);
    });
  }

}
