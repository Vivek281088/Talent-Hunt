import { Component } from '@angular/core';
import { ConfirmEventType, MenuItem, Message, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { PcrActions } from 'src/app/store/pcr/pcr.action';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PCR } from 'src/app/store/pcr/pcr.action';
import { getPcr } from 'src/app/store/pcr/pcr.selector';
import * as saveAs from 'file-saver';
import * as Papa from 'papaparse';
import { agileActions, agileDetails } from 'src/app/store/Agile1/Agile1.action';
import { getAgile } from 'src/app/store/Agile1/Agile1.selector';
import * as XLSX from 'xlsx';
import { PcrService } from 'src/app/services/pcr.service';
import { PcrMappingService } from 'src/app/services/pcr-mapping.service';
import { transformDataToInputFields } from 'src/app/shared/utils/transformDataToInputFields';
import { MappingPCRCandidateData, PcrCandidateActions } from 'src/app/store/PCR-Mapping/pcr-mapping.action';
import { Candidate, candidateActions } from 'src/app/store/candidate/candidate.action';
import { getCandidate } from 'src/app/store/candidate/candidate.selector';
import { NewScheduleService } from 'src/app/services/new-schedule.service';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-manage-pcr',
  templateUrl: './manage-pcr.component.html',
  styleUrls: ['./manage-pcr.component.scss'],
})
export class ManagePcrComponent {
  selectedCategories: any[] = [];
  isActive: boolean = false; 
  items: MenuItem[] = [];
  todayDate!: Date;
  addPCR: boolean = false;
  addAgile: boolean = false;
  addPCRForm!: FormGroup;
  addAgileForm!: FormGroup;
  formSubmitted: boolean = false;
  pcrData: any;
  status: string[] = ['Open', 'Closed', 'Available'];
  Location: string[] = ['Onsite', 'OffShore'];
  requestResource: string[] = ['Agile1', 'SOW'];
  agileStatus: string[] = ['Approved','Rejected','']
  requestorOptions : string[] = [];
  locationOptions: string[] = [];
  stateProvOptions: string[] = [];
  statusOptions: string[] = [];
  csaAssignedOptions: string[] = [];
  pcr$!: Observable<PCR[]>;
  editPCR: boolean = false;
  editAgile: boolean = false;
  globalSearchValue!: string;
  isAgileId: boolean = false;
  isPcrId: boolean = false;
  isProjectId: boolean = false;
  isAgile1Id:boolean = false;
  selectedDeletePcr: any;
  agileData!: agileDetails[];
  candidateData!: Candidate[];
  selectedAgileId!: string;
  selectedCandidateId!:string;
  agileDetailsVisible!:boolean;
  inputFields: any = [];
  activeIndex: number = 0;
  candidates$!: Observable<Candidate[]>;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private pcrService: PcrService,
    private pcrAgileMappingService : PcrMappingService,
    private messageService: MessageService,
    private resourceService : ResourceService
  ) {
    this.selectedDeletePcr = [];
    this.addAgileForm = this.fb.group({
      agileId: ['', Validators.required],
      jobTitle: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      requestor: ['', Validators.required],
      location: ['', Validators.required],
      stateProv: ['', Validators.required],
      no: ['', Validators.required],
      status: ['', Validators.required],
      csaAssigned: ['', Validators.required],
    });

    this.addPCRForm = this.fb.group({
      agileId: [null, []],
      pcrId: [
        null,
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ],
      ],
      jobTitle: ['', [Validators.required, Validators.minLength(3)]],
      createdDate: [null, [Validators.required]],
      projectId: [null, []],
      skills: ['', [Validators.required]],
      pcrStatus: ['', [Validators.required]],
      createdBy: ['', [Validators.required, Validators.minLength(3)]],
      location: ['', [Validators.required, Validators.required]],
      requestResource: ['', [Validators.required, Validators.required]],
    });
    this.pcr$ = this.store.select(getPcr);
  }

  onKeyPress(event: KeyboardEvent) {
    const inputLength = (event.target as HTMLInputElement).value.length;
    if (inputLength >= 10) {
      event.preventDefault();
    }
  }

  ngOnInit() {

    this.todayDate = new Date();
    this.items = [
      { label: 'Home', routerLink: '/mtalent/thdashboard', icon: 'pi pi-home' },
      { label: 'PCR', routerLink: '/mtalent/manage-pcr' },
    ];
    this.getAgileData();
    this.getPcrAgileMappedData();
    
    this.store.dispatch(PcrActions.getPCR());
    this.pcr$.subscribe((pcr) => {
      this.pcrData = structuredClone(pcr);

      console.log('pcr data from comp', this.pcrData);
    });

    //get all the candidate details
  this.getUniqueCandidatedata();
  }
  getUniqueCandidatedata() {
      this.resourceService
        .getResourceData()
        .subscribe((response: any[]) => {
          
          this.candidateData=response;
          console.log('Candidate Data', this.candidateData);
        });
    }

  individualPCR(id: string) {
    sessionStorage.setItem('currentPCRid', id);
    this.router.navigate(['/mtalent/pcrdetails']);
  }
  individualAgileId(id : string){
    sessionStorage.setItem('currentAgileid', id);
    this.agileDetailsVisible = true;
    this.pcrService.getIndividualAgile(id).subscribe((data)=>{
      console.log(data)
      this.inputFields=transformDataToInputFields(data);
    })

  }
  addPcr() {
    this.addPCR = true;
  }
  openDialog() {
    this.addAgile = true;
  }

  clear(table: Table) {
    table.clear();
    this.globalSearchValue = '';
  }
  cancelButton() {
    this.addPCR = false;
    this.formSubmitted = false;
    this.editPCR = false;
    this.addPCRForm.reset();
    this.addPCRForm.markAsPristine();
    this.addPCRForm.markAsUntouched();
  }

  closeDialog() {
    this.addAgile = false;
    this.editAgile = false;
    this.addAgileForm.reset();
    this.addAgileForm.markAsPristine();
    this.addAgileForm.markAsUntouched();
  }

  agileSaveButton() {
    this.formSubmitted = true;

    console.log('save button', this.addPCRForm);
    if (this.addPCRForm.valid) {
      const formdata = this.addPCRForm.value;
      console.log('form data', formdata);
      const agile: agileDetails = {
        ID: formdata.agileId,
        Jobs: formdata.jobTitle,
        StartDt: formdata.startDate.toLocaleDateString(),
        EndDt: formdata.endDate.toLocaleDateString(),
        Requested_by: formdata.requestor,
        Location: formdata.location,
        State: formdata?.state,
        No: formdata.no,
        Status: formdata.status,
        CSA_Assigned: formdata.csaAssigned,
        Ageing: '',
        AgeingGroup: '',
        Available: '',
        BillRate: '',
        Business_Unit_Level_2: '',
        category: '',
        Comments: '',
        Competitive_Bill_Bill_Rate: '',
        Competitive_Bill_Total: '',
        Contingent_Workers_Work_Location: '',
        Cost_Center: '',
        Created_Date: '',
        CWR_Type: '',
        Department_Number: '',
        Direct_Send_Boolen: '',
        Direct_Send_value: '',
        employeeDetails: [],
        engaged: '',
        Funding_Type: '',
        Interview_Boolen: '',
        Interview_value: '',
        Number_of_Positions: '',
        Numubers: 0,
        On_Hold_Boolen: '',
        On_Hold_Boolen_value: '',
        PayRate: '',
        Project_Name_Overview_Deliverable: '',
        Qualifications: '',
        Reason: '',
        Report_To: '',
        Responsibility: '',
        Resume_Boolen: '',
        Resume_value: '',
        Submittal_Status: '',
        System_Location: '',
        TClient: '',
        Title: '',
        Type: '',
        Vendor: ''
      };
      console.log('save button', agile);
      this.store.dispatch(agileActions.addAgile({ agile }));
      this.addAgile = false;
    }
    this.cancelButton();
  }


  saveButton() {
    this.formSubmitted = true;

    console.log('save button', this.addPCRForm);
    if (this.addPCRForm) {
      const formdata = this.addPCRForm.value;
      console.log('form data', formdata);
      const pcr: PCR = {
        pcrId: formdata.pcrId,
        agileId: formdata.agileId,
        createdBy: formdata.createdBy,
        createdDate: formdata.createdDate.toLocaleDateString(),
        jobTitle: formdata.jobTitle,
        location: formdata.location,
        pcrStatus: formdata?.pcrStatus,
        projectId: formdata.projectId,
        requestResource: formdata.requestResource,
        skills: formdata.skills,
      };
      console.log('save button', pcr);
      this.store.dispatch(PcrActions.addPCR({ pcr }));
      this.addPCR = false;
    }
    this.cancelButton();
  }

  editAgileData(data: any) {
    this.editAgile = true;
    this.isAgile1Id = true;
    console.log('edit data', data.ID);
    this.getAgileData(data.ID);
    if (data) {
      this.addAgileForm.patchValue({
        ID: data.agileId,
        Jobs: data.jobTitle,
        StartDt: new Date(data.startDate),
        EndDt: new Date(data.endDate),
        Requested_by: data.requestor,
        Location: data.location,
        State: data?.state,
        No: data.no,
        Status: data.status,
        CSA_Assigned: data.csaAssigned,
      });
    }
  }

  editData(data: any) {
    this.editPCR = true;
    this.isAgileId = true;
    this.isPcrId = true;
    this.isProjectId = true;
    console.log('edit data', data.pcrId);
    this.getPcrCandidateMappedDetails(data.pcrId);
    if (data) {
      this.addPCRForm.patchValue({
        agileId: data.agileId,
        pcrId: data.pcrId,
        jobTitle: data.jobTitle,
        createdDate: new Date(data.createdDate),
        projectId: data.projectId,
        skills: data.skills,
        pcrStatus: data.pcrStatus,
        createdBy: data.createdBy,
        location: data.location,
        requestResource: data.requestResource,
      });
    }
  }

  agileUpdateButton() {
    this.formSubmitted = true;
    console.log('data to be updated', this.addAgileForm.value);
    const formdata = this.addAgileForm.value;
    const agile: agileDetails = {
      ID: formdata.agileId,
      Jobs: formdata.jobTitle,
      StartDt: formdata.startDate.toLocaleDateString(),
      EndDt: formdata.endDate.toLocaleDateString(),
      Requested_by: formdata.requestor,
      Location: formdata.location,
      State: formdata?.state,
      No: formdata.no,
      Status: formdata.status,
      CSA_Assigned: formdata.csaAssigned,
      Ageing: '',
      AgeingGroup: '',
      Available: '',
      BillRate: '',
      Business_Unit_Level_2: '',
      category: '',
      Comments: '',
      Competitive_Bill_Bill_Rate: '',
      Competitive_Bill_Total: '',
      Contingent_Workers_Work_Location: '',
      Cost_Center: '',
      Created_Date: '',
      CWR_Type: '',
      Department_Number: '',
      Direct_Send_Boolen: '',
      Direct_Send_value: '',
      employeeDetails: [],
      engaged: '',
      Funding_Type: '',
      Interview_Boolen: '',
      Interview_value: '',
      Number_of_Positions: '',
      Numubers: 0,
      On_Hold_Boolen: '',
      On_Hold_Boolen_value: '',
      PayRate: '',
      Project_Name_Overview_Deliverable: '',
      Qualifications: '',
      Reason: '',
      Report_To: '',
      Responsibility: '',
      Resume_Boolen: '',
      Resume_value: '',
      Submittal_Status: '',
      System_Location: '',
      TClient: '',
      Title: '',
      Type: '',
      Vendor: ''
    };
    this.store.dispatch(agileActions.updateAgile({ agile }));
    this.editAgile = false;

    this.cancelButton();
  }

  updateButton() {
    this.formSubmitted = true;
    console.log('data to be updated', this.addPCRForm.value);
    const formdata = this.addPCRForm.value;
    const pcr: PCR = {
      pcrId: formdata.pcrId,
      agileId: formdata.agileId,
      createdBy: formdata.createdBy,
      createdDate: formdata.createdDate.toLocaleDateString(),
      jobTitle: formdata.jobTitle,
      location: formdata.location,
      pcrStatus: formdata?.pcrStatus,
      projectId: formdata.projectId,
      requestResource: formdata.requestResource,
      skills: formdata.skills,
    };
    this.store.dispatch(PcrActions.updatePCR({ pcr }));
    this.editPCR = false;

    this.cancelButton();
  }
  // toggleSelection(data: any) {
  //   if (!data || !data.uniqueId) {
  //     return;
  //   }
  //   data.selection = !data.selection;

  //   if (data.selection) {
  //     console.log('Selected schedule:', this.selectedDeletePcr);
  //   } else {
  //     console.log('Selected ----schedule :', this.selectedDeletePcr);
  //   }
  // }

  toggleSelection(rowData: any) {
    if (!rowData) {
      console.error("Selected schedule: undefined");
      return;
    }
  
    // Ensure selectedDeletePcr is initialized
    if (!this.selectedDeletePcr) {
      this.selectedDeletePcr = [];
    }
  
    const index = this.selectedDeletePcr.findIndex((item: { uniqueId: any; }) => item.uniqueId === rowData.uniqueId);
  
    if (index === -1) {
      // Add to selection if not already selected
      this.selectedDeletePcr.push(rowData);
    } else {
      // Remove from selection if already selected
      this.selectedDeletePcr.splice(index, 1);
    }
  
    console.log("Selected Items:", this.selectedDeletePcr);
  }
  


  selectAll() {
    console.log('select all pcr ---->', this.selectedDeletePcr);
  }
  //for deleting pcr id
  Deletepcr() {
    const pcrIds = this.selectedDeletePcr.map((pcr: any) => pcr.pcrId);
    console.log(pcrIds)
    this.store.dispatch(PcrActions.deletePCR({ pcrIds: pcrIds }));
  }
  deleteMappedData(uniqueId: string) {
    console.log("uniqueId--------------",uniqueId);
    console.log(this.selectedDeletePcr);

    const deleteData = this.selectedDeletePcr.map(
      (data: { uniqueId: string; }) => data.uniqueId
    );
    console.log(deleteData);
    this.showDeleted();
    this.store.dispatch(PcrCandidateActions.deleteMappedData({ deleteData }));
    this.selectedDeletePcr = [];
  
  }

  deleteAgileData(Id: string) {
    console.log("uniqueId--------------",Id);
    console.log(this.selectedDeletePcr);

    const deleteData = this.selectedDeletePcr.map(
      (data: { uniqueId: string; }) => data.uniqueId
    );
    console.log(deleteData);
    this.showDeleted();
    this.store.dispatch(PcrCandidateActions.deleteMappedData({ deleteData }));
    this.selectedDeletePcr = [];
  
  }

  showDeleted() {
    this.messageService.add({
      severity: 'success',

      summary: 'Success',

      detail: 'Data deleted Successfully',
    });
  }
  downloadCsvTemplate() {
    const csvTemplate = `PCRId,AgileId,JobTitle,Created Date,Project Id,Skills,PcrStatus,Created By,Location,RequestSource\n`;
    const blob = new Blob([csvTemplate], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'manage-pcr.csv');
  }

  downloadAgileCsvTemplate() {
    const csvTemplate = `AgileId,JobTitle,Start Date,End Date,Requestor,Location,State/Prov,No,Status,CSA Assigned\n`;
    const blob = new Blob([csvTemplate], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'manage-pcr.csv');
  }
  //! Unused code uploadCSV() and processCsvData()
  // uploadCSV(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     const reader: FileReader = new FileReader();
  //     reader.onload = () => {
  //       const csvData: string = reader.result as string;
  //       this.processCsvData(csvData);
  //     };

  //     reader.readAsText(file);
  //   }
  // }
  // processCsvData(csvData: string) {
  //   Papa.parse(csvData, {
  //     complete: (result: { data: any }) => {
  //       const csvRows = result.data.filter((row: { [row: string]: string }) =>
  //         Object.keys(row).some((key) => row[key] !== '')
  //       );

  //       if (csvRows.length === 0) {
  //         // this.fileUploadErrorMessage();
  //         this.cancelButton();
  //         return;
  //       }
  //       console.log('CSV Data:', csvRows);
  //       let result1: any[] = [];

  //       for (let data of csvRows) {
  //         console.log('Csv File datum--', data);

  //         let obj = {
  //           pcrId: data.PCRId,
  //           agileId: data.AgileId,
  //           createdBy: data['Created By'],
  //           createdDate: data['Created Date'],
  //           deleted: data.deleted || false,
  //           jobTitle: data.JobTitle,
  //           location: data.Location,
  //           pcrStatus: data.PcrStatus,
  //           projectId: data['Project Id'],
  //           requestResource: data.RequestSource,
  //           scheduleName: '',
  //           skills: data.Skills,
  //         };
  //         result1.push(obj);
  //       }
  //       console.log('data1--------->', result1);

  //       this.store.dispatch(PcrActions.addMultiPCR({ pcr: result1 }));

  //       setTimeout(() => {
  //         // this.fileUploadMessage();
  //         this.cancelButton();
  //         // this.loadManagerData();
  //       }, 1000);
  //     },
  //     header: true,
  //   });
  // }
  PCRUpload(event: any) {
    console.log('event object', event);
    const file = event.target.files[0];
    const fileReader = new FileReader();
    const tempData = fileReader.readAsArrayBuffer(file);
    fileReader.onload = (event) => {
      console.log('file reader event', event);
      const binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      console.log('Workbook data', workbook);
      workbook.SheetNames.forEach((sheet) => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log('data from the excel', data);
        const pcrData = data.map((pcr: any) => ({
          pcrId: pcr['BPM ID'].toString(),
          createdBy: pcr['APPROVED BY'],
          createdDate: pcr['APPROVED DATE'],
          jobTitle: pcr['ROLE'],
          location: pcr['ONSITE/OFFSHORE'],
          pcrStatus: pcr['POSITION STATUS'],
          requestedBy: pcr['POS REQUESTED BY'],
          skills: {
            primarySkills:
              pcr['PRIMARY SKILL'] == undefined
                ? ''
                : pcr['PRIMARY SKILL']
                    .split(',')
                    .map((skill: string) => skill.trim()),
            secondarySkills:
              pcr['SECONDARY SKILL'] == undefined
                ? ''
                : pcr['SECONDARY SKILL']
                    .split(',')
                    .map((skill: string) => skill.trim()),
          },
          deleted: false,
        }));
        console.log('data from excel sheet', pcrData);
        if (pcrData) {
          this.pcrService
            .addMultiplePCR(pcrData)
            .subscribe((data) =>
              console.log('data after upload pcr success', data)
            );
        }
      });
    };
  }
  extractPCR(pcrData: any) {
    const worksheet = XLSX.utils.json_to_sheet(pcrData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'PCR details');
    XLSX.writeFile(workbook, 'PCR details.xlsx', { compression: true });
  }
  getAgileData(data?: any) {
    this.store.dispatch(agileActions.getAgileDetails());
    this.store.select(getAgile).subscribe((data) => {
      console.log('Agile Data', data);
      this.agileData=data;
    });
  }
  agileFiltering(agileId: string,pcrId: string, candidateId: string){
    console.log("AgileFiltering", agileId,pcrId,candidateId)
    this.selectedAgileId = agileId;
    this.selectedCandidateId = candidateId;
    this.selectedPcrId =pcrId

  }
  getPcrCandidateMappedDetails(id: any){
    console.log("Id--",id)
    this.pcrAgileMappingService.getPcrCandidateMappedData(id).subscribe((data)=>{
      console.log("Get Pcr-Candidate Mapped Data---",data)
    })
  }
  onRowEditInit(rowData: any) {
    console.log("Init")
  }
  onRowEditSave(rowData: any) {
    console.log("Save")
  }
  onRowEditCancel(rowData: any,i: any){

  }
  selectedPcrId!: string;
  mapPcrAgileData(data: any,i : any){

    const mappingData ={
      pcrId : data.pcrId,
      agileId : this.selectedAgileId,
      candidateId: this.selectedCandidateId,
      jobDescription : data.jobTitle,
      skills : data.skills
    }
    console.log("Mapping-Data",mappingData);
    this.pcrAgileMappingService.mapPcrAgile(mappingData).subscribe((data)=>{
      console.log("Data",data)
    })
    setTimeout(()=>{
      this.selectedAgileId ='';
      this.selectedCandidateId = '';
      this.getPcrAgileMappedData();
    },1500)

  }
  pcrAgileMappedData : any;
  filteredPcrAgileMappedData : any;
  getPcrAgileMappedData(){
    this.pcrAgileMappingService.getPCRAgileData().subscribe((data)=>{
      console.log("get pcr details..................",data);
      this.pcrAgileMappedData = data;
    })
  }
  getIndividualPcrAgileData(pcrId : string){
    this.filteredPcrAgileMappedData = this.pcrAgileMappedData.filter((item: any)=>{
      return item.pcrId === pcrId
    });
    console.log("Filtered Data", this.filteredPcrAgileMappedData)

  }



  agileUpload(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      const tempdata = reader.readAsBinaryString(file);
      console.log('temp data', tempdata);
      reader.onload = (event) => {
        console.log(event);
        let binaryData = event.target?.result;
        let workbook = XLSX.read(binaryData, { type: 'binary' });
        console.log(workbook);
        workbook.SheetNames.forEach((sheet) => {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
          const value = this.agileFormatData(data);
          if (value.length > 0) {
            const tempValue = value.map((temp: any) => ({
              deleted: false,
              ...temp,
            }));
            console.log(tempValue);
            this.pcrService.addAgile1Details(tempValue).subscribe((data) => {
              console.log('data fromt he backend ', data);
            });
          }
        });
      };
    }
  }

  agileFormatData(data: any) {
    let lastEntryWithId: any;
    return data.reduce(
      (
        result: any[],
        item: {
          ID: string;
          Job_Status: any;
          Job_Vendor_Submitted: any;
          Name: any;
          Numubers: any;
        }
      ) => {
        if (item.ID) {
          const entry = {
            ...item,
            ID: item.ID.toString(),
            employeeDetails: [],
          };
          result.push(entry);
          lastEntryWithId = entry;
        } else if (lastEntryWithId && item.ID === '') {
          const additionalDetail = {
            Job_Status: item.Job_Status,
            Job_Vendor_Submitted: item.Job_Vendor_Submitted,
            Name: item.Name,
            Numubers: item.Numubers,
          };
          lastEntryWithId.employeeDetails.push(additionalDetail);
        }
        return result;
      },
      []
    );
  }

  extractAgile(agileData: any) {
    const worksheet = XLSX.utils.json_to_sheet(agileData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Agile details');
    XLSX.writeFile(workbook, 'Agile details.xlsx', { compression: true });
  }


  toggleClass() {
    this.isActive = !this.isActive;
  }
  toggleFalse(){
    this.isActive = false;
  }


  trashButton(rowData: any): boolean {
    return !!rowData.agileId && !!rowData.candidateId && rowData.agileId.length > 0 && rowData.candidateId.length > 0;
  }
  

}
