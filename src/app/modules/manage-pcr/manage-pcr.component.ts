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
@Component({
  selector: 'app-manage-pcr',
  templateUrl: './manage-pcr.component.html',
  styleUrls: ['./manage-pcr.component.scss'],
})
export class ManagePcrComponent {
  items: MenuItem[] = [];
  todayDate!: Date;
  addPCR: boolean = false;
  addPCRForm!: FormGroup;
  formSubmitted: boolean = false;
  pcrData: any;
  status: string[] = ['Open', 'Closed', 'Available'];
  Location: string[] = ['Onsite', 'OffShore'];
  requestResource: string[] = ['Agile1', 'SOW'];
  pcr$!: Observable<PCR[]>;
  editPCR: boolean = false;
  globalSearchValue!: string;
  isAgileId: boolean = false;
  isPcrId: boolean = false;
  isProjectId: boolean = false;
  selectedDeletePcr: any;
  agileData!: agileDetails[];
  selectedAgileId!: string;
  agileDetailsVisible!:boolean;
  inputFields: any = [];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store,
    private pcrService: PcrService,
    private pcrAgileMappingService : PcrMappingService,
    private messageService: MessageService,
  ) {
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
  saveButton() {
    this.formSubmitted = true;

    console.log('save button', this.addPCRForm);
    if (this.addPCRForm.valid) {
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
  editData(data: any) {
    this.editPCR = true;
    this.isAgileId = true;
    this.isPcrId = true;
    this.isProjectId = true;
    console.log('edit data', data);
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
  toggleSelection(data: any) {
    if (!data || !data.id) {
      return;
    }
    data.selection = !data.selection;

    if (data.selection) {
      console.log('Selected schedule:', this.selectedDeletePcr);
    } else {
      console.log('Selected ----schedule :', this.selectedDeletePcr);
    }
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
  deleteMappedData(pcrId: string) {
    console.log(pcrId);
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
  getAgileData() {
    this.store.dispatch(agileActions.getAgileDetails());
    this.store.select(getAgile).subscribe((data) => {
      console.log('Agile Data', data);
      this.agileData=data;
    });
  }
  agileFiltering(agileId: string,pcrId: string){
    console.log(agileId,pcrId)
    this.selectedAgileId = agileId;
    this.selectedPcrId =pcrId

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
      jobDescription : data.jobTitle,
      skills : data.skills

    }
    console.log(mappingData);
    this.pcrAgileMappingService.mapPcrAgile(mappingData).subscribe((data)=>{
      console.log(data)
    })
    setTimeout(()=>{
      this.selectedAgileId ='';
      this.getPcrAgileMappedData();
    },1500)

  }
  pcrAgileMappedData : any;
  filteredPcrAgileMappedData : any;
  getPcrAgileMappedData(){
    this.pcrAgileMappingService.getPCRAgileData().subscribe((data)=>{
      console.log(data);
      this.pcrAgileMappedData = data;
    })
  }
  getIndividualPcrAgileData(pcrId : string){
    this.filteredPcrAgileMappedData = this.pcrAgileMappedData.filter((item: any)=>{
      return item.pcrId === pcrId
    });
    console.log("Filtered Data", this.filteredPcrAgileMappedData)

  }


}
